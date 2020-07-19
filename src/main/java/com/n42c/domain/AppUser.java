package com.n42c.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.n42c.domain.enumeration.AppUserRights;

/**
 * AppUsers of the app.
 */
@ApiModel(description = "AppUsers of the app.")
@Entity
@Table(name = "app_user")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class AppUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * The user account's name.
     */
    @NotNull
    @ApiModelProperty(value = "The user account's name.", required = true)
    @Column(name = "user_name", nullable = false, unique = true)
    private String userName;

    /**
     * The name shown throughout the app.
     */
    
    @ApiModelProperty(value = "The name shown throughout the app.")
    @Column(name = "displayed_name", unique = true)
    private String displayedName;

    /**
     * The user email adress.
     */
    @NotNull
    @ApiModelProperty(value = "The user email adress.", required = true)
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    /**
     * Does the user have admin rights?
     */
    @NotNull
    @ApiModelProperty(value = "Does the user have admin rights?", required = true)
    @Column(name = "admin", nullable = false)
    private Boolean admin;

    /**
     * The user rights regarding the Scriptorium.
     */
    @NotNull
    @ApiModelProperty(value = "The user rights regarding the Scriptorium.", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "rights", nullable = false)
    private AppUserRights rights;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "author")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BlogPost> blogPosts = new HashSet<>();

    @OneToMany(mappedBy = "profiles")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<AppUserProfile> appUserProfiles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public AppUser userName(String userName) {
        this.userName = userName;
        return this;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getDisplayedName() {
        return displayedName;
    }

    public AppUser displayedName(String displayedName) {
        this.displayedName = displayedName;
        return this;
    }

    public void setDisplayedName(String displayedName) {
        this.displayedName = displayedName;
    }

    public String getEmail() {
        return email;
    }

    public AppUser email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean isAdmin() {
        return admin;
    }

    public AppUser admin(Boolean admin) {
        this.admin = admin;
        return this;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    public AppUserRights getRights() {
        return rights;
    }

    public AppUser rights(AppUserRights rights) {
        this.rights = rights;
        return this;
    }

    public void setRights(AppUserRights rights) {
        this.rights = rights;
    }

    public User getUser() {
        return user;
    }

    public AppUser user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<BlogPost> getBlogPosts() {
        return blogPosts;
    }

    public AppUser blogPosts(Set<BlogPost> blogPosts) {
        this.blogPosts = blogPosts;
        return this;
    }

    public AppUser addBlogPost(BlogPost blogPost) {
        this.blogPosts.add(blogPost);
        blogPost.setAuthor(this);
        return this;
    }

    public AppUser removeBlogPost(BlogPost blogPost) {
        this.blogPosts.remove(blogPost);
        blogPost.setAuthor(null);
        return this;
    }

    public void setBlogPosts(Set<BlogPost> blogPosts) {
        this.blogPosts = blogPosts;
    }

    public Set<AppUserProfile> getAppUserProfiles() {
        return appUserProfiles;
    }

    public AppUser appUserProfiles(Set<AppUserProfile> appUserProfiles) {
        this.appUserProfiles = appUserProfiles;
        return this;
    }

    public AppUser addAppUserProfile(AppUserProfile appUserProfile) {
        this.appUserProfiles.add(appUserProfile);
        appUserProfile.setProfiles(this);
        return this;
    }

    public AppUser removeAppUserProfile(AppUserProfile appUserProfile) {
        this.appUserProfiles.remove(appUserProfile);
        appUserProfile.setProfiles(null);
        return this;
    }

    public void setAppUserProfiles(Set<AppUserProfile> appUserProfiles) {
        this.appUserProfiles = appUserProfiles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AppUser)) {
            return false;
        }
        return id != null && id.equals(((AppUser) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AppUser{" +
            "id=" + getId() +
            ", userName='" + getUserName() + "'" +
            ", displayedName='" + getDisplayedName() + "'" +
            ", email='" + getEmail() + "'" +
            ", admin='" + isAdmin() + "'" +
            ", rights='" + getRights() + "'" +
            "}";
    }
}
