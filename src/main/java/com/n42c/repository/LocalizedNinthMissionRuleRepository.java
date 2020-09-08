package com.n42c.repository;

import com.n42c.domain.LocalizedNinthMissionRule;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the LocalizedNinthMissionRule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocalizedNinthMissionRuleRepository extends JpaRepository<LocalizedNinthMissionRule, Long> {
}
