package com.n42c.web.rest;

import com.n42c.domain.LocalizedNinthDeploymentMap;
import com.n42c.repository.LocalizedNinthDeploymentMapRepository;
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
 * REST controller for managing {@link com.n42c.domain.LocalizedNinthDeploymentMap}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LocalizedNinthDeploymentMapResource {

    private static final String ENTITY_NAME = "localizedNinthDeploymentMap";
    private final Logger log = LoggerFactory.getLogger(LocalizedNinthDeploymentMapResource.class);
    private final LocalizedNinthDeploymentMapRepository localizedNinthDeploymentMapRepository;
    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public LocalizedNinthDeploymentMapResource(LocalizedNinthDeploymentMapRepository localizedNinthDeploymentMapRepository) {
        this.localizedNinthDeploymentMapRepository = localizedNinthDeploymentMapRepository;
    }

    /**
     * {@code POST  /localized-ninth-deployment-maps} : Create a new localizedNinthDeploymentMap.
     *
     * @param localizedNinthDeploymentMap the localizedNinthDeploymentMap to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new localizedNinthDeploymentMap, or with status {@code 400 (Bad Request)} if the localizedNinthDeploymentMap has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/localized-ninth-deployment-maps")
    public ResponseEntity<LocalizedNinthDeploymentMap> createLocalizedNinthDeploymentMap(@Valid @RequestBody LocalizedNinthDeploymentMap localizedNinthDeploymentMap) throws URISyntaxException {
        log.debug("REST request to save LocalizedNinthDeploymentMap : {}", localizedNinthDeploymentMap);
        if (localizedNinthDeploymentMap.getId() != null) {
            throw new BadRequestAlertException("A new localizedNinthDeploymentMap cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LocalizedNinthDeploymentMap result = localizedNinthDeploymentMapRepository.save(localizedNinthDeploymentMap);
        return ResponseEntity.created(new URI("/api/localized-ninth-deployment-maps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /localized-ninth-deployment-maps} : Updates an existing localizedNinthDeploymentMap.
     *
     * @param localizedNinthDeploymentMap the localizedNinthDeploymentMap to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated localizedNinthDeploymentMap,
     * or with status {@code 400 (Bad Request)} if the localizedNinthDeploymentMap is not valid,
     * or with status {@code 500 (Internal Server Error)} if the localizedNinthDeploymentMap couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/localized-ninth-deployment-maps")
    public ResponseEntity<LocalizedNinthDeploymentMap> updateLocalizedNinthDeploymentMap(@Valid @RequestBody LocalizedNinthDeploymentMap localizedNinthDeploymentMap) throws URISyntaxException {
        log.debug("REST request to update LocalizedNinthDeploymentMap : {}", localizedNinthDeploymentMap);
        if (localizedNinthDeploymentMap.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LocalizedNinthDeploymentMap result = localizedNinthDeploymentMapRepository.save(localizedNinthDeploymentMap);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, localizedNinthDeploymentMap.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /localized-ninth-deployment-maps} : get all the localizedNinthDeploymentMaps.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of localizedNinthDeploymentMaps in body.
     */
    @GetMapping("/localized-ninth-deployment-maps")
    public List<LocalizedNinthDeploymentMap> getAllLocalizedNinthDeploymentMaps() {
        log.debug("REST request to get all LocalizedNinthDeploymentMaps");
        return localizedNinthDeploymentMapRepository.findAll();
    }

    /**
     * {@code GET  /localized-ninth-deployment-maps/:id} : get the "id" localizedNinthDeploymentMap.
     *
     * @param id the id of the localizedNinthDeploymentMap to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the localizedNinthDeploymentMap, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/localized-ninth-deployment-maps/{id}")
    public ResponseEntity<LocalizedNinthDeploymentMap> getLocalizedNinthDeploymentMap(@PathVariable Long id) {
        log.debug("REST request to get LocalizedNinthDeploymentMap : {}", id);
        Optional<LocalizedNinthDeploymentMap> localizedNinthDeploymentMap = localizedNinthDeploymentMapRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(localizedNinthDeploymentMap);
    }

    /**
     * {@code DELETE  /localized-ninth-deployment-maps/:id} : delete the "id" localizedNinthDeploymentMap.
     *
     * @param id the id of the localizedNinthDeploymentMap to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/localized-ninth-deployment-maps/{id}")
    public ResponseEntity<Void> deleteLocalizedNinthDeploymentMap(@PathVariable Long id) {
        log.debug("REST request to delete LocalizedNinthDeploymentMap : {}", id);
        localizedNinthDeploymentMapRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
