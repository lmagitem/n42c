package com.n42c.web.rest;

import com.n42c.domain.NinthStratagemGroup;
import com.n42c.repository.NinthStratagemGroupRepository;
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
 * REST controller for managing {@link com.n42c.domain.NinthStratagemGroup}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NinthStratagemGroupResource {

    private final Logger log = LoggerFactory.getLogger(NinthStratagemGroupResource.class);

    private static final String ENTITY_NAME = "ninthStratagemGroup";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NinthStratagemGroupRepository ninthStratagemGroupRepository;

    public NinthStratagemGroupResource(NinthStratagemGroupRepository ninthStratagemGroupRepository) {
        this.ninthStratagemGroupRepository = ninthStratagemGroupRepository;
    }

    /**
     * {@code POST  /ninth-stratagem-groups} : Create a new ninthStratagemGroup.
     *
     * @param ninthStratagemGroup the ninthStratagemGroup to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ninthStratagemGroup, or with status {@code 400 (Bad Request)} if the ninthStratagemGroup has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ninth-stratagem-groups")
    public ResponseEntity<NinthStratagemGroup> createNinthStratagemGroup(@RequestBody NinthStratagemGroup ninthStratagemGroup) throws URISyntaxException {
        log.debug("REST request to save NinthStratagemGroup : {}", ninthStratagemGroup);
        if (ninthStratagemGroup.getId() != null) {
            throw new BadRequestAlertException("A new ninthStratagemGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NinthStratagemGroup result = ninthStratagemGroupRepository.save(ninthStratagemGroup);
        return ResponseEntity.created(new URI("/api/ninth-stratagem-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ninth-stratagem-groups} : Updates an existing ninthStratagemGroup.
     *
     * @param ninthStratagemGroup the ninthStratagemGroup to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ninthStratagemGroup,
     * or with status {@code 400 (Bad Request)} if the ninthStratagemGroup is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ninthStratagemGroup couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ninth-stratagem-groups")
    public ResponseEntity<NinthStratagemGroup> updateNinthStratagemGroup(@RequestBody NinthStratagemGroup ninthStratagemGroup) throws URISyntaxException {
        log.debug("REST request to update NinthStratagemGroup : {}", ninthStratagemGroup);
        if (ninthStratagemGroup.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NinthStratagemGroup result = ninthStratagemGroupRepository.save(ninthStratagemGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ninthStratagemGroup.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ninth-stratagem-groups} : get all the ninthStratagemGroups.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ninthStratagemGroups in body.
     */
    @GetMapping("/ninth-stratagem-groups")
    public List<NinthStratagemGroup> getAllNinthStratagemGroups() {
        log.debug("REST request to get all NinthStratagemGroups");
        return ninthStratagemGroupRepository.findAll();
    }

    /**
     * {@code GET  /ninth-stratagem-groups/:id} : get the "id" ninthStratagemGroup.
     *
     * @param id the id of the ninthStratagemGroup to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ninthStratagemGroup, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ninth-stratagem-groups/{id}")
    public ResponseEntity<NinthStratagemGroup> getNinthStratagemGroup(@PathVariable Long id) {
        log.debug("REST request to get NinthStratagemGroup : {}", id);
        Optional<NinthStratagemGroup> ninthStratagemGroup = ninthStratagemGroupRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ninthStratagemGroup);
    }

    /**
     * {@code DELETE  /ninth-stratagem-groups/:id} : delete the "id" ninthStratagemGroup.
     *
     * @param id the id of the ninthStratagemGroup to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ninth-stratagem-groups/{id}")
    public ResponseEntity<Void> deleteNinthStratagemGroup(@PathVariable Long id) {
        log.debug("REST request to delete NinthStratagemGroup : {}", id);
        ninthStratagemGroupRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
