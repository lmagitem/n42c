package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.n42c.domain.enumeration.Language;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * This category's name.
     */
    @NotNull
    @ApiModelProperty(value = "This category's name.", required = true)
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * This category's language.
     */
    @ApiModelProperty(value = "This category's language.")
    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    private Language language;

    @OneToMany(mappedBy = "subcategories")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BlogCategory> blogCategories = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "blogCategories", allowSetters = true)
    private BlogPost categories;

    @ManyToOne
    @JsonIgnoreProperties(value = "blogCategories", allowSetters = true)
    private BlogCategory subcategories;

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

    public BlogCategory name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Language getLanguage() {
        return language;
    }

    public BlogCategory language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Set<BlogCategory> getBlogCategories() {
        return blogCategories;
    }

    public BlogCategory blogCategories(Set<BlogCategory> blogCategories) {
        this.blogCategories = blogCategories;
        return this;
    }

    public BlogCategory addBlogCategory(BlogCategory blogCategory) {
        this.blogCategories.add(blogCategory);
        blogCategory.setSubcategories(this);
        return this;
    }

    public BlogCategory removeBlogCategory(BlogCategory blogCategory) {
        this.blogCategories.remove(blogCategory);
        blogCategory.setSubcategories(null);
        return this;
    }

    public void setBlogCategories(Set<BlogCategory> blogCategories) {
        this.blogCategories = blogCategories;
    }

    public BlogPost getCategories() {
        return categories;
    }

    public BlogCategory categories(BlogPost blogPost) {
        this.categories = blogPost;
        return this;
    }

    public void setCategories(BlogPost blogPost) {
        this.categories = blogPost;
    }

    public BlogCategory getSubcategories() {
        return subcategories;
    }

    public BlogCategory subcategories(BlogCategory blogCategory) {
        this.subcategories = blogCategory;
        return this;
    }

    public void setSubcategories(BlogCategory blogCategory) {
        this.subcategories = blogCategory;
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
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
