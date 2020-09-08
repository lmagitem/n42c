package com.n42c.web.rest;

import com.n42c.domain.NinthCampaignMoment;
import com.n42c.repository.NinthCampaignMomentRepository;
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
 * REST controller for managing {@link com.n42c.domain.NinthCampaignMoment}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NinthCampaignMomentResource {

    private final Logger log = LoggerFactory.getLogger(NinthCampaignMomentResource.class);

    private static final String ENTITY_NAME = "ninthCampaignMoment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NinthCampaignMomentRepository ninthCampaignMomentRepository;

    public NinthCampaignMomentResource(NinthCampaignMomentRepository ninthCampaignMomentRepository) {
        this.ninthCampaignMomentRepository = ninthCampaignMomentRepository;
    }

    /**
     * {@code POST  /ninth-campaign-moments} : Create a new ninthCampaignMoment.
     *
     * @param ninthCampaignMoment the ninthCampaignMoment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ninthCampaignMoment, or with status {@code 400 (Bad Request)} if the ninthCampaignMoment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ninth-campaign-moments")
    public ResponseEntity<NinthCampaignMoment> createNinthCampaignMoment(@Valid @RequestBody NinthCampaignMoment ninthCampaignMoment) throws URISyntaxException {
        log.debug("REST request to save NinthCampaignMoment : {}", ninthCampaignMoment);
        if (ninthCampaignMoment.getId() != null) {
            throw new BadRequestAlertException("A new ninthCampaignMoment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NinthCampaignMoment result = ninthCampaignMomentRepository.save(ninthCampaignMoment);
        return ResponseEntity.created(new URI("/api/ninth-campaign-moments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ninth-campaign-moments} : Updates an existing ninthCampaignMoment.
     *
     * @param ninthCampaignMoment the ninthCampaignMoment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ninthCampaignMoment,
     * or with status {@code 400 (Bad Request)} if the ninthCampaignMoment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ninthCampaignMoment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ninth-campaign-moments")
    public ResponseEntity<NinthCampaignMoment> updateNinthCampaignMoment(@Valid @RequestBody NinthCampaignMoment ninthCampaignMoment) throws URISyntaxException {
        log.debug("REST request to update NinthCampaignMoment : {}", ninthCampaignMoment);
        if (ninthCampaignMoment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NinthCampaignMoment result = ninthCampaignMomentRepository.save(ninthCampaignMoment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ninthCampaignMoment.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ninth-campaign-moments} : get all the ninthCampaignMoments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ninthCampaignMoments in body.
     */
    @GetMapping("/ninth-campaign-moments")
    public List<NinthCampaignMoment> getAllNinthCampaignMoments() {
        log.debug("REST request to get all NinthCampaignMoments");
        return ninthCampaignMomentRepository.findAll();
    }

    /**
     * {@code GET  /ninth-campaign-moments/:id} : get the "id" ninthCampaignMoment.
     *
     * @param id the id of the ninthCampaignMoment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ninthCampaignMoment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ninth-campaign-moments/{id}")
    public ResponseEntity<NinthCampaignMoment> getNinthCampaignMoment(@PathVariable Long id) {
        log.debug("REST request to get NinthCampaignMoment : {}", id);
        Optional<NinthCampaignMoment> ninthCampaignMoment = ninthCampaignMomentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ninthCampaignMoment);
    }

    /**
     * {@code DELETE  /ninth-campaign-moments/:id} : delete the "id" ninthCampaignMoment.
     *
     * @param id the id of the ninthCampaignMoment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ninth-campaign-moments/{id}")
    public ResponseEntity<Void> deleteNinthCampaignMoment(@PathVariable Long id) {
        log.debug("REST request to delete NinthCampaignMoment : {}", id);
        ninthCampaignMomentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
