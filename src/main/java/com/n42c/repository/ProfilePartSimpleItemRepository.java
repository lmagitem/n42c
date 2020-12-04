package com.n42c.repository;

import com.n42c.domain.ProfilePartSimpleItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProfilePartSimpleItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfilePartSimpleItemRepository extends JpaRepository<ProfilePartSimpleItem, Long> {
}
