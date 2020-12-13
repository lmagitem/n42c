package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * Categories in which a blog post might be filled.
 */
@ApiModel(description = "Categories in which a blog post might be filled.")
@Entity
@Table(name = "blog_category")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class BlogCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * This category's name.
     */
    @NotNull
    @ApiModelProperty(value = "This category's name.", required = true)
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "parentCategory")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BlogCategory> subcategories = new HashSet<>();

    @OneToMany(mappedBy = "category")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<LocalizedBlogCategory> localizations = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "subcategories", allowSetters = true)
    private BlogCategory parentCategory;

    @ManyToMany(mappedBy = "categories")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Set<BlogPost> posts = new HashSet<>();

    public BlogCategory() {
    }

    public BlogCategory(Long id, @NotNull String name) {
        this.id = id;
        this.name = name;
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BlogCategory name(String name) {
        this.name = name;
        return this;
    }

    public Set<BlogCategory> getSubcategories() {
        return subcategories;
    }

    public void setSubcategories(Set<BlogCategory> blogCategories) {
        this.subcategories = blogCategories;
    }

    public BlogCategory subcategories(Set<BlogCategory> blogCategories) {
        this.subcategories = blogCategories;
        return this;
    }

    public BlogCategory addSubcategories(BlogCategory blogCategory) {
        this.subcategories.add(blogCategory);
        blogCategory.setParentCategory(this);
        return this;
    }

    public BlogCategory removeSubcategories(BlogCategory blogCategory) {
        this.subcategories.remove(blogCategory);
        blogCategory.setParentCategory(null);
        return this;
    }

    public Set<LocalizedBlogCategory> getLocalizations() {
        return localizations;
    }

    public void setLocalizations(Set<LocalizedBlogCategory> localizedBlogCategories) {
        this.localizations = localizedBlogCategories;
    }

    public BlogCategory localizations(Set<LocalizedBlogCategory> localizedBlogCategories) {
        this.localizations = localizedBlogCategories;
        return this;
    }

    public BlogCategory addLocalizations(LocalizedBlogCategory localizedBlogCategory) {
        this.localizations.add(localizedBlogCategory);
        localizedBlogCategory.setCategory(this);
        return this;
    }

    public BlogCategory removeLocalizations(LocalizedBlogCategory localizedBlogCategory) {
        this.localizations.remove(localizedBlogCategory);
        localizedBlogCategory.setCategory(null);
        return this;
    }

    public BlogCategory getParentCategory() {
        return parentCategory;
    }

    public void setParentCategory(BlogCategory blogCategory) {
        this.parentCategory = blogCategory;
    }

    public BlogCategory parentCategory(BlogCategory blogCategory) {
        this.parentCategory = blogCategory;
        return this;
    }

    public Set<BlogPost> getPosts() {
        return posts;
    }

    public void setPosts(Set<BlogPost> blogPosts) {
        this.posts = blogPosts;
    }

    public BlogCategory posts(Set<BlogPost> blogPosts) {
        this.posts = blogPosts;
        return this;
    }

    public BlogCategory addPosts(BlogPost blogPost) {
        this.posts.add(blogPost);
        blogPost.getCategories().add(this);
        return this;
    }

    public BlogCategory removePosts(BlogPost blogPost) {
        this.posts.remove(blogPost);
        blogPost.getCategories().remove(this);
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BlogCategory)) {
            return false;
        }
        return id != null && id.equals(((BlogCategory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BlogCategory{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
