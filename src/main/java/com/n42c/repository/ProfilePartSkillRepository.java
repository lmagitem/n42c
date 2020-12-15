package com.n42c.repository;

import com.n42c.domain.ProfilePartSkill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the ProfilePartSkill entity.
 */
@Repository
public interface ProfilePartSkillRepository extends JpaRepository<ProfilePartSkill, Long> {

    @Query(value = "select distinct profilePartSkill from ProfilePartSkill profilePartSkill left join fetch profilePartSkill.linkedSkills",
        countQuery = "select count(distinct profilePartSkill) from ProfilePartSkill profilePartSkill")
    Page<ProfilePartSkill> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct profilePartSkill from ProfilePartSkill profilePartSkill left join fetch profilePartSkill.linkedSkills")
    List<ProfilePartSkill> findAllWithEagerRelationships();

    @Query("select profilePartSkill from ProfilePartSkill profilePartSkill left join fetch profilePartSkill.linkedSkills where profilePartSkill.id =:id")
    Optional<ProfilePartSkill> findOneWithEagerRelationships(@Param("id") Long id);
}
