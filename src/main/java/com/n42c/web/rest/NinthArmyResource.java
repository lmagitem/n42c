package com.n42c.web.rest;

import com.n42c.domain.NinthArmy;
import com.n42c.repository.NinthArmyRepository;
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
 * REST controller for managing {@link com.n42c.domain.NinthArmy}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NinthArmyResource {

    private final Logger log = LoggerFactory.getLogger(NinthArmyResource.class);

    private static final String ENTITY_NAME = "ninthArmy";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NinthArmyRepository ninthArmyRepository;

    public NinthArmyResource(NinthArmyRepository ninthArmyRepository) {
        this.ninthArmyRepository = ninthArmyRepository;
    }

    /**
     * {@code POST  /ninth-armies} : Create a new ninthArmy.
     *
     * @param ninthArmy the ninthArmy to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ninthArmy, or with status {@code 400 (Bad Request)} if the ninthArmy has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ninth-armies")
    public ResponseEntity<NinthArmy> createNinthArmy(@Valid @RequestBody NinthArmy ninthArmy) throws URISyntaxException {
        log.debug("REST request to save NinthArmy : {}", ninthArmy);
        if (ninthArmy.getId() != null) {
            throw new BadRequestAlertException("A new ninthArmy cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NinthArmy result = ninthArmyRepository.save(ninthArmy);
        return ResponseEntity.created(new URI("/api/ninth-armies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ninth-armies} : Updates an existing ninthArmy.
     *
     * @param ninthArmy the ninthArmy to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ninthArmy,
     * or with status {@code 400 (Bad Request)} if the ninthArmy is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ninthArmy couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ninth-armies")
    public ResponseEntity<NinthArmy> updateNinthArmy(@Valid @RequestBody NinthArmy ninthArmy) throws URISyntaxException {
        log.debug("REST request to update NinthArmy : {}", ninthArmy);
        if (ninthArmy.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NinthArmy result = ninthArmyRepository.save(ninthArmy);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ninthArmy.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ninth-armies} : get all the ninthArmies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ninthArmies in body.
     */
    @GetMapping("/ninth-armies")
    public List<NinthArmy> getAllNinthArmies() {
        log.debug("REST request to get all NinthArmies");
        return ninthArmyRepository.findAll();
    }

    /**
     * {@code GET  /ninth-armies/:id} : get the "id" ninthArmy.
     *
     * @param id the id of the ninthArmy to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ninthArmy, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ninth-armies/{id}")
    public ResponseEntity<NinthArmy> getNinthArmy(@PathVariable Long id) {
        log.debug("REST request to get NinthArmy : {}", id);
        Optional<NinthArmy> ninthArmy = ninthArmyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ninthArmy);
    }

    /**
     * {@code DELETE  /ninth-armies/:id} : delete the "id" ninthArmy.
     *
     * @param id the id of the ninthArmy to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ninth-armies/{id}")
    public ResponseEntity<Void> deleteNinthArmy(@PathVariable Long id) {
        log.debug("REST request to delete NinthArmy : {}", id);
        ninthArmyRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
