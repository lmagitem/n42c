package com.n42c.repository;

import com.n42c.domain.NinthCampaignMoment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data  repository for the NinthCampaignMoment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NinthCampaignMomentRepository extends JpaRepository<NinthCampaignMoment, Long> {

    @Query("select ninthCampaignMoment from NinthCampaignMoment ninthCampaignMoment left join fetch ninthCampaignMoment.battles where ninthCampaignMoment.id =:id")
    Optional<NinthCampaignMoment> findOneWithEagerRelationships(@Param("id") Long id);

}
