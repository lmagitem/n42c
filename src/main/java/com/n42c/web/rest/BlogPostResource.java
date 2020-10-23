package com.n42c.web.rest;

import com.n42c.domain.BlogPost;
import com.n42c.repository.BlogPostRepository;
import com.n42c.web.rest.errors.BadRequestAlertException;

import com.n42c.web.rest.utils.RestServiceUtils;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

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
        SecurityContext context = SecurityContextHolder.getContext();
        if (context == null)
            return RestServiceUtils.returnPagedListWithHeaders(getPostsByCurrentUserOrWriter(pageable, null));

        Authentication authentication = context.getAuthentication();
        if (authentication == null)
            return RestServiceUtils.returnPagedListWithHeaders(getPostsByCurrentUserOrWriter(pageable, null));

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        if (authorities == null)
            return RestServiceUtils.returnPagedListWithHeaders(getPostsByCurrentUserOrWriter(pageable, authentication.getPrincipal()));

        if (authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            log.debug("REST request to get all Blogs - as Admin");
            return RestServiceUtils.returnPagedListWithHeaders(blogPostRepository.findAll(pageable));
        } else {
            return RestServiceUtils.returnPagedListWithHeaders(getPostsByCurrentUserOrWriter(pageable, authentication.getPrincipal()));
        }
    }

    /**
     * Gets all blog posts belonging to the current user, or anyone that has Writer rights or more.
     */
    private Page<BlogPost> getPostsByCurrentUserOrWriter(Pageable pageable, Object principal) {
        if (principal != null) {
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
}
