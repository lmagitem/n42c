package com.n42c.web.rest;

import com.n42c.domain.NinthObjective;
import com.n42c.repository.NinthObjectiveRepository;
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
 * REST controller for managing {@link com.n42c.domain.NinthObjective}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NinthObjectiveResource {

    private final Logger log = LoggerFactory.getLogger(NinthObjectiveResource.class);

    private static final String ENTITY_NAME = "ninthObjective";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NinthObjectiveRepository ninthObjectiveRepository;

    public NinthObjectiveResource(NinthObjectiveRepository ninthObjectiveRepository) {
        this.ninthObjectiveRepository = ninthObjectiveRepository;
    }

    /**
     * {@code POST  /ninth-objectives} : Create a new ninthObjective.
     *
     * @param ninthObjective the ninthObjective to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ninthObjective, or with status {@code 400 (Bad Request)} if the ninthObjective has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ninth-objectives")
    public ResponseEntity<NinthObjective> createNinthObjective(@RequestBody NinthObjective ninthObjective) throws URISyntaxException {
        log.debug("REST request to save NinthObjective : {}", ninthObjective);
        if (ninthObjective.getId() != null) {
            throw new BadRequestAlertException("A new ninthObjective cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NinthObjective result = ninthObjectiveRepository.save(ninthObjective);
        return ResponseEntity.created(new URI("/api/ninth-objectives/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ninth-objectives} : Updates an existing ninthObjective.
     *
     * @param ninthObjective the ninthObjective to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ninthObjective,
     * or with status {@code 400 (Bad Request)} if the ninthObjective is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ninthObjective couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ninth-objectives")
    public ResponseEntity<NinthObjective> updateNinthObjective(@RequestBody NinthObjective ninthObjective) throws URISyntaxException {
        log.debug("REST request to update NinthObjective : {}", ninthObjective);
        if (ninthObjective.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NinthObjective result = ninthObjectiveRepository.save(ninthObjective);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ninthObjective.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ninth-objectives} : get all the ninthObjectives.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ninthObjectives in body.
     */
    @GetMapping("/ninth-objectives")
    public List<NinthObjective> getAllNinthObjectives() {
        log.debug("REST request to get all NinthObjectives");
        return ninthObjectiveRepository.findAll();
    }

    /**
     * {@code GET  /ninth-objectives/:id} : get the "id" ninthObjective.
     *
     * @param id the id of the ninthObjective to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ninthObjective, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ninth-objectives/{id}")
    public ResponseEntity<NinthObjective> getNinthObjective(@PathVariable Long id) {
        log.debug("REST request to get NinthObjective : {}", id);
        Optional<NinthObjective> ninthObjective = ninthObjectiveRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ninthObjective);
    }

    /**
     * {@code DELETE  /ninth-objectives/:id} : delete the "id" ninthObjective.
     *
     * @param id the id of the ninthObjective to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ninth-objectives/{id}")
    public ResponseEntity<Void> deleteNinthObjective(@PathVariable Long id) {
        log.debug("REST request to delete NinthObjective : {}", id);
        ninthObjectiveRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
