package com.n42c.repository;

import com.n42c.domain.BlogPost;
import com.n42c.domain.LocalizedPostContent;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the LocalizedPostContent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocalizedPostContentRepository extends JpaRepository<LocalizedPostContent, Long> {
    @Query("select localizedPost from LocalizedPostContent localizedPost where localizedPost.post.id in :ids")
    List<LocalizedPostContent> findByBlogPostIds(@Param("ids") List<Long> ids);

    @Query("select localizedPost from LocalizedPostContent localizedPost where localizedPost.post.blog.author.user.id = ?#{principal.name} " +
        "or localizedPost.post.blog.author.blogRights = 'WRI' or localizedPost.post.blog.author.blogRights = 'MOD'")
    List<LocalizedPostContent> findByBlogPostIdsAndIsCurrentOidcUserOrWriter(@Param("ids") List<Long> ids);

    @Query("select localizedPost from LocalizedPostContent localizedPost where localizedPost.post.blog.author.user.id = ?#{principal.username} " +
        "or localizedPost.post.blog.author.blogRights = 'WRI' or localizedPost.post.blog.author.blogRights = 'MOD'")
    List<LocalizedPostContent> findByBlogPostIdsAndIsCurrentSpringUserOrWriter(@Param("ids") List<Long> ids);

    @Query("select localizedPost from LocalizedPostContent localizedPost where localizedPost.post.blog.author.blogRights = 'WRI' " +
        "or localizedPost.post.blog.author.blogRights = 'MOD'")
    List<LocalizedPostContent> findByBlogPostIdsAndIsWriter(@Param("ids") List<Long> ids);
}
