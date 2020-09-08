package com.n42c.web.rest;

import com.n42c.domain.NinthArmyUnit;
import com.n42c.repository.NinthArmyUnitRepository;
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
 * REST controller for managing {@link com.n42c.domain.NinthArmyUnit}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NinthArmyUnitResource {

    private final Logger log = LoggerFactory.getLogger(NinthArmyUnitResource.class);

    private static final String ENTITY_NAME = "ninthArmyUnit";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NinthArmyUnitRepository ninthArmyUnitRepository;

    public NinthArmyUnitResource(NinthArmyUnitRepository ninthArmyUnitRepository) {
        this.ninthArmyUnitRepository = ninthArmyUnitRepository;
    }

    /**
     * {@code POST  /ninth-army-units} : Create a new ninthArmyUnit.
     *
     * @param ninthArmyUnit the ninthArmyUnit to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ninthArmyUnit, or with status {@code 400 (Bad Request)} if the ninthArmyUnit has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ninth-army-units")
    public ResponseEntity<NinthArmyUnit> createNinthArmyUnit(@RequestBody NinthArmyUnit ninthArmyUnit) throws URISyntaxException {
        log.debug("REST request to save NinthArmyUnit : {}", ninthArmyUnit);
        if (ninthArmyUnit.getId() != null) {
            throw new BadRequestAlertException("A new ninthArmyUnit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NinthArmyUnit result = ninthArmyUnitRepository.save(ninthArmyUnit);
        return ResponseEntity.created(new URI("/api/ninth-army-units/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ninth-army-units} : Updates an existing ninthArmyUnit.
     *
     * @param ninthArmyUnit the ninthArmyUnit to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ninthArmyUnit,
     * or with status {@code 400 (Bad Request)} if the ninthArmyUnit is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ninthArmyUnit couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ninth-army-units")
    public ResponseEntity<NinthArmyUnit> updateNinthArmyUnit(@RequestBody NinthArmyUnit ninthArmyUnit) throws URISyntaxException {
        log.debug("REST request to update NinthArmyUnit : {}", ninthArmyUnit);
        if (ninthArmyUnit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NinthArmyUnit result = ninthArmyUnitRepository.save(ninthArmyUnit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ninthArmyUnit.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ninth-army-units} : get all the ninthArmyUnits.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ninthArmyUnits in body.
     */
    @GetMapping("/ninth-army-units")
    public List<NinthArmyUnit> getAllNinthArmyUnits() {
        log.debug("REST request to get all NinthArmyUnits");
        return ninthArmyUnitRepository.findAll();
    }

    /**
     * {@code GET  /ninth-army-units/:id} : get the "id" ninthArmyUnit.
     *
     * @param id the id of the ninthArmyUnit to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ninthArmyUnit, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ninth-army-units/{id}")
    public ResponseEntity<NinthArmyUnit> getNinthArmyUnit(@PathVariable Long id) {
        log.debug("REST request to get NinthArmyUnit : {}", id);
        Optional<NinthArmyUnit> ninthArmyUnit = ninthArmyUnitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ninthArmyUnit);
    }

    /**
     * {@code DELETE  /ninth-army-units/:id} : delete the "id" ninthArmyUnit.
     *
     * @param id the id of the ninthArmyUnit to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ninth-army-units/{id}")
    public ResponseEntity<Void> deleteNinthArmyUnit(@PathVariable Long id) {
        log.debug("REST request to delete NinthArmyUnit : {}", id);
        ninthArmyUnitRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
