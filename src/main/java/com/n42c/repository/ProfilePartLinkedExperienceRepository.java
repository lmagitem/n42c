package com.n42c.repository;

import com.n42c.domain.ProfilePartLinkedExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProfilePartLinkedExperience entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfilePartLinkedExperienceRepository extends JpaRepository<ProfilePartLinkedExperience, Long> {
}
