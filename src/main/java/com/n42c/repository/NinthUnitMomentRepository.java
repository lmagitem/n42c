package com.n42c.repository;

import com.n42c.domain.NinthUnitMoment;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NinthUnitMoment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NinthUnitMomentRepository extends JpaRepository<NinthUnitMoment, Long> {
}
