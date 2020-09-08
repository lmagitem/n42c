package com.n42c.repository;

import com.n42c.domain.NinthObjective;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NinthObjective entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NinthObjectiveRepository extends JpaRepository<NinthObjective, Long> {
}
