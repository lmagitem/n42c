package com.n42c.repository;

import com.n42c.domain.NinthMission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the NinthMission entity.
 */
@Repository
public interface NinthMissionRepository extends JpaRepository<NinthMission, Long> {

    @Query(value = "select distinct ninthMission from NinthMission ninthMission left join fetch ninthMission.missionStratagems left join fetch ninthMission.primaryObjectives left join fetch ninthMission.allowedSecondaries left join fetch ninthMission.rules",
        countQuery = "select count(distinct ninthMission) from NinthMission ninthMission")
    Page<NinthMission> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct ninthMission from NinthMission ninthMission left join fetch ninthMission.missionStratagems left join fetch ninthMission.primaryObjectives left join fetch ninthMission.allowedSecondaries left join fetch ninthMission.rules")
    List<NinthMission> findAllWithEagerRelationships();

    @Query("select ninthMission from NinthMission ninthMission left join fetch ninthMission.missionStratagems left join fetch ninthMission.primaryObjectives left join fetch ninthMission.allowedSecondaries left join fetch ninthMission.rules where ninthMission.id =:id")
    Optional<NinthMission> findOneWithEagerRelationships(@Param("id") Long id);
}
