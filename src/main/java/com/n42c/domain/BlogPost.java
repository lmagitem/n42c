package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.n42c.domain.enumeration.Language;

/**
 * Blog posts to show on the app.
 */
@ApiModel(description = "Blog posts to show on the app.")
@Entity
@Table(name = "blog_post")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class BlogPost implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The date and time at which this post was published.
     */
    @NotNull
    @ApiModelProperty(value = "The date and time at which this post was published.", required = true)
    @Column(name = "published", nullable = false)
    private Instant published;

    /**
     * An excerpt of the post to show on the blog page.
     */
    @ApiModelProperty(value = "An excerpt of the post to show on the blog page.")
    @Column(name = "excerpt")
    private String excerpt;

    /**
     * The content of the post.
     */
    @NotNull
    @ApiModelProperty(value = "The content of the post.", required = true)
    @Column(name = "content", nullable = false)
    private String content;

    /**
     * This post's language.
     */
    @ApiModelProperty(value = "This post's language.")
    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    private Language language;

    @OneToMany(mappedBy = "categories")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BlogCategory> blogCategories = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "blogPosts", allowSetters = true)
    private AppUser author;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getPublished() {
        return published;
    }

    public BlogPost published(Instant published) {
        this.published = published;
        return this;
    }

    public void setPublished(Instant published) {
        this.published = published;
    }

    public String getExcerpt() {
        return excerpt;
    }

    public BlogPost excerpt(String excerpt) {
        this.excerpt = excerpt;
        return this;
    }

    public void setExcerpt(String excerpt) {
        this.excerpt = excerpt;
    }

    public String getContent() {
        return content;
    }

    public BlogPost content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Language getLanguage() {
        return language;
    }

    public BlogPost language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Set<BlogCategory> getBlogCategories() {
        return blogCategories;
    }

    public BlogPost blogCategories(Set<BlogCategory> blogCategories) {
        this.blogCategories = blogCategories;
        return this;
    }

    public BlogPost addBlogCategory(BlogCategory blogCategory) {
        this.blogCategories.add(blogCategory);
        blogCategory.setCategories(this);
        return this;
    }

    public BlogPost removeBlogCategory(BlogCategory blogCategory) {
        this.blogCategories.remove(blogCategory);
        blogCategory.setCategories(null);
        return this;
    }

    public void setBlogCategories(Set<BlogCategory> blogCategories) {
        this.blogCategories = blogCategories;
    }

    public AppUser getAuthor() {
        return author;
    }

    public BlogPost author(AppUser appUser) {
        this.author = appUser;
        return this;
    }

    public void setAuthor(AppUser appUser) {
        this.author = appUser;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BlogPost)) {
            return false;
        }
        return id != null && id.equals(((BlogPost) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BlogPost{" +
            "id=" + getId() +
            ", published='" + getPublished() + "'" +
            ", excerpt='" + getExcerpt() + "'" +
            ", content='" + getContent() + "'" +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
