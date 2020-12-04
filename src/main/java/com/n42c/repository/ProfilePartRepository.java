package com.n42c.repository;

import com.n42c.domain.ProfilePart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProfilePart entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfilePartRepository extends JpaRepository<ProfilePart, Long> {
}
