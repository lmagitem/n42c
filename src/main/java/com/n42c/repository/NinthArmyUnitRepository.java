package com.n42c.repository;

import com.n42c.domain.NinthArmyUnit;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NinthArmyUnit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NinthArmyUnitRepository extends JpaRepository<NinthArmyUnit, Long> {
}
