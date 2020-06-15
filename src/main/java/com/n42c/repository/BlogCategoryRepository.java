package com.n42c.repository;

import com.n42c.domain.BlogCategory;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the BlogCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlogCategoryRepository extends JpaRepository<BlogCategory, Long> {
}
