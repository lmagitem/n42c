package com.n42c.repository;

import com.n42c.domain.LocalizedNinthDeploymentMap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the LocalizedNinthDeploymentMap entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocalizedNinthDeploymentMapRepository extends JpaRepository<LocalizedNinthDeploymentMap, Long> {
}
