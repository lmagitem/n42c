package com.n42c.web.rest;

import com.n42c.domain.LocalizedNinthStratagem;
import com.n42c.repository.LocalizedNinthStratagemRepository;
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
 * REST controller for managing {@link com.n42c.domain.LocalizedNinthStratagem}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LocalizedNinthStratagemResource {

    private static final String ENTITY_NAME = "localizedNinthStratagem";
    private final Logger log = LoggerFactory.getLogger(LocalizedNinthStratagemResource.class);
    private final LocalizedNinthStratagemRepository localizedNinthStratagemRepository;
    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public LocalizedNinthStratagemResource(LocalizedNinthStratagemRepository localizedNinthStratagemRepository) {
        this.localizedNinthStratagemRepository = localizedNinthStratagemRepository;
    }

    /**
     * {@code POST  /localized-ninth-stratagems} : Create a new localizedNinthStratagem.
     *
     * @param localizedNinthStratagem the localizedNinthStratagem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new localizedNinthStratagem, or with status {@code 400 (Bad Request)} if the localizedNinthStratagem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/localized-ninth-stratagems")
    public ResponseEntity<LocalizedNinthStratagem> createLocalizedNinthStratagem(@Valid @RequestBody LocalizedNinthStratagem localizedNinthStratagem) throws URISyntaxException {
        log.debug("REST request to save LocalizedNinthStratagem : {}", localizedNinthStratagem);
        if (localizedNinthStratagem.getId() != null) {
            throw new BadRequestAlertException("A new localizedNinthStratagem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LocalizedNinthStratagem result = localizedNinthStratagemRepository.save(localizedNinthStratagem);
        return ResponseEntity.created(new URI("/api/localized-ninth-stratagems/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /localized-ninth-stratagems} : Updates an existing localizedNinthStratagem.
     *
     * @param localizedNinthStratagem the localizedNinthStratagem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated localizedNinthStratagem,
     * or with status {@code 400 (Bad Request)} if the localizedNinthStratagem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the localizedNinthStratagem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/localized-ninth-stratagems")
    public ResponseEntity<LocalizedNinthStratagem> updateLocalizedNinthStratagem(@Valid @RequestBody LocalizedNinthStratagem localizedNinthStratagem) throws URISyntaxException {
        log.debug("REST request to update LocalizedNinthStratagem : {}", localizedNinthStratagem);
        if (localizedNinthStratagem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LocalizedNinthStratagem result = localizedNinthStratagemRepository.save(localizedNinthStratagem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, localizedNinthStratagem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /localized-ninth-stratagems} : get all the localizedNinthStratagems.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of localizedNinthStratagems in body.
     */
    @GetMapping("/localized-ninth-stratagems")
    public List<LocalizedNinthStratagem> getAllLocalizedNinthStratagems() {
        log.debug("REST request to get all LocalizedNinthStratagems");
        return localizedNinthStratagemRepository.findAll();
    }

    /**
     * {@code GET  /localized-ninth-stratagems/:id} : get the "id" localizedNinthStratagem.
     *
     * @param id the id of the localizedNinthStratagem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the localizedNinthStratagem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/localized-ninth-stratagems/{id}")
    public ResponseEntity<LocalizedNinthStratagem> getLocalizedNinthStratagem(@PathVariable Long id) {
        log.debug("REST request to get LocalizedNinthStratagem : {}", id);
        Optional<LocalizedNinthStratagem> localizedNinthStratagem = localizedNinthStratagemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(localizedNinthStratagem);
    }

    /**
     * {@code DELETE  /localized-ninth-stratagems/:id} : delete the "id" localizedNinthStratagem.
     *
     * @param id the id of the localizedNinthStratagem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/localized-ninth-stratagems/{id}")
    public ResponseEntity<Void> deleteLocalizedNinthStratagem(@PathVariable Long id) {
        log.debug("REST request to delete LocalizedNinthStratagem : {}", id);
        localizedNinthStratagemRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
