package com.n42c.repository;

import com.n42c.domain.LocalizedNinthMission;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the LocalizedNinthMission entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocalizedNinthMissionRepository extends JpaRepository<LocalizedNinthMission, Long> {
}
