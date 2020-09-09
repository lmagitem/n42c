package com.n42c.repository;

import com.n42c.domain.NinthArmy;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NinthArmy entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NinthArmyRepository extends JpaRepository<NinthArmy, Long> {
}
