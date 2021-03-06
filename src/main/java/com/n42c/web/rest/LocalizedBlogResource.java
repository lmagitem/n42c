package com.n42c.web.rest;

import com.n42c.domain.LocalizedBlog;
import com.n42c.repository.LocalizedBlogRepository;
import com.n42c.web.rest.errors.BadRequestAlertException;
import com.n42c.web.rest.utils.RestServiceUtils;
import com.nimbusds.oauth2.sdk.util.CollectionUtils;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.n42c.domain.LocalizedBlog}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LocalizedBlogResource {
    private static final String ENTITY_NAME = "localizedBlog";
    private final Logger log = LoggerFactory.getLogger(LocalizedBlogResource.class);
    private final LocalizedBlogRepository localizedBlogRepository;
    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public LocalizedBlogResource(LocalizedBlogRepository localizedBlogRepository) {
        this.localizedBlogRepository = localizedBlogRepository;
    }

    /**
     * {@code POST  /localized-blogs} : Create a new localizedBlog.
     *
     * @param localizedBlog the localizedBlog to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new localizedBlog, or with status {@code 400 (Bad Request)} if the
     * localizedBlog has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/localized-blogs")
    public ResponseEntity<LocalizedBlog> createLocalizedBlog(@Valid @RequestBody LocalizedBlog localizedBlog) throws URISyntaxException {
        log.debug("REST request to save LocalizedBlog : {}", localizedBlog);
        if (localizedBlog.getId() != null) {
            throw new BadRequestAlertException("A new localizedBlog cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LocalizedBlog result = localizedBlogRepository.save(localizedBlog);
        return ResponseEntity
                .created(new URI("/api/localized-blogs/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /localized-blogs} : Updates an existing localizedBlog.
     *
     * @param localizedBlog the localizedBlog to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated localizedBlog, or with status {@code 400 (Bad Request)} if the
     * localizedBlog is not valid, or with status {@code 500 (Internal Server Error)} if the localizedBlog couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/localized-blogs")
    public ResponseEntity<LocalizedBlog> updateLocalizedBlog(@Valid @RequestBody LocalizedBlog localizedBlog) throws URISyntaxException {
        log.debug("REST request to update LocalizedBlog : {}", localizedBlog);
        if (localizedBlog.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LocalizedBlog result = localizedBlogRepository.save(localizedBlog);
        return ResponseEntity
                .ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, localizedBlog.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /localized-blogs} : get all the localizedBlogs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of localizedBlogs in body.
     */
    @GetMapping("/localized-blogs")
    public List<LocalizedBlog> getAllLocalizedBlogs() {
        log.debug("REST request to get all LocalizedBlogs");
        return (localizedBlogRepository.findAll());
    }

    /**
     * {@code GET  /localized-blogs/for} : get localizations for the Blogs which ids are given in parameter.
     *
     * @param ids the ids of the Blogs for which to return localizations.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of localizedBlogPosts in body.
     */
    @GetMapping("/localized-blogs/for")
    public List<LocalizedBlog> getLocalizedBlogPostsFor(@RequestParam List<Long> ids) {
        Authentication authentication = RestServiceUtils.getAuthentication(SecurityContextHolder.getContext());
        Collection<? extends GrantedAuthority> authorities = RestServiceUtils.getAuthorities(authentication);

        if (authentication == null) {
            return (getAllowedLocalizedPosts(ids, null));
        } else if (authorities == null) {
            return (getAllowedLocalizedPosts(ids, authentication.getPrincipal()));
        } else if (authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN")) && CollectionUtils.isNotEmpty(ids)) {
            log.debug("REST request to get localizations for given Blog ids - as Admin");
            return (localizedBlogRepository.findByBlogIds(ids));
        } else {
            return (getAllowedLocalizedPosts(ids, authentication.getPrincipal()));
        }
    }

    /**
     * {@code GET  /localized-blogs/:id} : get the "id" localizedBlog.
     *
     * @param id the id of the localizedBlog to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the localizedBlog, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/localized-blogs/{id}")
    public ResponseEntity<LocalizedBlog> getLocalizedBlog(@PathVariable Long id) {
        log.debug("REST request to get LocalizedBlog : {}", id);
        Optional<LocalizedBlog> localizedBlog = localizedBlogRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(localizedBlog);
    }

    /**
     * {@code DELETE  /localized-blogs/:id} : delete the "id" localizedBlog.
     *
     * @param id the id of the localizedBlog to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/localized-blogs/{id}")
    public ResponseEntity<Void> deleteLocalizedBlog(@PathVariable Long id) {
        log.debug("REST request to delete LocalizedBlog : {}", id);
        localizedBlogRepository.deleteById(id);
        return ResponseEntity
                .noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
    }

    /**
     * Gets all localized blogs belonging to the current user, or anyone that has Writer rights or more.
     */
    private List<LocalizedBlog> getAllowedLocalizedPosts(List<Long> ids, Object principal) {
        if (CollectionUtils.isEmpty(ids)) {
            return new LinkedList<>();
        } else if (principal != null) {
            if (principal instanceof UserDetails) {
                log.debug("REST request to get localizations for given Blog ids - as User (with UserDetails)");
                return localizedBlogRepository.findByBlogIdsAndIsCurrentSpringUserOrWriter(ids);
            } else if (principal instanceof DefaultOidcUser) {
                log.debug("REST request to get localizations for given Blog ids - as User (with Oidc token)");
                return localizedBlogRepository.findByBlogIdsAndIsCurrentOidcUserOrWriter(ids);
            }
        }
        log.debug("REST request to get localizations for given Blog ids - as Anonymous");
        return localizedBlogRepository.findByBlogIdsAndIsWriter(ids);
    }
}
