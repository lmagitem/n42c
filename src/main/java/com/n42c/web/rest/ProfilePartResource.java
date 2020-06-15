package com.n42c.web.rest;

import com.n42c.domain.ProfilePart;
import com.n42c.repository.ProfilePartRepository;
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
 * REST controller for managing {@link com.n42c.domain.ProfilePart}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProfilePartResource {

    private final Logger log = LoggerFactory.getLogger(ProfilePartResource.class);

    private static final String ENTITY_NAME = "profilePart";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProfilePartRepository profilePartRepository;

    public ProfilePartResource(ProfilePartRepository profilePartRepository) {
        this.profilePartRepository = profilePartRepository;
    }

    /**
     * {@code POST  /profile-parts} : Create a new profilePart.
     *
     * @param profilePart the profilePart to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new profilePart, or with status {@code 400 (Bad Request)} if the profilePart has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/profile-parts")
    public ResponseEntity<ProfilePart> createProfilePart(@Valid @RequestBody ProfilePart profilePart) throws URISyntaxException {
        log.debug("REST request to save ProfilePart : {}", profilePart);
        if (profilePart.getId() != null) {
            throw new BadRequestAlertException("A new profilePart cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProfilePart result = profilePartRepository.save(profilePart);
        return ResponseEntity.created(new URI("/api/profile-parts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /profile-parts} : Updates an existing profilePart.
     *
     * @param profilePart the profilePart to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated profilePart,
     * or with status {@code 400 (Bad Request)} if the profilePart is not valid,
     * or with status {@code 500 (Internal Server Error)} if the profilePart couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/profile-parts")
    public ResponseEntity<ProfilePart> updateProfilePart(@Valid @RequestBody ProfilePart profilePart) throws URISyntaxException {
        log.debug("REST request to update ProfilePart : {}", profilePart);
        if (profilePart.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProfilePart result = profilePartRepository.save(profilePart);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, profilePart.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /profile-parts} : get all the profileParts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of profileParts in body.
     */
    @GetMapping("/profile-parts")
    public List<ProfilePart> getAllProfileParts() {
        log.debug("REST request to get all ProfileParts");
        return profilePartRepository.findAll();
    }

    /**
     * {@code GET  /profile-parts/:id} : get the "id" profilePart.
     *
     * @param id the id of the profilePart to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the profilePart, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/profile-parts/{id}")
    public ResponseEntity<ProfilePart> getProfilePart(@PathVariable Long id) {
        log.debug("REST request to get ProfilePart : {}", id);
        Optional<ProfilePart> profilePart = profilePartRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(profilePart);
    }

    /**
     * {@code DELETE  /profile-parts/:id} : delete the "id" profilePart.
     *
     * @param id the id of the profilePart to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/profile-parts/{id}")
    public ResponseEntity<Void> deleteProfilePart(@PathVariable Long id) {
        log.debug("REST request to delete ProfilePart : {}", id);
        profilePartRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
