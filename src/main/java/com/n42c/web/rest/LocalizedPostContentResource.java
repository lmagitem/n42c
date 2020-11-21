package com.n42c.web.rest;

import com.n42c.domain.BlogPost;
import com.n42c.domain.LocalizedPostContent;
import com.n42c.repository.LocalizedPostContentRepository;
import com.n42c.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.n42c.domain.LocalizedPostContent}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LocalizedPostContentResource {

    private final Logger log = LoggerFactory.getLogger(LocalizedPostContentResource.class);

    private static final String ENTITY_NAME = "localizedPostContent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LocalizedPostContentRepository localizedPostContentRepository;

    public LocalizedPostContentResource(LocalizedPostContentRepository localizedPostContentRepository) {
        this.localizedPostContentRepository = localizedPostContentRepository;
    }

    /**
     * {@code POST  /localized-post-contents} : Create a new localizedPostContent.
     *
     * @param localizedPostContent the localizedPostContent to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new localizedPostContent, or with status {@code 400 (Bad Request)} if the localizedPostContent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/localized-post-contents")
    public ResponseEntity<LocalizedPostContent> createLocalizedPostContent(@Valid @RequestBody LocalizedPostContent localizedPostContent) throws URISyntaxException {
        log.debug("REST request to save LocalizedPostContent : {}", localizedPostContent);
        if (localizedPostContent.getId() != null) {
            throw new BadRequestAlertException("A new localizedPostContent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LocalizedPostContent result = localizedPostContentRepository.save(localizedPostContent);
        return ResponseEntity.created(new URI("/api/localized-post-contents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /localized-post-contents} : Updates an existing localizedPostContent.
     *
     * @param localizedPostContent the localizedPostContent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated localizedPostContent,
     * or with status {@code 400 (Bad Request)} if the localizedPostContent is not valid,
     * or with status {@code 500 (Internal Server Error)} if the localizedPostContent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/localized-post-contents")
    public ResponseEntity<LocalizedPostContent> updateLocalizedPostContent(@Valid @RequestBody LocalizedPostContent localizedPostContent) throws URISyntaxException {
        log.debug("REST request to update LocalizedPostContent : {}", localizedPostContent);
        if (localizedPostContent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LocalizedPostContent result = localizedPostContentRepository.save(localizedPostContent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, localizedPostContent.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /localized-post-contents} : get all the localizedPostContents.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of localizedPostContents in body.
     */
    @GetMapping("/localized-post-contents")
    public List<LocalizedPostContent> getAllLocalizedPostContents() {
        log.debug("REST request to get all LocalizedPostContents");
        return localizedPostContentRepository.findAll();
    }

    /**
     * {@code GET  /localized-post-contents/for} : get localizations for the Blog Posts which ids are given in parameter.
     *
     * @param ids the ids of the Blog Posts for which to return localizations.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of localizedPostContents in body.
     */
    @GetMapping("/localized-post-contents/for")
    public List<LocalizedPostContent> getLocalizedPostContentsFor(@RequestParam() List<Long> ids) {
        SecurityContext context = SecurityContextHolder.getContext();
        if (context == null)
            return getAllowedLocalizedPosts(ids, null);

        Authentication authentication = context.getAuthentication();
        if (authentication == null)
            return getAllowedLocalizedPosts(ids, null);

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        if (authorities == null)
            return getAllowedLocalizedPosts(ids, authentication.getPrincipal());

        if (authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            log.debug("REST request to get localizations for given Blog Post ids - as Admin");
            return localizedPostContentRepository.findByBlogPostIds(ids);
        } else {
            return getAllowedLocalizedPosts(ids, authentication.getPrincipal());
        }
    }

    /**
     * Gets all localized post contents belonging to the current user, or anyone that has Writer rights or more.
     */
    private List<LocalizedPostContent> getAllowedLocalizedPosts(List<Long> ids, Object principal) {
        if (principal != null) {
            if (principal instanceof UserDetails) {
                log.debug("REST request to get localizations for given Blog Post ids - as User (with UserDetails)");
                return localizedPostContentRepository.findByBlogPostIdsAndIsCurrentSpringUserOrWriter(ids);
            } else if (principal instanceof DefaultOidcUser) {
                log.debug("REST request to get localizations for given Blog Post ids - as User (with Oidc token)");
                return localizedPostContentRepository.findByBlogPostIdsAndIsCurrentOidcUserOrWriter(ids);
            }
        }
        log.debug("REST request to get localizations for given Blog Post ids - as Anonymous");
        return localizedPostContentRepository.findByBlogPostIdsAndIsWriter(ids);
    }

    /**
     * {@code GET  /localized-post-contents/:id} : get the "id" localizedPostContent.
     *
     * @param id the id of the localizedPostContent to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the localizedPostContent, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/localized-post-contents/{id}")
    public ResponseEntity<LocalizedPostContent> getLocalizedPostContent(@PathVariable Long id) {
        log.debug("REST request to get LocalizedPostContent : {}", id);
        Optional<LocalizedPostContent> localizedPostContent = localizedPostContentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(localizedPostContent);
    }

    /**
     * {@code DELETE  /localized-post-contents/:id} : delete the "id" localizedPostContent.
     *
     * @param id the id of the localizedPostContent to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/localized-post-contents/{id}")
    public ResponseEntity<Void> deleteLocalizedPostContent(@PathVariable Long id) {
        log.debug("REST request to delete LocalizedPostContent : {}", id);
        localizedPostContentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
