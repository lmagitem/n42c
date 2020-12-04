package com.n42c.repository;

import com.n42c.domain.ProfilePartSkillCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProfilePartSkillCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfilePartSkillCategoryRepository extends JpaRepository<ProfilePartSkillCategory, Long> {
}
