package com.n42c.web.rest.utils;

import io.github.jhipster.web.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Collection;
import java.util.List;

/**
 * Common methods for REST services.
 **/
public class RestServiceUtils {

    private static final Logger log = LoggerFactory.getLogger(RestServiceUtils.class);

    /**
     * For a given Page object, returns a HTTP response containing its result list and headers containing the pagination.
     */
    public static <T> ResponseEntity<List<T>> returnPagedListWithHeaders(Page<T> page) {
        if (page == null)
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity
                .ok()
                .headers(PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page))
                .body(page.getContent());
    }

    /**
     * @return The Authentication contained within the given context, or null if there was none or the given context was null.
     */
    public static Authentication getAuthentication(SecurityContext context) {
        Authentication authentication = null;
        if (context != null) {
            authentication = context.getAuthentication();
        }
        return authentication;
    }

    /**
     * @return The Authorities contained within the given authentication, or null if there was none or the authentication context was null.
     */
    public static Collection<? extends GrantedAuthority> getAuthorities(Authentication authentication) {
        Collection<? extends GrantedAuthority> authorities = null;
        if (authentication != null) {
            authorities = authentication.getAuthorities();
        }
        return authorities;
    }
}
