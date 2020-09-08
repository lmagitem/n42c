package com.n42c.repository;

import com.n42c.domain.LocalizedNinthStratagem;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the LocalizedNinthStratagem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocalizedNinthStratagemRepository extends JpaRepository<LocalizedNinthStratagem, Long> {
}
