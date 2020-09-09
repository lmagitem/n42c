package com.n42c.repository;

import com.n42c.domain.NinthStratagemGroup;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NinthStratagemGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NinthStratagemGroupRepository extends JpaRepository<NinthStratagemGroup, Long> {
}
