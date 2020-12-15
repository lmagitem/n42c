package com.n42c.repository;

import com.n42c.domain.NinthArmyUnitMoment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NinthArmyUnitMoment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NinthArmyUnitMomentRepository extends JpaRepository<NinthArmyUnitMoment, Long> {
}
