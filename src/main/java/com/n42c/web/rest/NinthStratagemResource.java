package com.n42c.web.rest;

import com.n42c.domain.NinthStratagem;
import com.n42c.repository.NinthStratagemRepository;
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
 * REST controller for managing {@link com.n42c.domain.NinthStratagem}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NinthStratagemResource {

    private final Logger log = LoggerFactory.getLogger(NinthStratagemResource.class);

    private static final String ENTITY_NAME = "ninthStratagem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NinthStratagemRepository ninthStratagemRepository;

    public NinthStratagemResource(NinthStratagemRepository ninthStratagemRepository) {
        this.ninthStratagemRepository = ninthStratagemRepository;
    }

    /**
     * {@code POST  /ninth-stratagems} : Create a new ninthStratagem.
     *
     * @param ninthStratagem the ninthStratagem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ninthStratagem, or with status {@code 400 (Bad Request)} if the ninthStratagem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ninth-stratagems")
    public ResponseEntity<NinthStratagem> createNinthStratagem(@RequestBody NinthStratagem ninthStratagem) throws URISyntaxException {
        log.debug("REST request to save NinthStratagem : {}", ninthStratagem);
        if (ninthStratagem.getId() != null) {
            throw new BadRequestAlertException("A new ninthStratagem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NinthStratagem result = ninthStratagemRepository.save(ninthStratagem);
        return ResponseEntity.created(new URI("/api/ninth-stratagems/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ninth-stratagems} : Updates an existing ninthStratagem.
     *
     * @param ninthStratagem the ninthStratagem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ninthStratagem,
     * or with status {@code 400 (Bad Request)} if the ninthStratagem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ninthStratagem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ninth-stratagems")
    public ResponseEntity<NinthStratagem> updateNinthStratagem(@RequestBody NinthStratagem ninthStratagem) throws URISyntaxException {
        log.debug("REST request to update NinthStratagem : {}", ninthStratagem);
        if (ninthStratagem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NinthStratagem result = ninthStratagemRepository.save(ninthStratagem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ninthStratagem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ninth-stratagems} : get all the ninthStratagems.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ninthStratagems in body.
     */
    @GetMapping("/ninth-stratagems")
    public List<NinthStratagem> getAllNinthStratagems() {
        log.debug("REST request to get all NinthStratagems");
        return ninthStratagemRepository.findAll();
    }

    /**
     * {@code GET  /ninth-stratagems/:id} : get the "id" ninthStratagem.
     *
     * @param id the id of the ninthStratagem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ninthStratagem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ninth-stratagems/{id}")
    public ResponseEntity<NinthStratagem> getNinthStratagem(@PathVariable Long id) {
        log.debug("REST request to get NinthStratagem : {}", id);
        Optional<NinthStratagem> ninthStratagem = ninthStratagemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ninthStratagem);
    }

    /**
     * {@code DELETE  /ninth-stratagems/:id} : delete the "id" ninthStratagem.
     *
     * @param id the id of the ninthStratagem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ninth-stratagems/{id}")
    public ResponseEntity<Void> deleteNinthStratagem(@PathVariable Long id) {
        log.debug("REST request to delete NinthStratagem : {}", id);
        ninthStratagemRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
