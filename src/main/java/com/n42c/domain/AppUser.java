package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.n42c.domain.enumerations.AppUserRights;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
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

    @Size(max = 256)
    @Column(name = "image_url", length = 256)
    private String imageUrl;

    @OneToOne(optional = false)
    @NotNull
    @JsonIgnore
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
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Set<AppUser> givenFriendships = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "app_user_asked_friend_requests",
        joinColumns = @JoinColumn(name = "app_user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "asked_friend_requests_id", referencedColumnName = "id"))
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Set<AppUser> askedFriendRequests = new HashSet<>();

    @OneToOne(mappedBy = "appUser")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Player player;

    @ManyToMany(mappedBy = "givenFriendships")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Set<AppUser> receivedFriendships = new HashSet<>();

    @ManyToMany(mappedBy = "askedFriendRequests")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Set<AppUser> pendingFriendRequests = new HashSet<>();

    @ManyToMany(mappedBy = "authors")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Set<Product> products = new HashSet<>();

    @ManyToMany(mappedBy = "authors")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Set<BlogPost> posts = new HashSet<>();

    public AppUser() {
    }

    public AppUser(Long id, String displayedName) {
        this.id = id;
        this.displayedName = displayedName;
    }

    public AppUser(Long id, @NotNull String userName, String displayedName, @NotNull Boolean admin, @NotNull AppUserRights shopRights, @NotNull AppUserRights blogRights, @NotNull AppUserRights profileRights, @NotNull AppUserRights scriptoriumRights) {
        this.id = id;
        this.userName = userName;
        this.displayedName = displayedName;
        this.admin = admin;
        this.shopRights = shopRights;
        this.blogRights = blogRights;
        this.profileRights = profileRights;
        this.scriptoriumRights = scriptoriumRights;
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

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public AppUser userName(String userName) {
        this.userName = userName;
        return this;
    }

    public String getDisplayedName() {
        return displayedName;
    }

    public void setDisplayedName(String displayedName) {
        this.displayedName = displayedName;
    }

    public AppUser displayedName(String displayedName) {
        this.displayedName = displayedName;
        return this;
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

    public void setShopRights(AppUserRights shopRights) {
        this.shopRights = shopRights;
    }

    public AppUser shopRights(AppUserRights shopRights) {
        this.shopRights = shopRights;
        return this;
    }

    public AppUserRights getBlogRights() {
        return blogRights;
    }

    public void setBlogRights(AppUserRights blogRights) {
        this.blogRights = blogRights;
    }

    public AppUser blogRights(AppUserRights blogRights) {
        this.blogRights = blogRights;
        return this;
    }

    public AppUserRights getProfileRights() {
        return profileRights;
    }

    public void setProfileRights(AppUserRights profileRights) {
        this.profileRights = profileRights;
    }

    public AppUser profileRights(AppUserRights profileRights) {
        this.profileRights = profileRights;
        return this;
    }

    public AppUserRights getScriptoriumRights() {
        return scriptoriumRights;
    }

    public void setScriptoriumRights(AppUserRights scriptoriumRights) {
        this.scriptoriumRights = scriptoriumRights;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public AppUser imageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public AppUser user(User user) {
        this.user = user;
        return this;
    }

    public Set<Blog> getBlogs() {
        return blogs;
    }

    public void setBlogs(Set<Blog> blogs) {
        this.blogs = blogs;
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

    public Set<AppUserProfile> getProfiles() {
        return profiles;
    }

    public void setProfiles(Set<AppUserProfile> appUserProfiles) {
        this.profiles = appUserProfiles;
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

    public Set<AppUser> getGivenFriendships() {
        return givenFriendships;
    }

    public void setGivenFriendships(Set<AppUser> appUsers) {
        this.givenFriendships = appUsers;
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

    public Set<AppUser> getAskedFriendRequests() {
        return askedFriendRequests;
    }

    public void setAskedFriendRequests(Set<AppUser> appUsers) {
        this.askedFriendRequests = appUsers;
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

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public AppUser player(Player player) {
        this.player = player;
        return this;
    }

    public Set<AppUser> getReceivedFriendships() {
        return receivedFriendships;
    }

    public void setReceivedFriendships(Set<AppUser> appUsers) {
        this.receivedFriendships = appUsers;
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

    public Set<AppUser> getPendingFriendRequests() {
        return pendingFriendRequests;
    }

    public void setPendingFriendRequests(Set<AppUser> appUsers) {
        this.pendingFriendRequests = appUsers;
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

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
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

    public Set<BlogPost> getPosts() {
        return posts;
    }

    public void setPosts(Set<BlogPost> blogPosts) {
        this.posts = blogPosts;
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
            ", admin='" + isAdmin() + "'" +
            ", shopRights='" + getShopRights() + "'" +
            ", blogRights='" + getBlogRights() + "'" +
            ", profileRights='" + getProfileRights() + "'" +
            ", scriptoriumRights='" + getScriptoriumRights() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            "}";
    }
}
