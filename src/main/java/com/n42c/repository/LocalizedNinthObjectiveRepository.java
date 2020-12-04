package com.n42c.repository;

import com.n42c.domain.LocalizedNinthObjective;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the LocalizedNinthObjective entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocalizedNinthObjectiveRepository extends JpaRepository<LocalizedNinthObjective, Long> {
}
