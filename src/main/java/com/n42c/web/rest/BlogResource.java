package com.n42c.web.rest;

import com.n42c.domain.AppUser;
import com.n42c.domain.Blog;
import com.n42c.repository.BlogRepository;
import com.n42c.web.rest.errors.BadRequestAlertException;
import com.n42c.web.rest.utils.RestServiceUtils;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
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
 * REST controller for managing {@link com.n42c.domain.Blog}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BlogResource {
    private static final String ENTITY_NAME = "blog";
    private final Logger log = LoggerFactory.getLogger(BlogResource.class);
    private final BlogRepository blogRepository;
    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public BlogResource(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    /**
     * {@code POST  /blogs} : Create a new blog.
     *
     * @param blog the blog to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new blog, or with status {@code 400 (Bad Request)} if the blog has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/blogs")
    public ResponseEntity<Blog> createBlog(@Valid @RequestBody Blog blog) throws URISyntaxException {
        log.debug("REST request to save Blog : {}", blog);
        if (blog.getId() != null) {
            throw new BadRequestAlertException("A new blog cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Blog result = blogRepository.save(blog);
        return ResponseEntity
            .created(new URI("/api/blogs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /blogs} : Updates an existing blog.
     *
     * @param blog the blog to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated blog,
     * or with status {@code 400 (Bad Request)} if the blog is not valid,
     * or with status {@code 500 (Internal Server Error)} if the blog couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/blogs")
    public ResponseEntity<Blog> updateBlog(@Valid @RequestBody Blog blog) throws URISyntaxException {
        log.debug("REST request to update Blog : {}", blog);
        if (blog.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Blog result = blogRepository.save(blog);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, blog.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /blogs} : get all the blogs.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of blogs in body.
     */
    @GetMapping("/blogs")
    public ResponseEntity<List<Blog>> getAllBlogs(Pageable pageable) {
        Authentication authentication = RestServiceUtils.getAuthentication(SecurityContextHolder.getContext());
        Collection<? extends GrantedAuthority> authorities = RestServiceUtils.getAuthorities(authentication);

        if (authentication == null) {
            return RestServiceUtils.returnPagedListWithHeaders(restrictSentUserData(getBlogsByCurrentUserOrWriter(pageable, null)));
        } else if (authorities == null) {
            return RestServiceUtils.returnPagedListWithHeaders(
                restrictSentUserData(getBlogsByCurrentUserOrWriter(pageable, authentication.getPrincipal()))
            );
        } else if (authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            log.debug("REST request to get all Blogs - as Admin");
            return RestServiceUtils.returnPagedListWithHeaders(restrictSentUserData(blogRepository.findAll(pageable)));
        } else {
            return RestServiceUtils.returnPagedListWithHeaders(
                restrictSentUserData(getBlogsByCurrentUserOrWriter(pageable, authentication.getPrincipal()))
            );
        }
    }

    /**
     * {@code GET  /blogs/:id} : get the "id" blog.
     *
     * @param id the id of the blog to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the blog, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/blogs/{id}")
    public ResponseEntity<Blog> getBlog(@PathVariable Long id) {
        log.debug("REST request to get Blog : {}", id);
        Optional<Blog> blog = blogRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(blog);
    }

    /**
     * {@code DELETE  /blogs/:id} : delete the "id" blog.
     *
     * @param id the id of the blog to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/blogs/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        log.debug("REST request to delete Blog : {}", id);
        blogRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    /**
     * Gets all blogs belonging to the current user, or anyone that has Writer rights or more.
     */
    private Page<Blog> getBlogsByCurrentUserOrWriter(Pageable pageable, Object principal) {
        if (pageable == null) {
            return null;
        } else if (principal != null) {
            if (principal instanceof UserDetails) {
                log.debug("REST request to get all Blogs - as User (with UserDetails)");
                return blogRepository.findByIsCurrentSpringUserOrWriter(pageable);
            } else if (principal instanceof DefaultOidcUser) {
                log.debug("REST request to get all Blogs - as User (with Oidc token)");
                return blogRepository.findByIsCurrentOidcUserOrWriter(pageable);
            }
        }
        log.debug("REST request to get all Blogs - as Anonymous");
        return blogRepository.findByIsWriter(pageable);
    }

    /**
     * @return The given paged result trimmed of all non-necessary infos about the users.
     */
    private Page<Blog> restrictSentUserData(Page<Blog> page) {
        if (page == null) return null;

        List<Blog> blogs = page.getContent();
        blogs.forEach(
            blog -> {
                if (blog.getAuthor() != null) {
                    blog.setAuthor(new AppUser(blog.getAuthor().getId(), blog.getAuthor().getDisplayedName()));
                }
            }
        );

        return new PageImpl<>(blogs, page.getPageable(), page.getTotalElements());
    }
}
