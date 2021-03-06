package com.n42c.web.rest;

import com.n42c.domain.AppUser;
import com.n42c.domain.BlogPost;
import com.n42c.domain.enumerations.AppUserRights;
import com.n42c.domain.views.AuthorToPostLinkView;
import com.n42c.repository.AppUserRepository;
import com.n42c.repository.BlogPostRepository;
import com.n42c.security.SecurityUtils;
import com.n42c.web.rest.errors.BadRequestAlertException;
import com.n42c.web.rest.utils.RestServiceUtils;
import com.nimbusds.oauth2.sdk.util.CollectionUtils;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

/**
 * REST controller for managing {@link com.n42c.domain.BlogPost}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BlogPostResource {
    private static final String ENTITY_NAME = "blogPost";
    private final Logger log = LoggerFactory.getLogger(BlogPostResource.class);
    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    private final BlogPostRepository blogPostRepository;
    private final EntityManager entityManager;
    private final AppUserRepository appUserRepository;

    public BlogPostResource(BlogPostRepository blogPostRepository,
                            EntityManager entityManager,
                            AppUserRepository appUserRepository) {
        this.blogPostRepository = blogPostRepository;
        this.entityManager = entityManager;
        this.appUserRepository = appUserRepository;
    }

    /**
     * {@code POST  /blog-posts} : Create a new blogPost.
     *
     * @param blogPost the blogPost to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new blogPost, with status {@code 400 (Bad Request)} if the
     * blogPost has already an ID, or with status {@code 403 (Forbidden)} if the user doesn't have the rights to execute this actions.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/blog-posts")
    public ResponseEntity<BlogPost> createBlogPost(@Valid @RequestBody BlogPost blogPost) throws URISyntaxException {
        if (blogPost.getId() != null) { throw new BadRequestAlertException("A new blogPost cannot already have an ID", ENTITY_NAME, "idexists"); }

        Authentication authentication = RestServiceUtils.getAuthentication(SecurityContextHolder.getContext());
        Collection<? extends GrantedAuthority> authorities = RestServiceUtils.getAuthorities(authentication);
        AppUser appUser = appUserRepository.findOneByUserId(SecurityUtils.getCurrentUserLogin().orElse("")).orElse(null);

        if (
                authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                (appUser != null && (AppUserRights.WRI.equals(appUser.getBlogRights()) || AppUserRights.MOD.equals(appUser.getBlogRights())))
        ) {
            log.debug("REST request to save BlogPost : {}", blogPost);

            log.debug("ATTENTION ! NEED TO SANITIZE URL HERE");

            BlogPost result = blogPostRepository.save(blogPost);
            return ResponseEntity
                    .created(new URI("/api/blog-posts/" + result.getId()))
                    .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                    .body(result);
        }

        log.debug("Access was denied to save BlogPost : {}", blogPost);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    /**
     * {@code PUT  /blog-posts} : Updates an existing blogPost.
     *
     * @param blogPost the blogPost to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated blogPost, or with status {@code 400 (Bad Request)} if the
     * blogPost is not valid, or with status {@code 500 (Internal Server Error)} if the blogPost couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/blog-posts")
    public ResponseEntity<BlogPost> updateBlogPost(@Valid @RequestBody BlogPost blogPost) throws URISyntaxException {
        if (blogPost.getId() == null) throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");

        Authentication authentication = RestServiceUtils.getAuthentication(SecurityContextHolder.getContext());
        Collection<? extends GrantedAuthority> authorities = RestServiceUtils.getAuthorities(authentication);
        AppUser appUser = appUserRepository.findOneByUserId(SecurityUtils.getCurrentUserLogin().orElse("")).orElse(null);

        if (
                authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                appUser != null &&
                (AppUserRights.WRI.equals(appUser.getBlogRights()) || AppUserRights.MOD.equals(appUser.getBlogRights()))
        ) {
            BlogPost old = blogPostRepository.findOneWithEagerRelationships(blogPost.getId()).orElse(null);
            if (
                    authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                    (old != null && appUser != null && old.getAuthors().stream().anyMatch(author -> author.getId().equals(appUser.getId())))
            ) {
                log.debug("REST request to update BlogPost : {}", blogPost);

                log.debug("ATTENTION ! NEED TO SANITIZE URL HERE");

                BlogPost result = blogPostRepository.save(blogPost);
                return ResponseEntity
                        .ok()
                        .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, blogPost.getId().toString()))
                        .body(result);
            }
        }

        log.debug("Access was denied to update BlogPost : {}", blogPost);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
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
            return RestServiceUtils.returnPagedListWithHeaders(addAuthors(getPostsByCurrentUserOrWriter(pageable, null)));
        } else if (authorities == null) {
            return RestServiceUtils.returnPagedListWithHeaders(
                    addAuthors(getPostsByCurrentUserOrWriter(pageable, authentication.getPrincipal())));
        } else if (authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            log.debug("REST request to get all Blog Posts - as Admin");
            return RestServiceUtils.returnPagedListWithHeaders(addAuthors(blogPostRepository.findAll(pageable)));
        } else {
            return RestServiceUtils.returnPagedListWithHeaders(
                    addAuthors(getPostsByCurrentUserOrWriter(pageable, authentication.getPrincipal())));
        }
    }

    /**
     * {@code GET  /blog-posts/for} : get posts for the blogs which ids are given in parameter.
     *
     * @param ids the ids of the blogs for which to return posts.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of blogPosts in body.
     */
    @GetMapping("/blog-posts/for")
    public ResponseEntity<List<BlogPost>> getBlogPostsFor(@RequestParam List<Long> ids, Pageable pageable) {
        Authentication authentication = RestServiceUtils.getAuthentication(SecurityContextHolder.getContext());
        Collection<? extends GrantedAuthority> authorities = RestServiceUtils.getAuthorities(authentication);

        if (authentication == null) {
            return RestServiceUtils.returnPagedListWithHeaders(addAuthors(getAllowedBlogPosts(ids, null, pageable)));
        } else if (authorities == null) {
            return RestServiceUtils.returnPagedListWithHeaders(
                    addAuthors(getAllowedBlogPosts(ids, authentication.getPrincipal(), pageable)));
        } else if (authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN")) && CollectionUtils.isNotEmpty(ids)) {
            log.debug("REST request to get Posts for given Blog ids - as Admin");
            return RestServiceUtils.returnPagedListWithHeaders(addAuthors(blogPostRepository.findByBlogIds(ids, pageable)));
        } else {
            return RestServiceUtils.returnPagedListWithHeaders(
                    addAuthors(getAllowedBlogPosts(ids, authentication.getPrincipal(), pageable)));
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
        Authentication authentication = RestServiceUtils.getAuthentication(SecurityContextHolder.getContext());
        Collection<? extends GrantedAuthority> authorities = RestServiceUtils.getAuthorities(authentication);
        AppUser appUser = appUserRepository.findOneByUserId(SecurityUtils.getCurrentUserLogin().orElse("")).orElse(null);

        if (
                authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                (appUser != null && (AppUserRights.WRI.equals(appUser.getBlogRights()) || AppUserRights.MOD.equals(appUser.getBlogRights())))
        ) {
            log.debug("REST request to get BlogPost : {}", id);
            Optional<BlogPost> blogPost = blogPostRepository.findOneWithEagerRelationships(id);
            return ResponseUtil.wrapOrNotFound(blogPost);
        }

        log.debug("Access was denied to get BlogPost : {}", id);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
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
        return ResponseEntity
                .noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
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
    private Page<BlogPost> addAuthors(Page<BlogPost> page) {
        if (page == null) { return null; }

        List<Long> postsIds = new LinkedList<>();
        List<BlogPost> posts = page.getContent();
        posts.forEach(post -> postsIds.add(post.getId()));

        if (CollectionUtils.isEmpty(postsIds)) { return page; }

        // Get a list of pairings between post ids and id + name of their authors, enrich the posts with it
        List<AuthorToPostLinkView> authorsByPost = blogPostRepository.findPairingsBetweenBlogPostIdsAndLightweightAppUsers(postsIds);
        posts.forEach(
                post -> authorsByPost.forEach(
                        pair -> {
                            if (post.getId().equals(pair.getPostId())) {
                                if (post.getAuthors() == null) { post.setAuthors(new HashSet<>()); }
                                post.getAuthors().add(new AppUser(pair.getAppUserId(), pair.getAppUserDisplayedName()));
                            }
                        }));

        return page;
    }
}
