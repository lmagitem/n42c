package com.n42c.repository;

import com.n42c.domain.LocalizedBlog;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the LocalizedBlog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocalizedBlogRepository extends JpaRepository<LocalizedBlog, Long> {
}
