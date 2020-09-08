package com.n42c.repository;

import com.n42c.domain.NinthDeploymentMap;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the NinthDeploymentMap entity.
 */
@Repository
public interface NinthDeploymentMapRepository extends JpaRepository<NinthDeploymentMap, Long> {

    @Query(value = "select distinct ninthDeploymentMap from NinthDeploymentMap ninthDeploymentMap left join fetch ninthDeploymentMap.usedInMissions",
        countQuery = "select count(distinct ninthDeploymentMap) from NinthDeploymentMap ninthDeploymentMap")
    Page<NinthDeploymentMap> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct ninthDeploymentMap from NinthDeploymentMap ninthDeploymentMap left join fetch ninthDeploymentMap.usedInMissions")
    List<NinthDeploymentMap> findAllWithEagerRelationships();

    @Query("select ninthDeploymentMap from NinthDeploymentMap ninthDeploymentMap left join fetch ninthDeploymentMap.usedInMissions where ninthDeploymentMap.id =:id")
    Optional<NinthDeploymentMap> findOneWithEagerRelationships(@Param("id") Long id);
}
