package com.n42c.repository;

import com.n42c.domain.AuthorToPostLinkView;
import com.n42c.domain.Blog;
import com.n42c.domain.BlogPost;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the BlogPost entity.
 */
@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {

    @Query(value = "select distinct blogPost from BlogPost blogPost left join fetch blogPost.authors left join fetch blogPost.categories " +
        "left join fetch blogPost.localizations",
        countQuery = "select count(distinct blogPost) from BlogPost blogPost")
    Page<BlogPost> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct blogPost from BlogPost blogPost left join fetch blogPost.authors left join fetch blogPost.categories " +
        "left join fetch blogPost.localizations")
    List<BlogPost> findAllWithEagerRelationships();

    @Query("select blogPost from BlogPost blogPost left join fetch blogPost.authors left join fetch blogPost.categories " +
        "left join fetch blogPost.localizations where blogPost.id =:id")
    Optional<BlogPost> findOneWithEagerRelationships(@Param("id") Long id);

    @Query(value = "select distinct blogPost from BlogPost blogPost where blogPost.blog.author.user.id = ?#{principal.name} " +
        "or blogPost.blog.author.blogRights = 'WRI' or blogPost.blog.author.blogRights = 'MOD'",
        countQuery = "select count(distinct blogPost) from BlogPost blogPost where blogPost.blog.author.user.id = ?#{principal.name} " +
            "or blogPost.blog.author.blogRights = 'WRI' or blogPost.blog.author.blogRights = 'MOD'")
    Page<BlogPost> findByIsCurrentOidcUserOrWriter(Pageable pageable);

    @Query(value = "select distinct blogPost from BlogPost blogPost where blogPost.blog.author.user.id = ?#{principal.username} " +
        "or blogPost.blog.author.blogRights = 'WRI' or blogPost.blog.author.blogRights = 'MOD'",
        countQuery = "select count(distinct blogPost) from BlogPost blogPost where blogPost.blog.author.user.id = ?#{principal.username} " +
            "or blogPost.blog.author.blogRights = 'WRI' or blogPost.blog.author.blogRights = 'MOD'")
    Page<BlogPost> findByIsCurrentSpringUserOrWriter(Pageable pageable);

    @Query(value = "select distinct blogPost from BlogPost blogPost where blogPost.blog.author.blogRights = 'WRI' or blogPost.blog.author.blogRights = 'MOD'",
        countQuery = "select count(distinct blogPost) from BlogPost blogPost where blogPost.blog.author.blogRights = 'WRI' or blogPost.blog.author.blogRights = 'MOD'")
    Page<BlogPost> findByIsWriter(Pageable pageable);

    @Query("select blogPost from BlogPost blogPost where blogPost.blog.id in :ids")
    Page<BlogPost> findByBlogIds(@Param("ids") List<Long> ids, Pageable pageable);

    @Query("select blogPost from BlogPost blogPost where (blogPost.blog.author.user.id = ?#{principal.name} " +
        "or blogPost.blog.author.blogRights = 'WRI' or blogPost.blog.author.blogRights = 'MOD') and blogPost.blog.id in :ids")
    Page<BlogPost> findByBlogIdsAndIsCurrentOidcUserOrWriter(@Param("ids") List<Long> ids, Pageable pageable);

    @Query("select blogPost from BlogPost blogPost where (blogPost.blog.author.user.id = ?#{principal.username} " +
        "or blogPost.blog.author.blogRights = 'WRI' or blogPost.blog.author.blogRights = 'MOD') and blogPost.blog.id in :ids")
    Page<BlogPost> findByBlogIdsAndIsCurrentSpringUserOrWriter(@Param("ids") List<Long> ids, Pageable pageable);

    @Query("select blogPost from BlogPost blogPost where (blogPost.blog.author.blogRights = 'WRI' " +
        "or blogPost.blog.author.blogRights = 'MOD') and blogPost.blog.id in :ids")
    Page<BlogPost> findByBlogIdsAndIsWriter(@Param("ids") List<Long> ids, Pageable pageable);

    @Query("select blogPost.id as postId, appUser.id as appUserId, appUser.displayedName as appUserDisplayedName " +
        "from BlogPost blogPost join blogPost.authors appUser where blogPost.id in :ids")
    List<AuthorToPostLinkView> findPairingsBetweenBlogPostIdsAndLightweightAppUsers(@Param("ids") List<Long> ids);

}
