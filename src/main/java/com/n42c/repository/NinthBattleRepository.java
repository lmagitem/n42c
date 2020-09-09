package com.n42c.repository;

import com.n42c.domain.NinthBattle;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NinthBattle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NinthBattleRepository extends JpaRepository<NinthBattle, Long> {
}
