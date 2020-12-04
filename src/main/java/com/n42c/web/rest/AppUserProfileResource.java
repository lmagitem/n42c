package com.n42c.web.rest;

import com.n42c.domain.AppUserProfile;
import com.n42c.repository.AppUserProfileRepository;
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
 * REST controller for managing {@link com.n42c.domain.AppUserProfile}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AppUserProfileResource {

    private static final String ENTITY_NAME = "appUserProfile";
    private final Logger log = LoggerFactory.getLogger(AppUserProfileResource.class);
    private final AppUserProfileRepository appUserProfileRepository;
    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public AppUserProfileResource(AppUserProfileRepository appUserProfileRepository) {
        this.appUserProfileRepository = appUserProfileRepository;
    }

    /**
     * {@code POST  /app-user-profiles} : Create a new appUserProfile.
     *
     * @param appUserProfile the appUserProfile to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new appUserProfile, or with status {@code 400 (Bad Request)} if the appUserProfile has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/app-user-profiles")
    public ResponseEntity<AppUserProfile> createAppUserProfile(@Valid @RequestBody AppUserProfile appUserProfile) throws URISyntaxException {
        log.debug("REST request to save AppUserProfile : {}", appUserProfile);
        if (appUserProfile.getId() != null) {
            throw new BadRequestAlertException("A new appUserProfile cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AppUserProfile result = appUserProfileRepository.save(appUserProfile);
        return ResponseEntity.created(new URI("/api/app-user-profiles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /app-user-profiles} : Updates an existing appUserProfile.
     *
     * @param appUserProfile the appUserProfile to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated appUserProfile,
     * or with status {@code 400 (Bad Request)} if the appUserProfile is not valid,
     * or with status {@code 500 (Internal Server Error)} if the appUserProfile couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/app-user-profiles")
    public ResponseEntity<AppUserProfile> updateAppUserProfile(@Valid @RequestBody AppUserProfile appUserProfile) throws URISyntaxException {
        log.debug("REST request to update AppUserProfile : {}", appUserProfile);
        if (appUserProfile.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AppUserProfile result = appUserProfileRepository.save(appUserProfile);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, appUserProfile.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /app-user-profiles} : get all the appUserProfiles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of appUserProfiles in body.
     */
    @GetMapping("/app-user-profiles")
    public List<AppUserProfile> getAllAppUserProfiles() {
        log.debug("REST request to get all AppUserProfiles");
        return appUserProfileRepository.findAll();
    }

    /**
     * {@code GET  /app-user-profiles/:id} : get the "id" appUserProfile.
     *
     * @param id the id of the appUserProfile to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the appUserProfile, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/app-user-profiles/{id}")
    public ResponseEntity<AppUserProfile> getAppUserProfile(@PathVariable Long id) {
        log.debug("REST request to get AppUserProfile : {}", id);
        Optional<AppUserProfile> appUserProfile = appUserProfileRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(appUserProfile);
    }

    /**
     * {@code DELETE  /app-user-profiles/:id} : delete the "id" appUserProfile.
     *
     * @param id the id of the appUserProfile to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/app-user-profiles/{id}")
    public ResponseEntity<Void> deleteAppUserProfile(@PathVariable Long id) {
        log.debug("REST request to delete AppUserProfile : {}", id);
        appUserProfileRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
