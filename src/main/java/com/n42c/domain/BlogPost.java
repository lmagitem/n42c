package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * This post's title.
     */
    @NotNull
    @ApiModelProperty(value = "This post's title.", required = true)
    @Column(name = "title", nullable = false)
    private String title;

    /**
     * The date and time at which this post was published.
     */
    @ApiModelProperty(value = "The date and time at which this post was published.")
    @Column(name = "published")
    private Instant published;

    /**
     * The last date and time at which this post was modified.
     */
    @NotNull
    @ApiModelProperty(value = "The last date and time at which this post was modified.", required = true)
    @Column(name = "modified", nullable = false)
    private Instant modified;

    @OneToMany(mappedBy = "post")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<LocalizedPostContent> localizations = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "blog_post_authors",
        joinColumns = @JoinColumn(name = "blog_post_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "authors_id", referencedColumnName = "id"))
    private Set<AppUser> authors = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "blog_post_categories",
        joinColumns = @JoinColumn(name = "blog_post_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "categories_id", referencedColumnName = "id"))
    private Set<BlogCategory> categories = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "posts", allowSetters = true)
    private Blog blog;

    public BlogPost() {
    }

    public BlogPost(Long id) {
        this.id = id;
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public BlogPost title(String title) {
        this.title = title;
        return this;
    }

    public Instant getPublished() {
        return published;
    }

    public void setPublished(Instant published) {
        this.published = published;
    }

    public BlogPost published(Instant published) {
        this.published = published;
        return this;
    }

    public Instant getModified() {
        return modified;
    }

    public void setModified(Instant modified) {
        this.modified = modified;
    }

    public BlogPost modified(Instant modified) {
        this.modified = modified;
        return this;
    }

    public Set<LocalizedPostContent> getLocalizations() {
        return localizations;
    }

    public void setLocalizations(Set<LocalizedPostContent> localizedPostContents) {
        this.localizations = localizedPostContents;
    }

    public BlogPost localizations(Set<LocalizedPostContent> localizedPostContents) {
        this.localizations = localizedPostContents;
        return this;
    }

    public BlogPost addLocalizations(LocalizedPostContent localizedPostContent) {
        this.localizations.add(localizedPostContent);
        localizedPostContent.setPost(this);
        return this;
    }

    public BlogPost removeLocalizations(LocalizedPostContent localizedPostContent) {
        this.localizations.remove(localizedPostContent);
        localizedPostContent.setPost(null);
        return this;
    }

    public Set<AppUser> getAuthors() {
        return authors;
    }

    public void setAuthors(Set<AppUser> appUsers) {
        this.authors = appUsers;
    }

    public BlogPost authors(Set<AppUser> appUsers) {
        this.authors = appUsers;
        return this;
    }

    public BlogPost addAuthors(AppUser appUser) {
        this.authors.add(appUser);
        appUser.getPosts().add(this);
        return this;
    }

    public BlogPost removeAuthors(AppUser appUser) {
        this.authors.remove(appUser);
        appUser.getPosts().remove(this);
        return this;
    }

    public Set<BlogCategory> getCategories() {
        return categories;
    }

    public void setCategories(Set<BlogCategory> blogCategories) {
        this.categories = blogCategories;
    }

    public BlogPost categories(Set<BlogCategory> blogCategories) {
        this.categories = blogCategories;
        return this;
    }

    public BlogPost addCategories(BlogCategory blogCategory) {
        this.categories.add(blogCategory);
        blogCategory.getPosts().add(this);
        return this;
    }

    public BlogPost removeCategories(BlogCategory blogCategory) {
        this.categories.remove(blogCategory);
        blogCategory.getPosts().remove(this);
        return this;
    }

    public Blog getBlog() {
        return blog;
    }

    public void setBlog(Blog blog) {
        this.blog = blog;
    }

    public BlogPost blog(Blog blog) {
        this.blog = blog;
        return this;
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
            ", title='" + getTitle() + "'" +
            ", published='" + getPublished() + "'" +
            ", modified='" + getModified() + "'" +
            "}";
    }
}
