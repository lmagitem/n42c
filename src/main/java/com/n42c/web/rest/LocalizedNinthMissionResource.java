package com.n42c.web.rest;

import com.n42c.domain.LocalizedNinthMission;
import com.n42c.repository.LocalizedNinthMissionRepository;
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
 * REST controller for managing {@link com.n42c.domain.LocalizedNinthMission}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LocalizedNinthMissionResource {

    private final Logger log = LoggerFactory.getLogger(LocalizedNinthMissionResource.class);

    private static final String ENTITY_NAME = "localizedNinthMission";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LocalizedNinthMissionRepository localizedNinthMissionRepository;

    public LocalizedNinthMissionResource(LocalizedNinthMissionRepository localizedNinthMissionRepository) {
        this.localizedNinthMissionRepository = localizedNinthMissionRepository;
    }

    /**
     * {@code POST  /localized-ninth-missions} : Create a new localizedNinthMission.
     *
     * @param localizedNinthMission the localizedNinthMission to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new localizedNinthMission, or with status {@code 400 (Bad Request)} if the localizedNinthMission has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/localized-ninth-missions")
    public ResponseEntity<LocalizedNinthMission> createLocalizedNinthMission(@RequestBody LocalizedNinthMission localizedNinthMission) throws URISyntaxException {
        log.debug("REST request to save LocalizedNinthMission : {}", localizedNinthMission);
        if (localizedNinthMission.getId() != null) {
            throw new BadRequestAlertException("A new localizedNinthMission cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LocalizedNinthMission result = localizedNinthMissionRepository.save(localizedNinthMission);
        return ResponseEntity.created(new URI("/api/localized-ninth-missions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /localized-ninth-missions} : Updates an existing localizedNinthMission.
     *
     * @param localizedNinthMission the localizedNinthMission to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated localizedNinthMission,
     * or with status {@code 400 (Bad Request)} if the localizedNinthMission is not valid,
     * or with status {@code 500 (Internal Server Error)} if the localizedNinthMission couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/localized-ninth-missions")
    public ResponseEntity<LocalizedNinthMission> updateLocalizedNinthMission(@RequestBody LocalizedNinthMission localizedNinthMission) throws URISyntaxException {
        log.debug("REST request to update LocalizedNinthMission : {}", localizedNinthMission);
        if (localizedNinthMission.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LocalizedNinthMission result = localizedNinthMissionRepository.save(localizedNinthMission);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, localizedNinthMission.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /localized-ninth-missions} : get all the localizedNinthMissions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of localizedNinthMissions in body.
     */
    @GetMapping("/localized-ninth-missions")
    public List<LocalizedNinthMission> getAllLocalizedNinthMissions() {
        log.debug("REST request to get all LocalizedNinthMissions");
        return localizedNinthMissionRepository.findAll();
    }

    /**
     * {@code GET  /localized-ninth-missions/:id} : get the "id" localizedNinthMission.
     *
     * @param id the id of the localizedNinthMission to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the localizedNinthMission, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/localized-ninth-missions/{id}")
    public ResponseEntity<LocalizedNinthMission> getLocalizedNinthMission(@PathVariable Long id) {
        log.debug("REST request to get LocalizedNinthMission : {}", id);
        Optional<LocalizedNinthMission> localizedNinthMission = localizedNinthMissionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(localizedNinthMission);
    }

    /**
     * {@code DELETE  /localized-ninth-missions/:id} : delete the "id" localizedNinthMission.
     *
     * @param id the id of the localizedNinthMission to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/localized-ninth-missions/{id}")
    public ResponseEntity<Void> deleteLocalizedNinthMission(@PathVariable Long id) {
        log.debug("REST request to delete LocalizedNinthMission : {}", id);
        localizedNinthMissionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
