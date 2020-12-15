package com.n42c.repository;

import com.n42c.domain.NinthCampaign;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the NinthCampaign entity.
 */
@Repository
public interface NinthCampaignRepository extends JpaRepository<NinthCampaign, Long> {

    @Query(value = "select distinct ninthCampaign from NinthCampaign ninthCampaign left join fetch ninthCampaign.authors left join fetch ninthCampaign.participants left join fetch ninthCampaign.campaignStratagems",
        countQuery = "select count(distinct ninthCampaign) from NinthCampaign ninthCampaign")
    Page<NinthCampaign> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct ninthCampaign from NinthCampaign ninthCampaign left join fetch ninthCampaign.authors left join fetch ninthCampaign.participants left join fetch ninthCampaign.campaignStratagems")
    List<NinthCampaign> findAllWithEagerRelationships();

    @Query("select ninthCampaign from NinthCampaign ninthCampaign left join fetch ninthCampaign.authors left join fetch ninthCampaign.participants left join fetch ninthCampaign.campaignStratagems where ninthCampaign.id =:id")
    Optional<NinthCampaign> findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select ninthCampaignMoment.id from NinthCampaignMoment ninthCampaignMoment where ninthCampaignMoment.campaign.id =:id order by ninthCampaignMoment.sinceInstant asc")
    List<Long> findLinkedNinthCampaignMomentsIds(@Param("id") Long id);
}
