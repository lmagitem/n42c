package com.n42c.web.rest;

import com.n42c.domain.NinthUnitMoment;
import com.n42c.repository.NinthUnitMomentRepository;
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
 * REST controller for managing {@link com.n42c.domain.NinthUnitMoment}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NinthUnitMomentResource {

    private static final String ENTITY_NAME = "ninthUnitMoment";
    private final Logger log = LoggerFactory.getLogger(NinthUnitMomentResource.class);
    private final NinthUnitMomentRepository ninthUnitMomentRepository;
    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public NinthUnitMomentResource(NinthUnitMomentRepository ninthUnitMomentRepository) {
        this.ninthUnitMomentRepository = ninthUnitMomentRepository;
    }

    /**
     * {@code POST  /ninth-unit-moments} : Create a new ninthUnitMoment.
     *
     * @param ninthUnitMoment the ninthUnitMoment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ninthUnitMoment, or with status {@code 400 (Bad Request)} if the ninthUnitMoment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ninth-unit-moments")
    public ResponseEntity<NinthUnitMoment> createNinthUnitMoment(@Valid @RequestBody NinthUnitMoment ninthUnitMoment) throws URISyntaxException {
        log.debug("REST request to save NinthUnitMoment : {}", ninthUnitMoment);
        if (ninthUnitMoment.getId() != null) {
            throw new BadRequestAlertException("A new ninthUnitMoment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NinthUnitMoment result = ninthUnitMomentRepository.save(ninthUnitMoment);
        return ResponseEntity.created(new URI("/api/ninth-unit-moments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ninth-unit-moments} : Updates an existing ninthUnitMoment.
     *
     * @param ninthUnitMoment the ninthUnitMoment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ninthUnitMoment,
     * or with status {@code 400 (Bad Request)} if the ninthUnitMoment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ninthUnitMoment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ninth-unit-moments")
    public ResponseEntity<NinthUnitMoment> updateNinthUnitMoment(@Valid @RequestBody NinthUnitMoment ninthUnitMoment) throws URISyntaxException {
        log.debug("REST request to update NinthUnitMoment : {}", ninthUnitMoment);
        if (ninthUnitMoment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NinthUnitMoment result = ninthUnitMomentRepository.save(ninthUnitMoment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ninthUnitMoment.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ninth-unit-moments} : get all the ninthUnitMoments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ninthUnitMoments in body.
     */
    @GetMapping("/ninth-unit-moments")
    public List<NinthUnitMoment> getAllNinthUnitMoments() {
        log.debug("REST request to get all NinthUnitMoments");
        return ninthUnitMomentRepository.findAll();
    }

    /**
     * {@code GET  /ninth-unit-moments/:id} : get the "id" ninthUnitMoment.
     *
     * @param id the id of the ninthUnitMoment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ninthUnitMoment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ninth-unit-moments/{id}")
    public ResponseEntity<NinthUnitMoment> getNinthUnitMoment(@PathVariable Long id) {
        log.debug("REST request to get NinthUnitMoment : {}", id);
        Optional<NinthUnitMoment> ninthUnitMoment = ninthUnitMomentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ninthUnitMoment);
    }

    /**
     * {@code DELETE  /ninth-unit-moments/:id} : delete the "id" ninthUnitMoment.
     *
     * @param id the id of the ninthUnitMoment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ninth-unit-moments/{id}")
    public ResponseEntity<Void> deleteNinthUnitMoment(@PathVariable Long id) {
        log.debug("REST request to delete NinthUnitMoment : {}", id);
        ninthUnitMomentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
