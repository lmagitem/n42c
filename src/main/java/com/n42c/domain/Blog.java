package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
 * A specific blog, owned by a user
 */
@ApiModel(description = "A specific blog, owned by a user")
@Entity
@Table(name = "blog")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Blog implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * This blog's name.
     */
    @NotNull
    @ApiModelProperty(value = "This blog's name.", required = true)
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "blog")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BlogPost> posts = new HashSet<>();

    @OneToMany(mappedBy = "blog")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<LocalizedBlog> localizations = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "blogs", allowSetters = true)
    private AppUser author;

    public Blog() {
    }

    public Blog(Long id) {
        this.id = id;
    }

    public Blog(Long id, @NotNull String name) {
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

    public Blog name(String name) {
        this.name = name;
        return this;
    }

    public Set<BlogPost> getPosts() {
        return posts;
    }

    public void setPosts(Set<BlogPost> blogPosts) {
        this.posts = blogPosts;
    }

    public Blog posts(Set<BlogPost> blogPosts) {
        this.posts = blogPosts;
        return this;
    }

    public Blog addPosts(BlogPost blogPost) {
        this.posts.add(blogPost);
        blogPost.setBlog(this);
        return this;
    }

    public Blog removePosts(BlogPost blogPost) {
        this.posts.remove(blogPost);
        blogPost.setBlog(null);
        return this;
    }

    public Set<LocalizedBlog> getLocalizations() {
        return localizations;
    }

    public void setLocalizations(Set<LocalizedBlog> localizedBlogs) {
        this.localizations = localizedBlogs;
    }

    public Blog localizations(Set<LocalizedBlog> localizedBlogs) {
        this.localizations = localizedBlogs;
        return this;
    }

    public Blog addLocalizations(LocalizedBlog localizedBlog) {
        this.localizations.add(localizedBlog);
        localizedBlog.setBlog(this);
        return this;
    }

    public Blog removeLocalizations(LocalizedBlog localizedBlog) {
        this.localizations.remove(localizedBlog);
        localizedBlog.setBlog(null);
        return this;
    }

    public AppUser getAuthor() {
        return author;
    }

    public void setAuthor(AppUser appUser) {
        this.author = appUser;
    }

    public Blog author(AppUser appUser) {
        this.author = appUser;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Blog)) {
            return false;
        }
        return id != null && id.equals(((Blog) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Blog{" +
               "id=" + getId() +
               ", name='" + getName() + "'" +
               "}";
    }
}
