package com.n42c.repository;

import com.n42c.domain.LocalizedProduct;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the LocalizedProduct entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocalizedProductRepository extends JpaRepository<LocalizedProduct, Long> {
}
