package com.n42c.web.rest;

import com.n42c.domain.ProfilePartLinkedExperience;
import com.n42c.repository.ProfilePartLinkedExperienceRepository;
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
 * REST controller for managing {@link com.n42c.domain.ProfilePartLinkedExperience}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProfilePartLinkedExperienceResource {

    private final Logger log = LoggerFactory.getLogger(ProfilePartLinkedExperienceResource.class);

    private static final String ENTITY_NAME = "profilePartLinkedExperience";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProfilePartLinkedExperienceRepository profilePartLinkedExperienceRepository;

    public ProfilePartLinkedExperienceResource(ProfilePartLinkedExperienceRepository profilePartLinkedExperienceRepository) {
        this.profilePartLinkedExperienceRepository = profilePartLinkedExperienceRepository;
    }

    /**
     * {@code POST  /profile-part-linked-experiences} : Create a new profilePartLinkedExperience.
     *
     * @param profilePartLinkedExperience the profilePartLinkedExperience to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new profilePartLinkedExperience, or with status {@code 400 (Bad Request)} if the profilePartLinkedExperience has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/profile-part-linked-experiences")
    public ResponseEntity<ProfilePartLinkedExperience> createProfilePartLinkedExperience(@Valid @RequestBody ProfilePartLinkedExperience profilePartLinkedExperience) throws URISyntaxException {
        log.debug("REST request to save ProfilePartLinkedExperience : {}", profilePartLinkedExperience);
        if (profilePartLinkedExperience.getId() != null) {
            throw new BadRequestAlertException("A new profilePartLinkedExperience cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProfilePartLinkedExperience result = profilePartLinkedExperienceRepository.save(profilePartLinkedExperience);
        return ResponseEntity.created(new URI("/api/profile-part-linked-experiences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /profile-part-linked-experiences} : Updates an existing profilePartLinkedExperience.
     *
     * @param profilePartLinkedExperience the profilePartLinkedExperience to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated profilePartLinkedExperience,
     * or with status {@code 400 (Bad Request)} if the profilePartLinkedExperience is not valid,
     * or with status {@code 500 (Internal Server Error)} if the profilePartLinkedExperience couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/profile-part-linked-experiences")
    public ResponseEntity<ProfilePartLinkedExperience> updateProfilePartLinkedExperience(@Valid @RequestBody ProfilePartLinkedExperience profilePartLinkedExperience) throws URISyntaxException {
        log.debug("REST request to update ProfilePartLinkedExperience : {}", profilePartLinkedExperience);
        if (profilePartLinkedExperience.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProfilePartLinkedExperience result = profilePartLinkedExperienceRepository.save(profilePartLinkedExperience);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, profilePartLinkedExperience.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /profile-part-linked-experiences} : get all the profilePartLinkedExperiences.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of profilePartLinkedExperiences in body.
     */
    @GetMapping("/profile-part-linked-experiences")
    public List<ProfilePartLinkedExperience> getAllProfilePartLinkedExperiences() {
        log.debug("REST request to get all ProfilePartLinkedExperiences");
        return profilePartLinkedExperienceRepository.findAll();
    }

    /**
     * {@code GET  /profile-part-linked-experiences/:id} : get the "id" profilePartLinkedExperience.
     *
     * @param id the id of the profilePartLinkedExperience to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the profilePartLinkedExperience, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/profile-part-linked-experiences/{id}")
    public ResponseEntity<ProfilePartLinkedExperience> getProfilePartLinkedExperience(@PathVariable Long id) {
        log.debug("REST request to get ProfilePartLinkedExperience : {}", id);
        Optional<ProfilePartLinkedExperience> profilePartLinkedExperience = profilePartLinkedExperienceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(profilePartLinkedExperience);
    }

    /**
     * {@code DELETE  /profile-part-linked-experiences/:id} : delete the "id" profilePartLinkedExperience.
     *
     * @param id the id of the profilePartLinkedExperience to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/profile-part-linked-experiences/{id}")
    public ResponseEntity<Void> deleteProfilePartLinkedExperience(@PathVariable Long id) {
        log.debug("REST request to delete ProfilePartLinkedExperience : {}", id);
        profilePartLinkedExperienceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
