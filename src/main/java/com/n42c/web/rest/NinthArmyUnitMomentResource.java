package com.n42c.web.rest;

import com.n42c.domain.NinthArmyUnitMoment;
import com.n42c.repository.NinthArmyUnitMomentRepository;
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
 * REST controller for managing {@link com.n42c.domain.NinthArmyUnitMoment}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NinthArmyUnitMomentResource {

    private static final String ENTITY_NAME = "ninthArmyUnitMoment";
    private final Logger log = LoggerFactory.getLogger(NinthArmyUnitMomentResource.class);
    private final NinthArmyUnitMomentRepository ninthArmyUnitMomentRepository;
    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public NinthArmyUnitMomentResource(NinthArmyUnitMomentRepository ninthArmyUnitMomentRepository) {
        this.ninthArmyUnitMomentRepository = ninthArmyUnitMomentRepository;
    }

    /**
     * {@code POST  /ninth-army-unit-moments} : Create a new ninthArmyUnitMoment.
     *
     * @param ninthArmyUnitMoment the ninthArmyUnitMoment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ninthArmyUnitMoment, or with status {@code 400 (Bad Request)} if the ninthArmyUnitMoment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ninth-army-unit-moments")
    public ResponseEntity<NinthArmyUnitMoment> createNinthArmyUnitMoment(@Valid @RequestBody NinthArmyUnitMoment ninthArmyUnitMoment) throws URISyntaxException {
        log.debug("REST request to save NinthArmyUnitMoment : {}", ninthArmyUnitMoment);
        if (ninthArmyUnitMoment.getId() != null) {
            throw new BadRequestAlertException("A new ninthArmyUnitMoment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NinthArmyUnitMoment result = ninthArmyUnitMomentRepository.save(ninthArmyUnitMoment);
        return ResponseEntity.created(new URI("/api/ninth-army-unit-moments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ninth-army-unit-moments} : Updates an existing ninthArmyUnitMoment.
     *
     * @param ninthArmyUnitMoment the ninthArmyUnitMoment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ninthArmyUnitMoment,
     * or with status {@code 400 (Bad Request)} if the ninthArmyUnitMoment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ninthArmyUnitMoment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ninth-army-unit-moments")
    public ResponseEntity<NinthArmyUnitMoment> updateNinthArmyUnitMoment(@Valid @RequestBody NinthArmyUnitMoment ninthArmyUnitMoment) throws URISyntaxException {
        log.debug("REST request to update NinthArmyUnitMoment : {}", ninthArmyUnitMoment);
        if (ninthArmyUnitMoment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NinthArmyUnitMoment result = ninthArmyUnitMomentRepository.save(ninthArmyUnitMoment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ninthArmyUnitMoment.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ninth-army-unit-moments} : get all the ninthArmyUnitMoments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ninthArmyUnitMoments in body.
     */
    @GetMapping("/ninth-army-unit-moments")
    public List<NinthArmyUnitMoment> getAllNinthArmyUnitMoments() {
        log.debug("REST request to get all NinthArmyUnitMoments");
        return ninthArmyUnitMomentRepository.findAll();
    }

    /**
     * {@code GET  /ninth-army-unit-moments/:id} : get the "id" ninthArmyUnitMoment.
     *
     * @param id the id of the ninthArmyUnitMoment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ninthArmyUnitMoment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ninth-army-unit-moments/{id}")
    public ResponseEntity<NinthArmyUnitMoment> getNinthArmyUnitMoment(@PathVariable Long id) {
        log.debug("REST request to get NinthArmyUnitMoment : {}", id);
        Optional<NinthArmyUnitMoment> ninthArmyUnitMoment = ninthArmyUnitMomentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ninthArmyUnitMoment);
    }

    /**
     * {@code DELETE  /ninth-army-unit-moments/:id} : delete the "id" ninthArmyUnitMoment.
     *
     * @param id the id of the ninthArmyUnitMoment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ninth-army-unit-moments/{id}")
    public ResponseEntity<Void> deleteNinthArmyUnitMoment(@PathVariable Long id) {
        log.debug("REST request to delete NinthArmyUnitMoment : {}", id);
        ninthArmyUnitMomentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
