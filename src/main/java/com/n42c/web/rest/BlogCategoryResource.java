package com.n42c.web.rest;

import com.n42c.domain.BlogCategory;
import com.n42c.repository.BlogCategoryRepository;
import com.n42c.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.n42c.domain.BlogCategory}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BlogCategoryResource {

    private final Logger log = LoggerFactory.getLogger(BlogCategoryResource.class);

    private static final String ENTITY_NAME = "blogCategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BlogCategoryRepository blogCategoryRepository;

    public BlogCategoryResource(BlogCategoryRepository blogCategoryRepository) {
        this.blogCategoryRepository = blogCategoryRepository;
    }

    /**
     * {@code POST  /blog-categories} : Create a new blogCategory.
     *
     * @param blogCategory the blogCategory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new blogCategory, or with status {@code 400 (Bad Request)} if the blogCategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/blog-categories")
    public ResponseEntity<BlogCategory> createBlogCategory(@RequestBody BlogCategory blogCategory) throws URISyntaxException {
        log.debug("REST request to save BlogCategory : {}", blogCategory);
        if (blogCategory.getId() != null) {
            throw new BadRequestAlertException("A new blogCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BlogCategory result = blogCategoryRepository.save(blogCategory);
        return ResponseEntity.created(new URI("/api/blog-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /blog-categories} : Updates an existing blogCategory.
     *
     * @param blogCategory the blogCategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated blogCategory,
     * or with status {@code 400 (Bad Request)} if the blogCategory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the blogCategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/blog-categories")
    public ResponseEntity<BlogCategory> updateBlogCategory(@RequestBody BlogCategory blogCategory) throws URISyntaxException {
        log.debug("REST request to update BlogCategory : {}", blogCategory);
        if (blogCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BlogCategory result = blogCategoryRepository.save(blogCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, blogCategory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /blog-categories} : get all the blogCategories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of blogCategories in body.
     */
    @GetMapping("/blog-categories")
    public List<BlogCategory> getAllBlogCategories() {
        log.debug("REST request to get all BlogCategories");
        return blogCategoryRepository.findAll();
    }

    /**
     * {@code GET  /blog-categories/:id} : get the "id" blogCategory.
     *
     * @param id the id of the blogCategory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the blogCategory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/blog-categories/{id}")
    public ResponseEntity<BlogCategory> getBlogCategory(@PathVariable Long id) {
        log.debug("REST request to get BlogCategory : {}", id);
        Optional<BlogCategory> blogCategory = blogCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(blogCategory);
    }

    /**
     * {@code DELETE  /blog-categories/:id} : delete the "id" blogCategory.
     *
     * @param id the id of the blogCategory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/blog-categories/{id}")
    public ResponseEntity<Void> deleteBlogCategory(@PathVariable Long id) {
        log.debug("REST request to delete BlogCategory : {}", id);
        blogCategoryRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
