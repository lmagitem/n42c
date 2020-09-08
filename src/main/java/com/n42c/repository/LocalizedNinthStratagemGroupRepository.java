package com.n42c.repository;

import com.n42c.domain.LocalizedNinthStratagemGroup;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the LocalizedNinthStratagemGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocalizedNinthStratagemGroupRepository extends JpaRepository<LocalizedNinthStratagemGroup, Long> {
}
