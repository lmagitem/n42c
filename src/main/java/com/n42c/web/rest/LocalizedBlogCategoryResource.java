package com.n42c.web.rest;

import com.n42c.domain.LocalizedBlogCategory;
import com.n42c.repository.LocalizedBlogCategoryRepository;
import com.n42c.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.n42c.domain.LocalizedBlogCategory}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LocalizedBlogCategoryResource {

    private final Logger log = LoggerFactory.getLogger(LocalizedBlogCategoryResource.class);

    private static final String ENTITY_NAME = "localizedBlogCategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LocalizedBlogCategoryRepository localizedBlogCategoryRepository;

    public LocalizedBlogCategoryResource(LocalizedBlogCategoryRepository localizedBlogCategoryRepository) {
        this.localizedBlogCategoryRepository = localizedBlogCategoryRepository;
    }

    /**
     * {@code POST  /localized-blog-categories} : Create a new localizedBlogCategory.
     *
     * @param localizedBlogCategory the localizedBlogCategory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new localizedBlogCategory, or with status {@code 400 (Bad Request)} if the localizedBlogCategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/localized-blog-categories")
    public ResponseEntity<LocalizedBlogCategory> createLocalizedBlogCategory(@Valid @RequestBody LocalizedBlogCategory localizedBlogCategory) throws URISyntaxException {
        log.debug("REST request to save LocalizedBlogCategory : {}", localizedBlogCategory);
        if (localizedBlogCategory.getId() != null) {
            throw new BadRequestAlertException("A new localizedBlogCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LocalizedBlogCategory result = localizedBlogCategoryRepository.save(localizedBlogCategory);
        return ResponseEntity.created(new URI("/api/localized-blog-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /localized-blog-categories} : Updates an existing localizedBlogCategory.
     *
     * @param localizedBlogCategory the localizedBlogCategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated localizedBlogCategory,
     * or with status {@code 400 (Bad Request)} if the localizedBlogCategory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the localizedBlogCategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/localized-blog-categories")
    public ResponseEntity<LocalizedBlogCategory> updateLocalizedBlogCategory(@Valid @RequestBody LocalizedBlogCategory localizedBlogCategory) throws URISyntaxException {
        log.debug("REST request to update LocalizedBlogCategory : {}", localizedBlogCategory);
        if (localizedBlogCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LocalizedBlogCategory result = localizedBlogCategoryRepository.save(localizedBlogCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, localizedBlogCategory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /localized-blog-categories} : get all the localizedBlogCategories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of localizedBlogCategories in body.
     */
    @GetMapping("/localized-blog-categories")
    public List<LocalizedBlogCategory> getAllLocalizedBlogCategories() {
        log.debug("REST request to get all LocalizedBlogCategories");
        return localizedBlogCategoryRepository.findAll();
    }

    /**
     * {@code GET  /localized-blog-categories/:id} : get the "id" localizedBlogCategory.
     *
     * @param id the id of the localizedBlogCategory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the localizedBlogCategory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/localized-blog-categories/{id}")
    public ResponseEntity<LocalizedBlogCategory> getLocalizedBlogCategory(@PathVariable Long id) {
        log.debug("REST request to get LocalizedBlogCategory : {}", id);
        Optional<LocalizedBlogCategory> localizedBlogCategory = localizedBlogCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(localizedBlogCategory);
    }

    /**
     * {@code DELETE  /localized-blog-categories/:id} : delete the "id" localizedBlogCategory.
     *
     * @param id the id of the localizedBlogCategory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/localized-blog-categories/{id}")
    public ResponseEntity<Void> deleteLocalizedBlogCategory(@PathVariable Long id) {
        log.debug("REST request to delete LocalizedBlogCategory : {}", id);
        localizedBlogCategoryRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
