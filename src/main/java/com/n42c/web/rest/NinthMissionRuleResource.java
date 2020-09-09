package com.n42c.web.rest;

import com.n42c.domain.NinthMissionRule;
import com.n42c.repository.NinthMissionRuleRepository;
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
 * REST controller for managing {@link com.n42c.domain.NinthMissionRule}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NinthMissionRuleResource {

    private final Logger log = LoggerFactory.getLogger(NinthMissionRuleResource.class);

    private static final String ENTITY_NAME = "ninthMissionRule";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NinthMissionRuleRepository ninthMissionRuleRepository;

    public NinthMissionRuleResource(NinthMissionRuleRepository ninthMissionRuleRepository) {
        this.ninthMissionRuleRepository = ninthMissionRuleRepository;
    }

    /**
     * {@code POST  /ninth-mission-rules} : Create a new ninthMissionRule.
     *
     * @param ninthMissionRule the ninthMissionRule to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ninthMissionRule, or with status {@code 400 (Bad Request)} if the ninthMissionRule has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ninth-mission-rules")
    public ResponseEntity<NinthMissionRule> createNinthMissionRule(@RequestBody NinthMissionRule ninthMissionRule) throws URISyntaxException {
        log.debug("REST request to save NinthMissionRule : {}", ninthMissionRule);
        if (ninthMissionRule.getId() != null) {
            throw new BadRequestAlertException("A new ninthMissionRule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NinthMissionRule result = ninthMissionRuleRepository.save(ninthMissionRule);
        return ResponseEntity.created(new URI("/api/ninth-mission-rules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ninth-mission-rules} : Updates an existing ninthMissionRule.
     *
     * @param ninthMissionRule the ninthMissionRule to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ninthMissionRule,
     * or with status {@code 400 (Bad Request)} if the ninthMissionRule is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ninthMissionRule couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ninth-mission-rules")
    public ResponseEntity<NinthMissionRule> updateNinthMissionRule(@RequestBody NinthMissionRule ninthMissionRule) throws URISyntaxException {
        log.debug("REST request to update NinthMissionRule : {}", ninthMissionRule);
        if (ninthMissionRule.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NinthMissionRule result = ninthMissionRuleRepository.save(ninthMissionRule);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ninthMissionRule.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ninth-mission-rules} : get all the ninthMissionRules.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ninthMissionRules in body.
     */
    @GetMapping("/ninth-mission-rules")
    public List<NinthMissionRule> getAllNinthMissionRules() {
        log.debug("REST request to get all NinthMissionRules");
        return ninthMissionRuleRepository.findAll();
    }

    /**
     * {@code GET  /ninth-mission-rules/:id} : get the "id" ninthMissionRule.
     *
     * @param id the id of the ninthMissionRule to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ninthMissionRule, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ninth-mission-rules/{id}")
    public ResponseEntity<NinthMissionRule> getNinthMissionRule(@PathVariable Long id) {
        log.debug("REST request to get NinthMissionRule : {}", id);
        Optional<NinthMissionRule> ninthMissionRule = ninthMissionRuleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ninthMissionRule);
    }

    /**
     * {@code DELETE  /ninth-mission-rules/:id} : delete the "id" ninthMissionRule.
     *
     * @param id the id of the ninthMissionRule to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ninth-mission-rules/{id}")
    public ResponseEntity<Void> deleteNinthMissionRule(@PathVariable Long id) {
        log.debug("REST request to delete NinthMissionRule : {}", id);
        ninthMissionRuleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
