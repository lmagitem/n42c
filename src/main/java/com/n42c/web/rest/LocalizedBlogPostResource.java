package com.n42c.web.rest;

import com.n42c.domain.LocalizedBlogPost;
import com.n42c.repository.LocalizedBlogPostRepository;
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
 * REST controller for managing {@link LocalizedBlogPost}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LocalizedBlogPostResource {
    private static final String ENTITY_NAME = "localizedBlogPost";
    private final Logger log = LoggerFactory.getLogger(LocalizedBlogPostResource.class);
    private final LocalizedBlogPostRepository localizedBlogPostRepository;
    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public LocalizedBlogPostResource(LocalizedBlogPostRepository localizedBlogPostRepository) {
        this.localizedBlogPostRepository = localizedBlogPostRepository;
    }

    /**
     * {@code POST  /localized-blog-posts} : Create a new localizedBlogPost.
     *
     * @param localizedBlogPost the localizedBlogPost to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new localizedBlogPost, or with status {@code 400 (Bad Request)} if
     * the localizedBlogPost has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/localized-blog-posts")
    public ResponseEntity<LocalizedBlogPost> createLocalizedBlogPost(@Valid @RequestBody LocalizedBlogPost localizedBlogPost)
            throws URISyntaxException {
        log.debug("REST request to save LocalizedBlogPost : {}", localizedBlogPost);
        if (localizedBlogPost.getId() != null) {
            throw new BadRequestAlertException("A new localizedBlogPost cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LocalizedBlogPost result = localizedBlogPostRepository.save(localizedBlogPost);
        return ResponseEntity
                .created(new URI("/api/localized-blog-posts/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /localized-blog-posts} : Updates an existing localizedBlogPost.
     *
     * @param localizedBlogPost the localizedBlogPost to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated localizedBlogPost, or with status {@code 400 (Bad Request)} if
     * the localizedBlogPost is not valid, or with status {@code 500 (Internal Server Error)} if the localizedBlogPost couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/localized-blog-posts")
    public ResponseEntity<LocalizedBlogPost> updateLocalizedBlogPost(@Valid @RequestBody LocalizedBlogPost localizedBlogPost)
            throws URISyntaxException {
        log.debug("REST request to update LocalizedBlogPost : {}", localizedBlogPost);
        if (localizedBlogPost.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LocalizedBlogPost result = localizedBlogPostRepository.save(localizedBlogPost);
        return ResponseEntity
                .ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, localizedBlogPost.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /localized-blog-posts} : get all the localizedBlogPosts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of localizedBlogPosts in body.
     */
    @GetMapping("/localized-blog-posts")
    public List<LocalizedBlogPost> getAllLocalizedBlogPosts() {
        log.debug("REST request to get all LocalizedBlogPosts");
        return (localizedBlogPostRepository.findAll());
    }

    /**
     * {@code GET  /localized-blog-posts/for} : get localizations for the Blog Posts which ids are given in parameter.
     *
     * @param ids the ids of the Blog Posts for which to return localizations.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of localizedBlogPosts in body.
     */
    @GetMapping("/localized-blog-posts/for")
    public List<LocalizedBlogPost> getLocalizedBlogPostsFor(@RequestParam List<Long> ids) {
        Authentication authentication = RestServiceUtils.getAuthentication(SecurityContextHolder.getContext());
        Collection<? extends GrantedAuthority> authorities = RestServiceUtils.getAuthorities(authentication);

        if (authentication == null) {
            return (getAllowedLocalizedPosts(ids, null));
        } else if (authorities == null) {
            return (getAllowedLocalizedPosts(ids, authentication.getPrincipal()));
        } else if (authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN")) && CollectionUtils.isNotEmpty(ids)) {
            log.debug("REST request to get localizations for given Blog Post ids - as Admin");
            return (localizedBlogPostRepository.findByBlogPostIds(ids));
        } else {
            return (getAllowedLocalizedPosts(ids, authentication.getPrincipal()));
        }
    }

    /**
     * {@code GET  /localized-blog-posts/:id} : get the "id" localizedBlogPost.
     *
     * @param id the id of the localizedBlogPost to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the localizedBlogPost, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/localized-blog-posts/{id}")
    public ResponseEntity<LocalizedBlogPost> getLocalizedBlogPost(@PathVariable Long id) {
        log.debug("REST request to get LocalizedBlogPost : {}", id);
        Optional<LocalizedBlogPost> localizedBlogPost = localizedBlogPostRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(localizedBlogPost);
    }

    /**
     * {@code DELETE  /localized-blog-posts/:id} : delete the "id" localizedBlogPost.
     *
     * @param id the id of the localizedBlogPost to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/localized-blog-posts/{id}")
    public ResponseEntity<Void> deleteLocalizedBlogPost(@PathVariable Long id) {
        log.debug("REST request to delete LocalizedBlogPost : {}", id);
        localizedBlogPostRepository.deleteById(id);
        return ResponseEntity
                .noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
    }

    /**
     * Gets all localized post contents belonging to the current user, or anyone that has Writer rights or more.
     */
    private List<LocalizedBlogPost> getAllowedLocalizedPosts(List<Long> ids, Object principal) {
        if (CollectionUtils.isEmpty(ids)) {
            return new LinkedList<>();
        } else if (principal != null) {
            if (principal instanceof UserDetails) {
                log.debug("REST request to get localizations for given Blog Post ids - as User (with UserDetails)");
                return localizedBlogPostRepository.findByBlogPostIdsAndIsCurrentSpringUserOrWriter(ids);
            } else if (principal instanceof DefaultOidcUser) {
                log.debug("REST request to get localizations for given Blog Post ids - as User (with Oidc token)");
                return localizedBlogPostRepository.findByBlogPostIdsAndIsCurrentOidcUserOrWriter(ids);
            }
        }
        log.debug("REST request to get localizations for given Blog Post ids - as Anonymous");
        return localizedBlogPostRepository.findByBlogPostIdsAndIsWriter(ids);
    }
}
