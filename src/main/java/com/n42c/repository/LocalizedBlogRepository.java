package com.n42c.repository;

import com.n42c.domain.LocalizedBlog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the LocalizedBlog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocalizedBlogRepository extends JpaRepository<LocalizedBlog, Long> {
    @Query("select localizedBlog from LocalizedBlog localizedBlog where localizedBlog.blog.id in :ids")
    List<LocalizedBlog> findByBlogIds(@Param("ids") List<Long> ids);

    @Query("select localizedBlog from LocalizedBlog localizedBlog where localizedBlog.blog.id in :ids " +
        "and (localizedBlog.blog.author.user.id = ?#{principal.name} or localizedBlog.blog.author.blogRights = 'WRI' " +
        "or localizedBlog.blog.author.blogRights = 'MOD')")
    List<LocalizedBlog> findByBlogIdsAndIsCurrentOidcUserOrWriter(@Param("ids") List<Long> ids);

    @Query("select localizedBlog from LocalizedBlog localizedBlog where localizedBlog.blog.id in :ids " +
        "and (localizedBlog.blog.author.user.id = ?#{principal.username} or localizedBlog.blog.author.blogRights = 'WRI' " +
        "or localizedBlog.blog.author.blogRights = 'MOD')")
    List<LocalizedBlog> findByBlogIdsAndIsCurrentSpringUserOrWriter(@Param("ids") List<Long> ids);

    @Query("select localizedBlog from LocalizedBlog localizedBlog where localizedBlog.blog.id in :ids " +
        "and (localizedBlog.blog.author.blogRights = 'WRI' or localizedBlog.blog.author.blogRights = 'MOD')")
    List<LocalizedBlog> findByBlogIdsAndIsWriter(@Param("ids") List<Long> ids);
}
