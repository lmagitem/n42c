package com.n42c.repository;

import com.n42c.domain.NinthStratagem;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NinthStratagem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NinthStratagemRepository extends JpaRepository<NinthStratagem, Long> {
}
