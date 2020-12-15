package com.n42c.web.rest;

import com.n42c.domain.ProfilePartPreciseItem;
import com.n42c.repository.ProfilePartPreciseItemRepository;
import com.n42c.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.n42c.domain.ProfilePartPreciseItem}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProfilePartPreciseItemResource {

    private static final String ENTITY_NAME = "profilePartPreciseItem";
    private final Logger log = LoggerFactory.getLogger(ProfilePartPreciseItemResource.class);
    private final ProfilePartPreciseItemRepository profilePartPreciseItemRepository;
    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public ProfilePartPreciseItemResource(ProfilePartPreciseItemRepository profilePartPreciseItemRepository) {
        this.profilePartPreciseItemRepository = profilePartPreciseItemRepository;
    }

    /**
     * {@code POST  /profile-part-precise-items} : Create a new profilePartPreciseItem.
     *
     * @param profilePartPreciseItem the profilePartPreciseItem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new profilePartPreciseItem, or with status {@code 400 (Bad Request)} if the profilePartPreciseItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/profile-part-precise-items")
    public ResponseEntity<ProfilePartPreciseItem> createProfilePartPreciseItem(@Valid @RequestBody ProfilePartPreciseItem profilePartPreciseItem) throws URISyntaxException {
        log.debug("REST request to save ProfilePartPreciseItem : {}", profilePartPreciseItem);
        if (profilePartPreciseItem.getId() != null) {
            throw new BadRequestAlertException("A new profilePartPreciseItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProfilePartPreciseItem result = profilePartPreciseItemRepository.save(profilePartPreciseItem);
        return ResponseEntity.created(new URI("/api/profile-part-precise-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /profile-part-precise-items} : Updates an existing profilePartPreciseItem.
     *
     * @param profilePartPreciseItem the profilePartPreciseItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated profilePartPreciseItem,
     * or with status {@code 400 (Bad Request)} if the profilePartPreciseItem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the profilePartPreciseItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/profile-part-precise-items")
    public ResponseEntity<ProfilePartPreciseItem> updateProfilePartPreciseItem(@Valid @RequestBody ProfilePartPreciseItem profilePartPreciseItem) throws URISyntaxException {
        log.debug("REST request to update ProfilePartPreciseItem : {}", profilePartPreciseItem);
        if (profilePartPreciseItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProfilePartPreciseItem result = profilePartPreciseItemRepository.save(profilePartPreciseItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, profilePartPreciseItem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /profile-part-precise-items} : get all the profilePartPreciseItems.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of profilePartPreciseItems in body.
     */
    @GetMapping("/profile-part-precise-items")
    public ResponseEntity<List<ProfilePartPreciseItem>> getAllProfilePartPreciseItems(Pageable pageable) {
        log.debug("REST request to get a page of ProfilePartPreciseItems");
        Page<ProfilePartPreciseItem> page = profilePartPreciseItemRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /profile-part-precise-items/:id} : get the "id" profilePartPreciseItem.
     *
     * @param id the id of the profilePartPreciseItem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the profilePartPreciseItem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/profile-part-precise-items/{id}")
    public ResponseEntity<ProfilePartPreciseItem> getProfilePartPreciseItem(@PathVariable Long id) {
        log.debug("REST request to get ProfilePartPreciseItem : {}", id);
        Optional<ProfilePartPreciseItem> profilePartPreciseItem = profilePartPreciseItemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(profilePartPreciseItem);
    }

    /**
     * {@code DELETE  /profile-part-precise-items/:id} : delete the "id" profilePartPreciseItem.
     *
     * @param id the id of the profilePartPreciseItem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/profile-part-precise-items/{id}")
    public ResponseEntity<Void> deleteProfilePartPreciseItem(@PathVariable Long id) {
        log.debug("REST request to delete ProfilePartPreciseItem : {}", id);
        profilePartPreciseItemRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
