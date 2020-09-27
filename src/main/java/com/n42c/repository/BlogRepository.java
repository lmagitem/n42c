package com.n42c.repository;

import com.n42c.domain.Blog;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Blog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    @Query("select blog from Blog blog where blog.author.user.id = ?#{principal.name} " +
        "or blog.author.blogRights = 'WRI' or blog.author.blogRights = 'MOD'")
    List<Blog> findByUserIsCurrentUserOrWriter();
}
