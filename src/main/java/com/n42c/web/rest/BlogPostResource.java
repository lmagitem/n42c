package com.n42c.web.rest;

import com.n42c.domain.*;
import com.n42c.repository.AppUserRepository;
import com.n42c.repository.BlogPostRepository;
import com.n42c.web.rest.errors.BadRequestAlertException;

import com.n42c.web.rest.utils.RestServiceUtils;
import com.nimbusds.oauth2.sdk.util.CollectionUtils;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * REST controller for managing {@link com.n42c.domain.BlogPost}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BlogPostResource {

    private final Logger log = LoggerFactory.getLogger(BlogPostResource.class);

    private static final String ENTITY_NAME = "blogPost";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Autowired
    private EntityManager entityManager;

    private final BlogPostRepository blogPostRepository;

    public BlogPostResource(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    /**
     * {@code POST  /blog-posts} : Create a new blogPost.
     *
     * @param blogPost the blogPost to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new blogPost, or with status {@code 400 (Bad Request)} if the blogPost has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/blog-posts")
    public ResponseEntity<BlogPost> createBlogPost(@Valid @RequestBody BlogPost blogPost) throws URISyntaxException {
        log.debug("REST request to save BlogPost : {}", blogPost);
        if (blogPost.getId() != null) {
            throw new BadRequestAlertException("A new blogPost cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BlogPost result = blogPostRepository.save(blogPost);
        return ResponseEntity.created(new URI("/api/blog-posts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /blog-posts} : Updates an existing blogPost.
     *
     * @param blogPost the blogPost to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated blogPost,
     * or with status {@code 400 (Bad Request)} if the blogPost is not valid,
     * or with status {@code 500 (Internal Server Error)} if the blogPost couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/blog-posts")
    public ResponseEntity<BlogPost> updateBlogPost(@Valid @RequestBody BlogPost blogPost) throws URISyntaxException {
        log.debug("REST request to update BlogPost : {}", blogPost);
        if (blogPost.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BlogPost result = blogPostRepository.save(blogPost);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, blogPost.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /blog-posts} : get all the blogPosts.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of blogPosts in body.
     */
    @GetMapping("/blog-posts")
    public ResponseEntity<List<BlogPost>> getAllBlogPosts(Pageable pageable) {
        Authentication authentication = RestServiceUtils.getAuthentication(SecurityContextHolder.getContext());
        Collection<? extends GrantedAuthority> authorities = RestServiceUtils.getAuthorities(authentication);

        if (authentication == null) {
            return RestServiceUtils.returnPagedListWithHeaders(addAuthorNamesToPosts(getPostsByCurrentUserOrWriter(pageable, null)));
        } else if (authorities == null) {
            return RestServiceUtils.returnPagedListWithHeaders(addAuthorNamesToPosts(getPostsByCurrentUserOrWriter(pageable, authentication.getPrincipal())));
        } else if (authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            log.debug("REST request to get all Blog Posts - as Admin");
            return RestServiceUtils.returnPagedListWithHeaders(addAuthorNamesToPosts(blogPostRepository.findAll(pageable)));
        } else {
            return RestServiceUtils.returnPagedListWithHeaders(addAuthorNamesToPosts(getPostsByCurrentUserOrWriter(pageable, authentication.getPrincipal())));
        }
    }

    /**
     * {@code GET  /blog-posts/for} : get posts for the blogs which ids are given in parameter.
     *
     * @param ids the ids of the blogs for which to return posts.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of blogPosts in body.
     */
    @GetMapping("/blog-posts/for")
    public ResponseEntity<List<BlogPost>> getBlogPostsFor(@RequestParam() List<Long> ids, Pageable pageable) {
        Authentication authentication = RestServiceUtils.getAuthentication(SecurityContextHolder.getContext());
        Collection<? extends GrantedAuthority> authorities = RestServiceUtils.getAuthorities(authentication);

        if (authentication == null) {
            return RestServiceUtils.returnPagedListWithHeaders(addAuthorNamesToPosts(getAllowedBlogPosts(ids, null, pageable)));
        } else if (authorities == null) {
            return RestServiceUtils.returnPagedListWithHeaders(addAuthorNamesToPosts(getAllowedBlogPosts(ids, authentication.getPrincipal(), pageable)));
        } else if (authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN")) && CollectionUtils.isNotEmpty(ids)) {
            log.debug("REST request to get Posts for given Blog ids - as Admin");
            return RestServiceUtils.returnPagedListWithHeaders(addAuthorNamesToPosts(blogPostRepository.findByBlogIds(ids, pageable)));
        } else {
            return RestServiceUtils.returnPagedListWithHeaders(addAuthorNamesToPosts(getAllowedBlogPosts(ids, authentication.getPrincipal(), pageable)));
        }
    }

    /**
     * {@code GET  /blog-posts/:id} : get the "id" blogPost.
     *
     * @param id the id of the blogPost to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the blogPost, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/blog-posts/{id}")
    public ResponseEntity<BlogPost> getBlogPost(@PathVariable Long id) {
        log.debug("REST request to get BlogPost : {}", id);
        Optional<BlogPost> blogPost = blogPostRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(blogPost);
    }

    /**
     * {@code DELETE  /blog-posts/:id} : delete the "id" blogPost.
     *
     * @param id the id of the blogPost to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/blog-posts/{id}")
    public ResponseEntity<Void> deleteBlogPost(@PathVariable Long id) {
        log.debug("REST request to delete BlogPost : {}", id);
        blogPostRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * Gets all blog posts belonging to the current user, or anyone that has Writer rights or more.
     */
    private Page<BlogPost> getPostsByCurrentUserOrWriter(Pageable pageable, Object principal) {
        if (pageable == null) {
            return null;
        } else if (principal != null) {
            if (principal instanceof UserDetails) {
                log.debug("REST request to get all Blog Posts - as User (with UserDetails)");
                return blogPostRepository.findByIsCurrentSpringUserOrWriter(pageable);
            } else if (principal instanceof DefaultOidcUser) {
                log.debug("REST request to get all Blog Posts - as User (with Oidc token)");
                return blogPostRepository.findByIsCurrentOidcUserOrWriter(pageable);
            }
        }
        log.debug("REST request to get all Blog Posts - as Anonymous");
        return blogPostRepository.findByIsWriter(pageable);
    }

    /**
     * Gets all blog posts belonging to the current user, or anyone that has Writer rights or more.
     */
    private Page<BlogPost> getAllowedBlogPosts(List<Long> ids, Object principal, Pageable pageable) {
        if (CollectionUtils.isEmpty(ids) || pageable == null) {
            return null;
        } else if (principal != null) {
            if (principal instanceof UserDetails) {
                log.debug("REST request to get Posts for given Blog ids - as User (with UserDetails)");
                return blogPostRepository.findByBlogIdsAndIsCurrentSpringUserOrWriter(ids, pageable);
            } else if (principal instanceof DefaultOidcUser) {
                log.debug("REST request to get Posts for given Blog ids - as User (with Oidc token)");
                return blogPostRepository.findByBlogIdsAndIsCurrentOidcUserOrWriter(ids, pageable);
            }
        }
        log.debug("REST request to get Posts for given Blog ids - as Anonymous");
        return blogPostRepository.findByBlogIdsAndIsWriter(ids, pageable);
    }

    /**
     * @return The given paged result, enriched by adding the necessary infos (and nothing more) about the blog posts authors.
     */
    private Page<BlogPost> addAuthorNamesToPosts(Page<BlogPost> page) {
        if (page == null)
            return null;

        List<Long> postsIds = new LinkedList<>();
        List<BlogPost> posts = page.getContent();
        posts.forEach(post -> postsIds.add(post.getId()));

        if (CollectionUtils.isEmpty(postsIds))
            return page;

        // Get a list of pairings between post ids and id + name of their authors, enrich the page with it
        log.debug("Adding the necessary AppUser infos to the result");
        List<AuthorToPostLinkView> authorsByPost = blogPostRepository.findPairingsBetweenBlogPostIdsAndLightweightAppUsers(postsIds);

        log.debug(String.valueOf(postsIds));
        log.debug("authorsByPost");
        authorsByPost.forEach(pair -> {
                log.debug(String.valueOf(pair.getPostId()) + " - " + pair.getAppUserId() + " - " + pair.getAppUserDisplayedName());
            }
        );

        posts.forEach(
            post -> {
                // Remove unnecessary infos about the blog author as well
                Blog blog = post.getBlog();
                if (blog.getAuthor() != null) {
                    blog.setAuthor(new AppUser(blog.getAuthor().getId(), blog.getAuthor().getDisplayedName()));
                }
                post.setBlog(blog);

                // Put in the users infos
                authorsByPost.forEach(pair -> {
                        if (post.getId().equals(pair.getPostId())) {
                            if (post.getAuthors() == null)
                                post.setAuthors(new HashSet<>());
                            post.getAuthors().add(new AppUser(pair.getAppUserId(), pair.getAppUserDisplayedName()));
                        }
                    }
                );

                // And clear the unwanted infos in case they were filled in cache
                post.getAuthors().forEach(appUser -> appUser.clearSensitiveInfos(entityManager));
            }
        );

        log.debug("posts");
        posts.forEach(post -> {
                post.getAuthors().forEach(author -> log.debug(author.toString()));
            }
        );

        return page;
    }
}
