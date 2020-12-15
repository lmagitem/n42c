package com.n42c.repository;

import com.n42c.domain.LocalizedBlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the LocalizedBlogPost entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocalizedBlogPostRepository extends JpaRepository<LocalizedBlogPost, Long> {
    @Query("select localizedPost from LocalizedBlogPost localizedPost where localizedPost.post.id in :ids")
    List<LocalizedBlogPost> findByBlogPostIds(@Param("ids") List<Long> ids);

    @Query("select localizedPost from LocalizedBlogPost localizedPost where localizedPost.post.id in :ids " +
        "and (localizedPost.post.blog.author.user.id = ?#{principal.name} or localizedPost.post.blog.author.blogRights = 'WRI' " +
        "or localizedPost.post.blog.author.blogRights = 'MOD')")
    List<LocalizedBlogPost> findByBlogPostIdsAndIsCurrentOidcUserOrWriter(@Param("ids") List<Long> ids);

    @Query("select localizedPost from LocalizedBlogPost localizedPost where localizedPost.post.id in :ids " +
        "and (localizedPost.post.blog.author.user.id = ?#{principal.username} or localizedPost.post.blog.author.blogRights = 'WRI' " +
        "or localizedPost.post.blog.author.blogRights = 'MOD')")
    List<LocalizedBlogPost> findByBlogPostIdsAndIsCurrentSpringUserOrWriter(@Param("ids") List<Long> ids);

    @Query("select localizedPost from LocalizedBlogPost localizedPost where localizedPost.post.id in :ids " +
        "and (localizedPost.post.blog.author.blogRights = 'WRI' or localizedPost.post.blog.author.blogRights = 'MOD')")
    List<LocalizedBlogPost> findByBlogPostIdsAndIsWriter(@Param("ids") List<Long> ids);
}
