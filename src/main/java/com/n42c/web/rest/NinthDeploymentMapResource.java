package com.n42c.web.rest;

import com.n42c.domain.NinthDeploymentMap;
import com.n42c.repository.NinthDeploymentMapRepository;
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
 * REST controller for managing {@link com.n42c.domain.NinthDeploymentMap}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NinthDeploymentMapResource {

    private final Logger log = LoggerFactory.getLogger(NinthDeploymentMapResource.class);

    private static final String ENTITY_NAME = "ninthDeploymentMap";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NinthDeploymentMapRepository ninthDeploymentMapRepository;

    public NinthDeploymentMapResource(NinthDeploymentMapRepository ninthDeploymentMapRepository) {
        this.ninthDeploymentMapRepository = ninthDeploymentMapRepository;
    }

    /**
     * {@code POST  /ninth-deployment-maps} : Create a new ninthDeploymentMap.
     *
     * @param ninthDeploymentMap the ninthDeploymentMap to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ninthDeploymentMap, or with status {@code 400 (Bad Request)} if the ninthDeploymentMap has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ninth-deployment-maps")
    public ResponseEntity<NinthDeploymentMap> createNinthDeploymentMap(@RequestBody NinthDeploymentMap ninthDeploymentMap) throws URISyntaxException {
        log.debug("REST request to save NinthDeploymentMap : {}", ninthDeploymentMap);
        if (ninthDeploymentMap.getId() != null) {
            throw new BadRequestAlertException("A new ninthDeploymentMap cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NinthDeploymentMap result = ninthDeploymentMapRepository.save(ninthDeploymentMap);
        return ResponseEntity.created(new URI("/api/ninth-deployment-maps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ninth-deployment-maps} : Updates an existing ninthDeploymentMap.
     *
     * @param ninthDeploymentMap the ninthDeploymentMap to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ninthDeploymentMap,
     * or with status {@code 400 (Bad Request)} if the ninthDeploymentMap is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ninthDeploymentMap couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ninth-deployment-maps")
    public ResponseEntity<NinthDeploymentMap> updateNinthDeploymentMap(@RequestBody NinthDeploymentMap ninthDeploymentMap) throws URISyntaxException {
        log.debug("REST request to update NinthDeploymentMap : {}", ninthDeploymentMap);
        if (ninthDeploymentMap.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NinthDeploymentMap result = ninthDeploymentMapRepository.save(ninthDeploymentMap);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ninthDeploymentMap.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ninth-deployment-maps} : get all the ninthDeploymentMaps.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ninthDeploymentMaps in body.
     */
    @GetMapping("/ninth-deployment-maps")
    public List<NinthDeploymentMap> getAllNinthDeploymentMaps(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all NinthDeploymentMaps");
        return ninthDeploymentMapRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /ninth-deployment-maps/:id} : get the "id" ninthDeploymentMap.
     *
     * @param id the id of the ninthDeploymentMap to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ninthDeploymentMap, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ninth-deployment-maps/{id}")
    public ResponseEntity<NinthDeploymentMap> getNinthDeploymentMap(@PathVariable Long id) {
        log.debug("REST request to get NinthDeploymentMap : {}", id);
        Optional<NinthDeploymentMap> ninthDeploymentMap = ninthDeploymentMapRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(ninthDeploymentMap);
    }

    /**
     * {@code DELETE  /ninth-deployment-maps/:id} : delete the "id" ninthDeploymentMap.
     *
     * @param id the id of the ninthDeploymentMap to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ninth-deployment-maps/{id}")
    public ResponseEntity<Void> deleteNinthDeploymentMap(@PathVariable Long id) {
        log.debug("REST request to delete NinthDeploymentMap : {}", id);
        ninthDeploymentMapRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
