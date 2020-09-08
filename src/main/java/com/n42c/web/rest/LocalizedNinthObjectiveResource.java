package com.n42c.web.rest;

import com.n42c.domain.LocalizedNinthObjective;
import com.n42c.repository.LocalizedNinthObjectiveRepository;
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
 * REST controller for managing {@link com.n42c.domain.LocalizedNinthObjective}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LocalizedNinthObjectiveResource {

    private final Logger log = LoggerFactory.getLogger(LocalizedNinthObjectiveResource.class);

    private static final String ENTITY_NAME = "localizedNinthObjective";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LocalizedNinthObjectiveRepository localizedNinthObjectiveRepository;

    public LocalizedNinthObjectiveResource(LocalizedNinthObjectiveRepository localizedNinthObjectiveRepository) {
        this.localizedNinthObjectiveRepository = localizedNinthObjectiveRepository;
    }

    /**
     * {@code POST  /localized-ninth-objectives} : Create a new localizedNinthObjective.
     *
     * @param localizedNinthObjective the localizedNinthObjective to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new localizedNinthObjective, or with status {@code 400 (Bad Request)} if the localizedNinthObjective has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/localized-ninth-objectives")
    public ResponseEntity<LocalizedNinthObjective> createLocalizedNinthObjective(@RequestBody LocalizedNinthObjective localizedNinthObjective) throws URISyntaxException {
        log.debug("REST request to save LocalizedNinthObjective : {}", localizedNinthObjective);
        if (localizedNinthObjective.getId() != null) {
            throw new BadRequestAlertException("A new localizedNinthObjective cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LocalizedNinthObjective result = localizedNinthObjectiveRepository.save(localizedNinthObjective);
        return ResponseEntity.created(new URI("/api/localized-ninth-objectives/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /localized-ninth-objectives} : Updates an existing localizedNinthObjective.
     *
     * @param localizedNinthObjective the localizedNinthObjective to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated localizedNinthObjective,
     * or with status {@code 400 (Bad Request)} if the localizedNinthObjective is not valid,
     * or with status {@code 500 (Internal Server Error)} if the localizedNinthObjective couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/localized-ninth-objectives")
    public ResponseEntity<LocalizedNinthObjective> updateLocalizedNinthObjective(@RequestBody LocalizedNinthObjective localizedNinthObjective) throws URISyntaxException {
        log.debug("REST request to update LocalizedNinthObjective : {}", localizedNinthObjective);
        if (localizedNinthObjective.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LocalizedNinthObjective result = localizedNinthObjectiveRepository.save(localizedNinthObjective);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, localizedNinthObjective.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /localized-ninth-objectives} : get all the localizedNinthObjectives.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of localizedNinthObjectives in body.
     */
    @GetMapping("/localized-ninth-objectives")
    public List<LocalizedNinthObjective> getAllLocalizedNinthObjectives() {
        log.debug("REST request to get all LocalizedNinthObjectives");
        return localizedNinthObjectiveRepository.findAll();
    }

    /**
     * {@code GET  /localized-ninth-objectives/:id} : get the "id" localizedNinthObjective.
     *
     * @param id the id of the localizedNinthObjective to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the localizedNinthObjective, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/localized-ninth-objectives/{id}")
    public ResponseEntity<LocalizedNinthObjective> getLocalizedNinthObjective(@PathVariable Long id) {
        log.debug("REST request to get LocalizedNinthObjective : {}", id);
        Optional<LocalizedNinthObjective> localizedNinthObjective = localizedNinthObjectiveRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(localizedNinthObjective);
    }

    /**
     * {@code DELETE  /localized-ninth-objectives/:id} : delete the "id" localizedNinthObjective.
     *
     * @param id the id of the localizedNinthObjective to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/localized-ninth-objectives/{id}")
    public ResponseEntity<Void> deleteLocalizedNinthObjective(@PathVariable Long id) {
        log.debug("REST request to delete LocalizedNinthObjective : {}", id);
        localizedNinthObjectiveRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
