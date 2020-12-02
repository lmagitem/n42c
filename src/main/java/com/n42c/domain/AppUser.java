package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

import com.n42c.domain.enumeration.AppUserRights;
import org.springframework.beans.factory.annotation.Autowired;

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
     * Does the user have admin rights?
     */
    @NotNull
    @ApiModelProperty(value = "Does the user have admin rights?", required = true)
    @Column(name = "admin", nullable = false)
    private Boolean admin;

    /**
     * The user rights regarding the shop.
     */
    @NotNull
    @ApiModelProperty(value = "The user rights regarding the shop.", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "shop_rights", nullable = false)
    private AppUserRights shopRights;

    /**
     * The user rights regarding blog writing.
     */
    @NotNull
    @ApiModelProperty(value = "The user rights regarding blog writing.", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "blog_rights", nullable = false)
    private AppUserRights blogRights;

    /**
     * The user rights regarding its profile.
     */
    @NotNull
    @ApiModelProperty(value = "The user rights regarding its profile.", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "profile_rights", nullable = false)
    private AppUserRights profileRights;

    /**
     * The user rights regarding the Scriptorium.
     */
    @NotNull
    @ApiModelProperty(value = "The user rights regarding the Scriptorium.", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "scriptorium_rights", nullable = false)
    private AppUserRights scriptoriumRights;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "author")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Blog> blogs = new HashSet<>();

    @OneToMany(mappedBy = "user")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<AppUserProfile> profiles = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "app_user_given_friendships",
               joinColumns = @JoinColumn(name = "app_user_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "given_friendships_id", referencedColumnName = "id"))
    private Set<AppUser> givenFriendships = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "app_user_asked_friend_requests",
               joinColumns = @JoinColumn(name = "app_user_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "asked_friend_requests_id", referencedColumnName = "id"))
    private Set<AppUser> askedFriendRequests = new HashSet<>();

    @OneToOne(mappedBy = "appUser")
    @JsonIgnore
    private Player player;

    @ManyToMany(mappedBy = "givenFriendships")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<AppUser> receivedFriendships = new HashSet<>();

    @ManyToMany(mappedBy = "askedFriendRequests")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<AppUser> pendingFriendRequests = new HashSet<>();

    @ManyToMany(mappedBy = "authors")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Product> products = new HashSet<>();

    @ManyToMany(mappedBy = "authors")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<BlogPost> posts = new HashSet<>();

    public AppUser() {
    }

    public AppUser(Long id, String displayedName) {
        this.id = id;
        this.displayedName = displayedName;
    }

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

    public AppUserRights getShopRights() {
        return shopRights;
    }

    public AppUser shopRights(AppUserRights shopRights) {
        this.shopRights = shopRights;
        return this;
    }

    public void setShopRights(AppUserRights shopRights) {
        this.shopRights = shopRights;
    }

    public AppUserRights getBlogRights() {
        return blogRights;
    }

    public AppUser blogRights(AppUserRights blogRights) {
        this.blogRights = blogRights;
        return this;
    }

    public void setBlogRights(AppUserRights blogRights) {
        this.blogRights = blogRights;
    }

    public AppUserRights getProfileRights() {
        return profileRights;
    }

    public AppUser profileRights(AppUserRights profileRights) {
        this.profileRights = profileRights;
        return this;
    }

    public void setProfileRights(AppUserRights profileRights) {
        this.profileRights = profileRights;
    }

    public AppUserRights getScriptoriumRights() {
        return scriptoriumRights;
    }

    public AppUser scriptoriumRights(AppUserRights scriptoriumRights) {
        this.scriptoriumRights = scriptoriumRights;
        return this;
    }

    public void setScriptoriumRights(AppUserRights scriptoriumRights) {
        this.scriptoriumRights = scriptoriumRights;
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

    public Set<Blog> getBlogs() {
        return blogs;
    }

    public AppUser blogs(Set<Blog> blogs) {
        this.blogs = blogs;
        return this;
    }

    public AppUser addBlogs(Blog blog) {
        this.blogs.add(blog);
        blog.setAuthor(this);
        return this;
    }

    public AppUser removeBlogs(Blog blog) {
        this.blogs.remove(blog);
        blog.setAuthor(null);
        return this;
    }

    public void setBlogs(Set<Blog> blogs) {
        this.blogs = blogs;
    }

    public Set<AppUserProfile> getProfiles() {
        return profiles;
    }

    public AppUser profiles(Set<AppUserProfile> appUserProfiles) {
        this.profiles = appUserProfiles;
        return this;
    }

    public AppUser addProfiles(AppUserProfile appUserProfile) {
        this.profiles.add(appUserProfile);
        appUserProfile.setUser(this);
        return this;
    }

    public AppUser removeProfiles(AppUserProfile appUserProfile) {
        this.profiles.remove(appUserProfile);
        appUserProfile.setUser(null);
        return this;
    }

    public void setProfiles(Set<AppUserProfile> appUserProfiles) {
        this.profiles = appUserProfiles;
    }

    public Set<AppUser> getGivenFriendships() {
        return givenFriendships;
    }

    public AppUser givenFriendships(Set<AppUser> appUsers) {
        this.givenFriendships = appUsers;
        return this;
    }

    public AppUser addGivenFriendships(AppUser appUser) {
        this.givenFriendships.add(appUser);
        appUser.getReceivedFriendships().add(this);
        return this;
    }

    public AppUser removeGivenFriendships(AppUser appUser) {
        this.givenFriendships.remove(appUser);
        appUser.getReceivedFriendships().remove(this);
        return this;
    }

    public void setGivenFriendships(Set<AppUser> appUsers) {
        this.givenFriendships = appUsers;
    }

    public Set<AppUser> getAskedFriendRequests() {
        return askedFriendRequests;
    }

    public AppUser askedFriendRequests(Set<AppUser> appUsers) {
        this.askedFriendRequests = appUsers;
        return this;
    }

    public AppUser addAskedFriendRequests(AppUser appUser) {
        this.askedFriendRequests.add(appUser);
        appUser.getPendingFriendRequests().add(this);
        return this;
    }

    public AppUser removeAskedFriendRequests(AppUser appUser) {
        this.askedFriendRequests.remove(appUser);
        appUser.getPendingFriendRequests().remove(this);
        return this;
    }

    public void setAskedFriendRequests(Set<AppUser> appUsers) {
        this.askedFriendRequests = appUsers;
    }

    public Player getPlayer() {
        return player;
    }

    public AppUser player(Player player) {
        this.player = player;
        return this;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Set<AppUser> getReceivedFriendships() {
        return receivedFriendships;
    }

    public AppUser receivedFriendships(Set<AppUser> appUsers) {
        this.receivedFriendships = appUsers;
        return this;
    }

    public AppUser addReceivedFriendships(AppUser appUser) {
        this.receivedFriendships.add(appUser);
        appUser.getGivenFriendships().add(this);
        return this;
    }

    public AppUser removeReceivedFriendships(AppUser appUser) {
        this.receivedFriendships.remove(appUser);
        appUser.getGivenFriendships().remove(this);
        return this;
    }

    public void setReceivedFriendships(Set<AppUser> appUsers) {
        this.receivedFriendships = appUsers;
    }

    public Set<AppUser> getPendingFriendRequests() {
        return pendingFriendRequests;
    }

    public AppUser pendingFriendRequests(Set<AppUser> appUsers) {
        this.pendingFriendRequests = appUsers;
        return this;
    }

    public AppUser addPendingFriendRequests(AppUser appUser) {
        this.pendingFriendRequests.add(appUser);
        appUser.getAskedFriendRequests().add(this);
        return this;
    }

    public AppUser removePendingFriendRequests(AppUser appUser) {
        this.pendingFriendRequests.remove(appUser);
        appUser.getAskedFriendRequests().remove(this);
        return this;
    }

    public void setPendingFriendRequests(Set<AppUser> appUsers) {
        this.pendingFriendRequests = appUsers;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public AppUser products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public AppUser addProducts(Product product) {
        this.products.add(product);
        product.getAuthors().add(this);
        return this;
    }

    public AppUser removeProducts(Product product) {
        this.products.remove(product);
        product.getAuthors().remove(this);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Set<BlogPost> getPosts() {
        return posts;
    }

    public AppUser posts(Set<BlogPost> blogPosts) {
        this.posts = blogPosts;
        return this;
    }

    public AppUser addPosts(BlogPost blogPost) {
        this.posts.add(blogPost);
        blogPost.getAuthors().add(this);
        return this;
    }

    public AppUser removePosts(BlogPost blogPost) {
        this.posts.remove(blogPost);
        blogPost.getAuthors().remove(this);
        return this;
    }

    public void setPosts(Set<BlogPost> blogPosts) {
        this.posts = blogPosts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    /**
     * Removes sensitive informations from the instance.
     */
    public void clearSensitiveInfos(EntityManager entityManager) {
        if (entityManager != null) {
            entityManager.detach(this);
            this.setUser(new User());
            this.setAskedFriendRequests(new LinkedHashSet<>());
            this.setGivenFriendships(new LinkedHashSet<>());
            this.setBlogs(new LinkedHashSet<>());
            this.setProfiles(new LinkedHashSet<>());
            this.setProducts(new LinkedHashSet<>());
        }
    }

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
            ", admin='" + isAdmin() + "'" +
            ", shopRights='" + getShopRights() + "'" +
            ", blogRights='" + getBlogRights() + "'" +
            ", profileRights='" + getProfileRights() + "'" +
            ", scriptoriumRights='" + getScriptoriumRights() + "'" +
            "}";
    }
}
