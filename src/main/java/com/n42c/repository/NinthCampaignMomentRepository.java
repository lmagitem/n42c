package com.n42c.repository;

import com.n42c.domain.NinthCampaignMoment;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NinthCampaignMoment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NinthCampaignMomentRepository extends JpaRepository<NinthCampaignMoment, Long> {
}