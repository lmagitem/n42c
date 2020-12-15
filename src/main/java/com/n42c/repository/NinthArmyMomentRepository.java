package com.n42c.repository;

import com.n42c.domain.NinthArmyMoment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the NinthArmyMoment entity.
 */
@Repository
public interface NinthArmyMomentRepository extends JpaRepository<NinthArmyMoment, Long> {

    @Query(value = "select distinct ninthArmyMoment from NinthArmyMoment ninthArmyMoment left join fetch ninthArmyMoment.selectedUnits left join fetch ninthArmyMoment.selectedObjectives",
        countQuery = "select count(distinct ninthArmyMoment) from NinthArmyMoment ninthArmyMoment")
    Page<NinthArmyMoment> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct ninthArmyMoment from NinthArmyMoment ninthArmyMoment left join fetch ninthArmyMoment.selectedUnits left join fetch ninthArmyMoment.selectedObjectives")
    List<NinthArmyMoment> findAllWithEagerRelationships();

    @Query("select ninthArmyMoment from NinthArmyMoment ninthArmyMoment left join fetch ninthArmyMoment.selectedUnits left join fetch ninthArmyMoment.selectedObjectives where ninthArmyMoment.id =:id")
    Optional<NinthArmyMoment> findOneWithEagerRelationships(@Param("id") Long id);
}
