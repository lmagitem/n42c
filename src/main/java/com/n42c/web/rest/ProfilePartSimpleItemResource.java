package com.n42c.web.rest;

import com.n42c.domain.ProfilePartSimpleItem;
import com.n42c.repository.ProfilePartSimpleItemRepository;
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
 * REST controller for managing {@link com.n42c.domain.ProfilePartSimpleItem}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProfilePartSimpleItemResource {

    private static final String ENTITY_NAME = "profilePartSimpleItem";
    private final Logger log = LoggerFactory.getLogger(ProfilePartSimpleItemResource.class);
    private final ProfilePartSimpleItemRepository profilePartSimpleItemRepository;
    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public ProfilePartSimpleItemResource(ProfilePartSimpleItemRepository profilePartSimpleItemRepository) {
        this.profilePartSimpleItemRepository = profilePartSimpleItemRepository;
    }

    /**
     * {@code POST  /profile-part-simple-items} : Create a new profilePartSimpleItem.
     *
     * @param profilePartSimpleItem the profilePartSimpleItem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new profilePartSimpleItem, or with status {@code 400 (Bad Request)} if the profilePartSimpleItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/profile-part-simple-items")
    public ResponseEntity<ProfilePartSimpleItem> createProfilePartSimpleItem(@Valid @RequestBody ProfilePartSimpleItem profilePartSimpleItem) throws URISyntaxException {
        log.debug("REST request to save ProfilePartSimpleItem : {}", profilePartSimpleItem);
        if (profilePartSimpleItem.getId() != null) {
            throw new BadRequestAlertException("A new profilePartSimpleItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProfilePartSimpleItem result = profilePartSimpleItemRepository.save(profilePartSimpleItem);
        return ResponseEntity.created(new URI("/api/profile-part-simple-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /profile-part-simple-items} : Updates an existing profilePartSimpleItem.
     *
     * @param profilePartSimpleItem the profilePartSimpleItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated profilePartSimpleItem,
     * or with status {@code 400 (Bad Request)} if the profilePartSimpleItem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the profilePartSimpleItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/profile-part-simple-items")
    public ResponseEntity<ProfilePartSimpleItem> updateProfilePartSimpleItem(@Valid @RequestBody ProfilePartSimpleItem profilePartSimpleItem) throws URISyntaxException {
        log.debug("REST request to update ProfilePartSimpleItem : {}", profilePartSimpleItem);
        if (profilePartSimpleItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProfilePartSimpleItem result = profilePartSimpleItemRepository.save(profilePartSimpleItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, profilePartSimpleItem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /profile-part-simple-items} : get all the profilePartSimpleItems.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of profilePartSimpleItems in body.
     */
    @GetMapping("/profile-part-simple-items")
    public ResponseEntity<List<ProfilePartSimpleItem>> getAllProfilePartSimpleItems(Pageable pageable) {
        log.debug("REST request to get a page of ProfilePartSimpleItems");
        Page<ProfilePartSimpleItem> page = profilePartSimpleItemRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /profile-part-simple-items/:id} : get the "id" profilePartSimpleItem.
     *
     * @param id the id of the profilePartSimpleItem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the profilePartSimpleItem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/profile-part-simple-items/{id}")
    public ResponseEntity<ProfilePartSimpleItem> getProfilePartSimpleItem(@PathVariable Long id) {
        log.debug("REST request to get ProfilePartSimpleItem : {}", id);
        Optional<ProfilePartSimpleItem> profilePartSimpleItem = profilePartSimpleItemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(profilePartSimpleItem);
    }

    /**
     * {@code DELETE  /profile-part-simple-items/:id} : delete the "id" profilePartSimpleItem.
     *
     * @param id the id of the profilePartSimpleItem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/profile-part-simple-items/{id}")
    public ResponseEntity<Void> deleteProfilePartSimpleItem(@PathVariable Long id) {
        log.debug("REST request to delete ProfilePartSimpleItem : {}", id);
        profilePartSimpleItemRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
