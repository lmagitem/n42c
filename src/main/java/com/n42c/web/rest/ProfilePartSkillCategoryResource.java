package com.n42c.web.rest;

import com.n42c.domain.ProfilePartSkillCategory;
import com.n42c.repository.ProfilePartSkillCategoryRepository;
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
 * REST controller for managing {@link com.n42c.domain.ProfilePartSkillCategory}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProfilePartSkillCategoryResource {

    private final Logger log = LoggerFactory.getLogger(ProfilePartSkillCategoryResource.class);

    private static final String ENTITY_NAME = "profilePartSkillCategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProfilePartSkillCategoryRepository profilePartSkillCategoryRepository;

    public ProfilePartSkillCategoryResource(ProfilePartSkillCategoryRepository profilePartSkillCategoryRepository) {
        this.profilePartSkillCategoryRepository = profilePartSkillCategoryRepository;
    }

    /**
     * {@code POST  /profile-part-skill-categories} : Create a new profilePartSkillCategory.
     *
     * @param profilePartSkillCategory the profilePartSkillCategory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new profilePartSkillCategory, or with status {@code 400 (Bad Request)} if the profilePartSkillCategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/profile-part-skill-categories")
    public ResponseEntity<ProfilePartSkillCategory> createProfilePartSkillCategory(@Valid @RequestBody ProfilePartSkillCategory profilePartSkillCategory) throws URISyntaxException {
        log.debug("REST request to save ProfilePartSkillCategory : {}", profilePartSkillCategory);
        if (profilePartSkillCategory.getId() != null) {
            throw new BadRequestAlertException("A new profilePartSkillCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProfilePartSkillCategory result = profilePartSkillCategoryRepository.save(profilePartSkillCategory);
        return ResponseEntity.created(new URI("/api/profile-part-skill-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /profile-part-skill-categories} : Updates an existing profilePartSkillCategory.
     *
     * @param profilePartSkillCategory the profilePartSkillCategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated profilePartSkillCategory,
     * or with status {@code 400 (Bad Request)} if the profilePartSkillCategory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the profilePartSkillCategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/profile-part-skill-categories")
    public ResponseEntity<ProfilePartSkillCategory> updateProfilePartSkillCategory(@Valid @RequestBody ProfilePartSkillCategory profilePartSkillCategory) throws URISyntaxException {
        log.debug("REST request to update ProfilePartSkillCategory : {}", profilePartSkillCategory);
        if (profilePartSkillCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProfilePartSkillCategory result = profilePartSkillCategoryRepository.save(profilePartSkillCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, profilePartSkillCategory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /profile-part-skill-categories} : get all the profilePartSkillCategories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of profilePartSkillCategories in body.
     */
    @GetMapping("/profile-part-skill-categories")
    public List<ProfilePartSkillCategory> getAllProfilePartSkillCategories() {
        log.debug("REST request to get all ProfilePartSkillCategories");
        return profilePartSkillCategoryRepository.findAll();
    }

    /**
     * {@code GET  /profile-part-skill-categories/:id} : get the "id" profilePartSkillCategory.
     *
     * @param id the id of the profilePartSkillCategory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the profilePartSkillCategory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/profile-part-skill-categories/{id}")
    public ResponseEntity<ProfilePartSkillCategory> getProfilePartSkillCategory(@PathVariable Long id) {
        log.debug("REST request to get ProfilePartSkillCategory : {}", id);
        Optional<ProfilePartSkillCategory> profilePartSkillCategory = profilePartSkillCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(profilePartSkillCategory);
    }

    /**
     * {@code DELETE  /profile-part-skill-categories/:id} : delete the "id" profilePartSkillCategory.
     *
     * @param id the id of the profilePartSkillCategory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/profile-part-skill-categories/{id}")
    public ResponseEntity<Void> deleteProfilePartSkillCategory(@PathVariable Long id) {
        log.debug("REST request to delete ProfilePartSkillCategory : {}", id);
        profilePartSkillCategoryRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
