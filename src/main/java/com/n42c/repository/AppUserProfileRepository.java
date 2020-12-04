package com.n42c.repository;

import com.n42c.domain.AppUserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AppUserProfile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppUserProfileRepository extends JpaRepository<AppUserProfile, Long> {
}
