package com.n42c.web.rest;

import com.n42c.domain.NinthBattle;
import com.n42c.repository.NinthBattleRepository;
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
 * REST controller for managing {@link com.n42c.domain.NinthBattle}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NinthBattleResource {

    private final Logger log = LoggerFactory.getLogger(NinthBattleResource.class);

    private static final String ENTITY_NAME = "ninthBattle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NinthBattleRepository ninthBattleRepository;

    public NinthBattleResource(NinthBattleRepository ninthBattleRepository) {
        this.ninthBattleRepository = ninthBattleRepository;
    }

    /**
     * {@code POST  /ninth-battles} : Create a new ninthBattle.
     *
     * @param ninthBattle the ninthBattle to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ninthBattle, or with status {@code 400 (Bad Request)} if the ninthBattle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ninth-battles")
    public ResponseEntity<NinthBattle> createNinthBattle(@Valid @RequestBody NinthBattle ninthBattle) throws URISyntaxException {
        log.debug("REST request to save NinthBattle : {}", ninthBattle);
        if (ninthBattle.getId() != null) {
            throw new BadRequestAlertException("A new ninthBattle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NinthBattle result = ninthBattleRepository.save(ninthBattle);
        return ResponseEntity.created(new URI("/api/ninth-battles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ninth-battles} : Updates an existing ninthBattle.
     *
     * @param ninthBattle the ninthBattle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ninthBattle,
     * or with status {@code 400 (Bad Request)} if the ninthBattle is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ninthBattle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ninth-battles")
    public ResponseEntity<NinthBattle> updateNinthBattle(@Valid @RequestBody NinthBattle ninthBattle) throws URISyntaxException {
        log.debug("REST request to update NinthBattle : {}", ninthBattle);
        if (ninthBattle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NinthBattle result = ninthBattleRepository.save(ninthBattle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ninthBattle.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ninth-battles} : get all the ninthBattles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ninthBattles in body.
     */
    @GetMapping("/ninth-battles")
    public List<NinthBattle> getAllNinthBattles() {
        log.debug("REST request to get all NinthBattles");
        return ninthBattleRepository.findAll();
    }

    /**
     * {@code GET  /ninth-battles/:id} : get the "id" ninthBattle.
     *
     * @param id the id of the ninthBattle to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ninthBattle, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ninth-battles/{id}")
    public ResponseEntity<NinthBattle> getNinthBattle(@PathVariable Long id) {
        log.debug("REST request to get NinthBattle : {}", id);
        Optional<NinthBattle> ninthBattle = ninthBattleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ninthBattle);
    }

    /**
     * {@code DELETE  /ninth-battles/:id} : delete the "id" ninthBattle.
     *
     * @param id the id of the ninthBattle to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ninth-battles/{id}")
    public ResponseEntity<Void> deleteNinthBattle(@PathVariable Long id) {
        log.debug("REST request to delete NinthBattle : {}", id);
        ninthBattleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
