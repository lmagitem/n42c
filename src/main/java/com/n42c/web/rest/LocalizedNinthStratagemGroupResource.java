package com.n42c.web.rest;

import com.n42c.domain.LocalizedNinthStratagemGroup;
import com.n42c.repository.LocalizedNinthStratagemGroupRepository;
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
 * REST controller for managing {@link com.n42c.domain.LocalizedNinthStratagemGroup}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LocalizedNinthStratagemGroupResource {

    private static final String ENTITY_NAME = "localizedNinthStratagemGroup";
    private final Logger log = LoggerFactory.getLogger(LocalizedNinthStratagemGroupResource.class);
    private final LocalizedNinthStratagemGroupRepository localizedNinthStratagemGroupRepository;
    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public LocalizedNinthStratagemGroupResource(LocalizedNinthStratagemGroupRepository localizedNinthStratagemGroupRepository) {
        this.localizedNinthStratagemGroupRepository = localizedNinthStratagemGroupRepository;
    }

    /**
     * {@code POST  /localized-ninth-stratagem-groups} : Create a new localizedNinthStratagemGroup.
     *
     * @param localizedNinthStratagemGroup the localizedNinthStratagemGroup to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new localizedNinthStratagemGroup, or with status {@code 400 (Bad Request)} if the localizedNinthStratagemGroup has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/localized-ninth-stratagem-groups")
    public ResponseEntity<LocalizedNinthStratagemGroup> createLocalizedNinthStratagemGroup(@Valid @RequestBody LocalizedNinthStratagemGroup localizedNinthStratagemGroup) throws URISyntaxException {
        log.debug("REST request to save LocalizedNinthStratagemGroup : {}", localizedNinthStratagemGroup);
        if (localizedNinthStratagemGroup.getId() != null) {
            throw new BadRequestAlertException("A new localizedNinthStratagemGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LocalizedNinthStratagemGroup result = localizedNinthStratagemGroupRepository.save(localizedNinthStratagemGroup);
        return ResponseEntity.created(new URI("/api/localized-ninth-stratagem-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /localized-ninth-stratagem-groups} : Updates an existing localizedNinthStratagemGroup.
     *
     * @param localizedNinthStratagemGroup the localizedNinthStratagemGroup to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated localizedNinthStratagemGroup,
     * or with status {@code 400 (Bad Request)} if the localizedNinthStratagemGroup is not valid,
     * or with status {@code 500 (Internal Server Error)} if the localizedNinthStratagemGroup couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/localized-ninth-stratagem-groups")
    public ResponseEntity<LocalizedNinthStratagemGroup> updateLocalizedNinthStratagemGroup(@Valid @RequestBody LocalizedNinthStratagemGroup localizedNinthStratagemGroup) throws URISyntaxException {
        log.debug("REST request to update LocalizedNinthStratagemGroup : {}", localizedNinthStratagemGroup);
        if (localizedNinthStratagemGroup.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LocalizedNinthStratagemGroup result = localizedNinthStratagemGroupRepository.save(localizedNinthStratagemGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, localizedNinthStratagemGroup.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /localized-ninth-stratagem-groups} : get all the localizedNinthStratagemGroups.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of localizedNinthStratagemGroups in body.
     */
    @GetMapping("/localized-ninth-stratagem-groups")
    public List<LocalizedNinthStratagemGroup> getAllLocalizedNinthStratagemGroups() {
        log.debug("REST request to get all LocalizedNinthStratagemGroups");
        return localizedNinthStratagemGroupRepository.findAll();
    }

    /**
     * {@code GET  /localized-ninth-stratagem-groups/:id} : get the "id" localizedNinthStratagemGroup.
     *
     * @param id the id of the localizedNinthStratagemGroup to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the localizedNinthStratagemGroup, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/localized-ninth-stratagem-groups/{id}")
    public ResponseEntity<LocalizedNinthStratagemGroup> getLocalizedNinthStratagemGroup(@PathVariable Long id) {
        log.debug("REST request to get LocalizedNinthStratagemGroup : {}", id);
        Optional<LocalizedNinthStratagemGroup> localizedNinthStratagemGroup = localizedNinthStratagemGroupRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(localizedNinthStratagemGroup);
    }

    /**
     * {@code DELETE  /localized-ninth-stratagem-groups/:id} : delete the "id" localizedNinthStratagemGroup.
     *
     * @param id the id of the localizedNinthStratagemGroup to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/localized-ninth-stratagem-groups/{id}")
    public ResponseEntity<Void> deleteLocalizedNinthStratagemGroup(@PathVariable Long id) {
        log.debug("REST request to delete LocalizedNinthStratagemGroup : {}", id);
        localizedNinthStratagemGroupRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
