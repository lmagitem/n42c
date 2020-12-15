package com.n42c.repository;

import com.n42c.domain.ProfilePartPreciseItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProfilePartPreciseItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfilePartPreciseItemRepository extends JpaRepository<ProfilePartPreciseItem, Long> {
}
