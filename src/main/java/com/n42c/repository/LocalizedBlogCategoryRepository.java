package com.n42c.repository;

import com.n42c.domain.LocalizedBlogCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the LocalizedBlogCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocalizedBlogCategoryRepository extends JpaRepository<LocalizedBlogCategory, Long> {
}
