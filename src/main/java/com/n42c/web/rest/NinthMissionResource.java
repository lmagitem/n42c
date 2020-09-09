package com.n42c.web.rest;

import com.n42c.domain.NinthMission;
import com.n42c.repository.NinthMissionRepository;
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
 * REST controller for managing {@link com.n42c.domain.NinthMission}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NinthMissionResource {

    private final Logger log = LoggerFactory.getLogger(NinthMissionResource.class);

    private static final String ENTITY_NAME = "ninthMission";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NinthMissionRepository ninthMissionRepository;

    public NinthMissionResource(NinthMissionRepository ninthMissionRepository) {
        this.ninthMissionRepository = ninthMissionRepository;
    }

    /**
     * {@code POST  /ninth-missions} : Create a new ninthMission.
     *
     * @param ninthMission the ninthMission to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ninthMission, or with status {@code 400 (Bad Request)} if the ninthMission has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ninth-missions")
    public ResponseEntity<NinthMission> createNinthMission(@RequestBody NinthMission ninthMission) throws URISyntaxException {
        log.debug("REST request to save NinthMission : {}", ninthMission);
        if (ninthMission.getId() != null) {
            throw new BadRequestAlertException("A new ninthMission cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NinthMission result = ninthMissionRepository.save(ninthMission);
        return ResponseEntity.created(new URI("/api/ninth-missions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ninth-missions} : Updates an existing ninthMission.
     *
     * @param ninthMission the ninthMission to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ninthMission,
     * or with status {@code 400 (Bad Request)} if the ninthMission is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ninthMission couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ninth-missions")
    public ResponseEntity<NinthMission> updateNinthMission(@RequestBody NinthMission ninthMission) throws URISyntaxException {
        log.debug("REST request to update NinthMission : {}", ninthMission);
        if (ninthMission.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NinthMission result = ninthMissionRepository.save(ninthMission);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ninthMission.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ninth-missions} : get all the ninthMissions.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ninthMissions in body.
     */
    @GetMapping("/ninth-missions")
    public List<NinthMission> getAllNinthMissions(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all NinthMissions");
        return ninthMissionRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /ninth-missions/:id} : get the "id" ninthMission.
     *
     * @param id the id of the ninthMission to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ninthMission, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ninth-missions/{id}")
    public ResponseEntity<NinthMission> getNinthMission(@PathVariable Long id) {
        log.debug("REST request to get NinthMission : {}", id);
        Optional<NinthMission> ninthMission = ninthMissionRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(ninthMission);
    }

    /**
     * {@code DELETE  /ninth-missions/:id} : delete the "id" ninthMission.
     *
     * @param id the id of the ninthMission to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ninth-missions/{id}")
    public ResponseEntity<Void> deleteNinthMission(@PathVariable Long id) {
        log.debug("REST request to delete NinthMission : {}", id);
        ninthMissionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
