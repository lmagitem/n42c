package com.n42c.web.rest.utils;

import com.n42c.domain.BlogPost;
import com.n42c.web.rest.BlogResource;
import io.github.jhipster.web.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

/**
 * Common methods for REST services.
 **/
public class RestServiceUtils {

    private static final Logger log = LoggerFactory.getLogger(RestServiceUtils.class);

    /**
     * For a given Page object, returns a successful HTTP result containing its result list and headers containing the pagination.
     **/
    public static <T> ResponseEntity<List<T>> returnPagedListWithHeaders(Page<T> page) {
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
