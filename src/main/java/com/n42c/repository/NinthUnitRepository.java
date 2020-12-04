package com.n42c.repository;

import com.n42c.domain.NinthUnit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NinthUnit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NinthUnitRepository extends JpaRepository<NinthUnit, Long> {
}
