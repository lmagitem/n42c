package com.n42c.web.rest;

import com.n42c.domain.LocalizedNinthMissionRule;
import com.n42c.repository.LocalizedNinthMissionRuleRepository;
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
 * REST controller for managing {@link com.n42c.domain.LocalizedNinthMissionRule}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LocalizedNinthMissionRuleResource {

    private static final String ENTITY_NAME = "localizedNinthMissionRule";
    private final Logger log = LoggerFactory.getLogger(LocalizedNinthMissionRuleResource.class);
    private final LocalizedNinthMissionRuleRepository localizedNinthMissionRuleRepository;
    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public LocalizedNinthMissionRuleResource(LocalizedNinthMissionRuleRepository localizedNinthMissionRuleRepository) {
        this.localizedNinthMissionRuleRepository = localizedNinthMissionRuleRepository;
    }

    /**
     * {@code POST  /localized-ninth-mission-rules} : Create a new localizedNinthMissionRule.
     *
     * @param localizedNinthMissionRule the localizedNinthMissionRule to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new localizedNinthMissionRule, or with status {@code 400 (Bad Request)} if the localizedNinthMissionRule has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/localized-ninth-mission-rules")
    public ResponseEntity<LocalizedNinthMissionRule> createLocalizedNinthMissionRule(@Valid @RequestBody LocalizedNinthMissionRule localizedNinthMissionRule) throws URISyntaxException {
        log.debug("REST request to save LocalizedNinthMissionRule : {}", localizedNinthMissionRule);
        if (localizedNinthMissionRule.getId() != null) {
            throw new BadRequestAlertException("A new localizedNinthMissionRule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LocalizedNinthMissionRule result = localizedNinthMissionRuleRepository.save(localizedNinthMissionRule);
        return ResponseEntity.created(new URI("/api/localized-ninth-mission-rules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /localized-ninth-mission-rules} : Updates an existing localizedNinthMissionRule.
     *
     * @param localizedNinthMissionRule the localizedNinthMissionRule to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated localizedNinthMissionRule,
     * or with status {@code 400 (Bad Request)} if the localizedNinthMissionRule is not valid,
     * or with status {@code 500 (Internal Server Error)} if the localizedNinthMissionRule couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/localized-ninth-mission-rules")
    public ResponseEntity<LocalizedNinthMissionRule> updateLocalizedNinthMissionRule(@Valid @RequestBody LocalizedNinthMissionRule localizedNinthMissionRule) throws URISyntaxException {
        log.debug("REST request to update LocalizedNinthMissionRule : {}", localizedNinthMissionRule);
        if (localizedNinthMissionRule.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LocalizedNinthMissionRule result = localizedNinthMissionRuleRepository.save(localizedNinthMissionRule);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, localizedNinthMissionRule.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /localized-ninth-mission-rules} : get all the localizedNinthMissionRules.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of localizedNinthMissionRules in body.
     */
    @GetMapping("/localized-ninth-mission-rules")
    public List<LocalizedNinthMissionRule> getAllLocalizedNinthMissionRules() {
        log.debug("REST request to get all LocalizedNinthMissionRules");
        return localizedNinthMissionRuleRepository.findAll();
    }

    /**
     * {@code GET  /localized-ninth-mission-rules/:id} : get the "id" localizedNinthMissionRule.
     *
     * @param id the id of the localizedNinthMissionRule to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the localizedNinthMissionRule, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/localized-ninth-mission-rules/{id}")
    public ResponseEntity<LocalizedNinthMissionRule> getLocalizedNinthMissionRule(@PathVariable Long id) {
        log.debug("REST request to get LocalizedNinthMissionRule : {}", id);
        Optional<LocalizedNinthMissionRule> localizedNinthMissionRule = localizedNinthMissionRuleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(localizedNinthMissionRule);
    }

    /**
     * {@code DELETE  /localized-ninth-mission-rules/:id} : delete the "id" localizedNinthMissionRule.
     *
     * @param id the id of the localizedNinthMissionRule to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/localized-ninth-mission-rules/{id}")
    public ResponseEntity<Void> deleteLocalizedNinthMissionRule(@PathVariable Long id) {
        log.debug("REST request to delete LocalizedNinthMissionRule : {}", id);
        localizedNinthMissionRuleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
