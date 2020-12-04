package com.n42c.web.rest;

import com.n42c.domain.ProfilePartSkill;
import com.n42c.repository.ProfilePartSkillRepository;
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
 * REST controller for managing {@link com.n42c.domain.ProfilePartSkill}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProfilePartSkillResource {

    private static final String ENTITY_NAME = "profilePartSkill";
    private final Logger log = LoggerFactory.getLogger(ProfilePartSkillResource.class);
    private final ProfilePartSkillRepository profilePartSkillRepository;
    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public ProfilePartSkillResource(ProfilePartSkillRepository profilePartSkillRepository) {
        this.profilePartSkillRepository = profilePartSkillRepository;
    }

    /**
     * {@code POST  /profile-part-skills} : Create a new profilePartSkill.
     *
     * @param profilePartSkill the profilePartSkill to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new profilePartSkill, or with status {@code 400 (Bad Request)} if the profilePartSkill has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/profile-part-skills")
    public ResponseEntity<ProfilePartSkill> createProfilePartSkill(@Valid @RequestBody ProfilePartSkill profilePartSkill) throws URISyntaxException {
        log.debug("REST request to save ProfilePartSkill : {}", profilePartSkill);
        if (profilePartSkill.getId() != null) {
            throw new BadRequestAlertException("A new profilePartSkill cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProfilePartSkill result = profilePartSkillRepository.save(profilePartSkill);
        return ResponseEntity.created(new URI("/api/profile-part-skills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /profile-part-skills} : Updates an existing profilePartSkill.
     *
     * @param profilePartSkill the profilePartSkill to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated profilePartSkill,
     * or with status {@code 400 (Bad Request)} if the profilePartSkill is not valid,
     * or with status {@code 500 (Internal Server Error)} if the profilePartSkill couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/profile-part-skills")
    public ResponseEntity<ProfilePartSkill> updateProfilePartSkill(@Valid @RequestBody ProfilePartSkill profilePartSkill) throws URISyntaxException {
        log.debug("REST request to update ProfilePartSkill : {}", profilePartSkill);
        if (profilePartSkill.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProfilePartSkill result = profilePartSkillRepository.save(profilePartSkill);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, profilePartSkill.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /profile-part-skills} : get all the profilePartSkills.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of profilePartSkills in body.
     */
    @GetMapping("/profile-part-skills")
    public List<ProfilePartSkill> getAllProfilePartSkills(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all ProfilePartSkills");
        return profilePartSkillRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /profile-part-skills/:id} : get the "id" profilePartSkill.
     *
     * @param id the id of the profilePartSkill to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the profilePartSkill, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/profile-part-skills/{id}")
    public ResponseEntity<ProfilePartSkill> getProfilePartSkill(@PathVariable Long id) {
        log.debug("REST request to get ProfilePartSkill : {}", id);
        Optional<ProfilePartSkill> profilePartSkill = profilePartSkillRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(profilePartSkill);
    }

    /**
     * {@code DELETE  /profile-part-skills/:id} : delete the "id" profilePartSkill.
     *
     * @param id the id of the profilePartSkill to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/profile-part-skills/{id}")
    public ResponseEntity<Void> deleteProfilePartSkill(@PathVariable Long id) {
        log.debug("REST request to delete ProfilePartSkill : {}", id);
        profilePartSkillRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
