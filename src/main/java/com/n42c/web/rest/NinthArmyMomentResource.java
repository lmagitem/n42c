package com.n42c.web.rest;

import com.n42c.domain.NinthArmyMoment;
import com.n42c.repository.NinthArmyMomentRepository;
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
 * REST controller for managing {@link com.n42c.domain.NinthArmyMoment}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NinthArmyMomentResource {

    private final Logger log = LoggerFactory.getLogger(NinthArmyMomentResource.class);

    private static final String ENTITY_NAME = "ninthArmyMoment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NinthArmyMomentRepository ninthArmyMomentRepository;

    public NinthArmyMomentResource(NinthArmyMomentRepository ninthArmyMomentRepository) {
        this.ninthArmyMomentRepository = ninthArmyMomentRepository;
    }

    /**
     * {@code POST  /ninth-army-moments} : Create a new ninthArmyMoment.
     *
     * @param ninthArmyMoment the ninthArmyMoment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ninthArmyMoment, or with status {@code 400 (Bad Request)} if the ninthArmyMoment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ninth-army-moments")
    public ResponseEntity<NinthArmyMoment> createNinthArmyMoment(@Valid @RequestBody NinthArmyMoment ninthArmyMoment) throws URISyntaxException {
        log.debug("REST request to save NinthArmyMoment : {}", ninthArmyMoment);
        if (ninthArmyMoment.getId() != null) {
            throw new BadRequestAlertException("A new ninthArmyMoment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NinthArmyMoment result = ninthArmyMomentRepository.save(ninthArmyMoment);
        return ResponseEntity.created(new URI("/api/ninth-army-moments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ninth-army-moments} : Updates an existing ninthArmyMoment.
     *
     * @param ninthArmyMoment the ninthArmyMoment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ninthArmyMoment,
     * or with status {@code 400 (Bad Request)} if the ninthArmyMoment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ninthArmyMoment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ninth-army-moments")
    public ResponseEntity<NinthArmyMoment> updateNinthArmyMoment(@Valid @RequestBody NinthArmyMoment ninthArmyMoment) throws URISyntaxException {
        log.debug("REST request to update NinthArmyMoment : {}", ninthArmyMoment);
        if (ninthArmyMoment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NinthArmyMoment result = ninthArmyMomentRepository.save(ninthArmyMoment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ninthArmyMoment.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ninth-army-moments} : get all the ninthArmyMoments.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ninthArmyMoments in body.
     */
    @GetMapping("/ninth-army-moments")
    public List<NinthArmyMoment> getAllNinthArmyMoments(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all NinthArmyMoments");
        return ninthArmyMomentRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /ninth-army-moments/:id} : get the "id" ninthArmyMoment.
     *
     * @param id the id of the ninthArmyMoment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ninthArmyMoment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ninth-army-moments/{id}")
    public ResponseEntity<NinthArmyMoment> getNinthArmyMoment(@PathVariable Long id) {
        log.debug("REST request to get NinthArmyMoment : {}", id);
        Optional<NinthArmyMoment> ninthArmyMoment = ninthArmyMomentRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(ninthArmyMoment);
    }

    /**
     * {@code DELETE  /ninth-army-moments/:id} : delete the "id" ninthArmyMoment.
     *
     * @param id the id of the ninthArmyMoment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ninth-army-moments/{id}")
    public ResponseEntity<Void> deleteNinthArmyMoment(@PathVariable Long id) {
        log.debug("REST request to delete NinthArmyMoment : {}", id);
        ninthArmyMomentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
