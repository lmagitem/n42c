package com.n42c.web.rest;

import com.n42c.domain.LocalizedProduct;
import com.n42c.repository.LocalizedProductRepository;
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
 * REST controller for managing {@link com.n42c.domain.LocalizedProduct}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LocalizedProductResource {

    private final Logger log = LoggerFactory.getLogger(LocalizedProductResource.class);

    private static final String ENTITY_NAME = "localizedProduct";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LocalizedProductRepository localizedProductRepository;

    public LocalizedProductResource(LocalizedProductRepository localizedProductRepository) {
        this.localizedProductRepository = localizedProductRepository;
    }

    /**
     * {@code POST  /localized-products} : Create a new localizedProduct.
     *
     * @param localizedProduct the localizedProduct to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new localizedProduct, or with status {@code 400 (Bad Request)} if the localizedProduct has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/localized-products")
    public ResponseEntity<LocalizedProduct> createLocalizedProduct(@Valid @RequestBody LocalizedProduct localizedProduct) throws URISyntaxException {
        log.debug("REST request to save LocalizedProduct : {}", localizedProduct);
        if (localizedProduct.getId() != null) {
            throw new BadRequestAlertException("A new localizedProduct cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LocalizedProduct result = localizedProductRepository.save(localizedProduct);
        return ResponseEntity.created(new URI("/api/localized-products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /localized-products} : Updates an existing localizedProduct.
     *
     * @param localizedProduct the localizedProduct to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated localizedProduct,
     * or with status {@code 400 (Bad Request)} if the localizedProduct is not valid,
     * or with status {@code 500 (Internal Server Error)} if the localizedProduct couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/localized-products")
    public ResponseEntity<LocalizedProduct> updateLocalizedProduct(@Valid @RequestBody LocalizedProduct localizedProduct) throws URISyntaxException {
        log.debug("REST request to update LocalizedProduct : {}", localizedProduct);
        if (localizedProduct.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LocalizedProduct result = localizedProductRepository.save(localizedProduct);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, localizedProduct.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /localized-products} : get all the localizedProducts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of localizedProducts in body.
     */
    @GetMapping("/localized-products")
    public List<LocalizedProduct> getAllLocalizedProducts() {
        log.debug("REST request to get all LocalizedProducts");
        return localizedProductRepository.findAll();
    }

    /**
     * {@code GET  /localized-products/:id} : get the "id" localizedProduct.
     *
     * @param id the id of the localizedProduct to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the localizedProduct, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/localized-products/{id}")
    public ResponseEntity<LocalizedProduct> getLocalizedProduct(@PathVariable Long id) {
        log.debug("REST request to get LocalizedProduct : {}", id);
        Optional<LocalizedProduct> localizedProduct = localizedProductRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(localizedProduct);
    }

    /**
     * {@code DELETE  /localized-products/:id} : delete the "id" localizedProduct.
     *
     * @param id the id of the localizedProduct to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/localized-products/{id}")
    public ResponseEntity<Void> deleteLocalizedProduct(@PathVariable Long id) {
        log.debug("REST request to delete LocalizedProduct : {}", id);
        localizedProductRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
