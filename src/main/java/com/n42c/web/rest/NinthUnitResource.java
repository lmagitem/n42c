package com.n42c.web.rest;

import com.n42c.domain.NinthUnit;
import com.n42c.repository.NinthUnitRepository;
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
 * REST controller for managing {@link com.n42c.domain.NinthUnit}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NinthUnitResource {

    private final Logger log = LoggerFactory.getLogger(NinthUnitResource.class);

    private static final String ENTITY_NAME = "ninthUnit";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NinthUnitRepository ninthUnitRepository;

    public NinthUnitResource(NinthUnitRepository ninthUnitRepository) {
        this.ninthUnitRepository = ninthUnitRepository;
    }

    /**
     * {@code POST  /ninth-units} : Create a new ninthUnit.
     *
     * @param ninthUnit the ninthUnit to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ninthUnit, or with status {@code 400 (Bad Request)} if the ninthUnit has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ninth-units")
    public ResponseEntity<NinthUnit> createNinthUnit(@Valid @RequestBody NinthUnit ninthUnit) throws URISyntaxException {
        log.debug("REST request to save NinthUnit : {}", ninthUnit);
        if (ninthUnit.getId() != null) {
            throw new BadRequestAlertException("A new ninthUnit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NinthUnit result = ninthUnitRepository.save(ninthUnit);
        return ResponseEntity.created(new URI("/api/ninth-units/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ninth-units} : Updates an existing ninthUnit.
     *
     * @param ninthUnit the ninthUnit to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ninthUnit,
     * or with status {@code 400 (Bad Request)} if the ninthUnit is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ninthUnit couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ninth-units")
    public ResponseEntity<NinthUnit> updateNinthUnit(@Valid @RequestBody NinthUnit ninthUnit) throws URISyntaxException {
        log.debug("REST request to update NinthUnit : {}", ninthUnit);
        if (ninthUnit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NinthUnit result = ninthUnitRepository.save(ninthUnit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ninthUnit.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ninth-units} : get all the ninthUnits.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ninthUnits in body.
     */
    @GetMapping("/ninth-units")
    public List<NinthUnit> getAllNinthUnits() {
        log.debug("REST request to get all NinthUnits");
        return ninthUnitRepository.findAll();
    }

    /**
     * {@code GET  /ninth-units/:id} : get the "id" ninthUnit.
     *
     * @param id the id of the ninthUnit to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ninthUnit, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ninth-units/{id}")
    public ResponseEntity<NinthUnit> getNinthUnit(@PathVariable Long id) {
        log.debug("REST request to get NinthUnit : {}", id);
        Optional<NinthUnit> ninthUnit = ninthUnitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ninthUnit);
    }

    /**
     * {@code DELETE  /ninth-units/:id} : delete the "id" ninthUnit.
     *
     * @param id the id of the ninthUnit to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ninth-units/{id}")
    public ResponseEntity<Void> deleteNinthUnit(@PathVariable Long id) {
        log.debug("REST request to delete NinthUnit : {}", id);
        ninthUnitRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
