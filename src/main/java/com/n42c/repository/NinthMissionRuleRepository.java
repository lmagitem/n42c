package com.n42c.repository;

import com.n42c.domain.NinthMissionRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NinthMissionRule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NinthMissionRuleRepository extends JpaRepository<NinthMissionRule, Long> {
}
