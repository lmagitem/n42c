package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.n42c.domain.enumeration.Language;

/**
 * Data used to build an user profile page.
 */
@ApiModel(description = "Data used to build an user profile page.")
@Entity
@Table(name = "app_user_profile")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class AppUserProfile implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * The displayed name for that user.
     */
    @NotNull
    @ApiModelProperty(value = "The displayed name for that user.", required = true)
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * The title of this profile.
     */
    @ApiModelProperty(value = "The title of this profile.")
    @Column(name = "title")
    private String title;

    /**
     * A summary to show on the user profile.
     */
    @ApiModelProperty(value = "A summary to show on the user profile.")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "summary")
    private String summary;

    /**
     * The picture to show in the profile header.
     */
    @ApiModelProperty(value = "The picture to show in the profile header.")
    @Column(name = "header_background_uri")
    private String headerBackgroundURI;

    /**
     * This profile's language.
     */
    @ApiModelProperty(value = "This profile's language.")
    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    private Language language;

    @OneToMany(mappedBy = "profile")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ProfilePart> profileParts = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "profiles", allowSetters = true)
    private AppUser user;

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

    public AppUserProfile name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public AppUserProfile title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public AppUserProfile summary(String summary) {
        this.summary = summary;
        return this;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getHeaderBackgroundURI() {
        return headerBackgroundURI;
    }

    public AppUserProfile headerBackgroundURI(String headerBackgroundURI) {
        this.headerBackgroundURI = headerBackgroundURI;
        return this;
    }

    public void setHeaderBackgroundURI(String headerBackgroundURI) {
        this.headerBackgroundURI = headerBackgroundURI;
    }

    public Language getLanguage() {
        return language;
    }

    public AppUserProfile language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Set<ProfilePart> getProfileParts() {
        return profileParts;
    }

    public AppUserProfile profileParts(Set<ProfilePart> profileParts) {
        this.profileParts = profileParts;
        return this;
    }

    public AppUserProfile addProfileParts(ProfilePart profilePart) {
        this.profileParts.add(profilePart);
        profilePart.setProfile(this);
        return this;
    }

    public AppUserProfile removeProfileParts(ProfilePart profilePart) {
        this.profileParts.remove(profilePart);
        profilePart.setProfile(null);
        return this;
    }

    public void setProfileParts(Set<ProfilePart> profileParts) {
        this.profileParts = profileParts;
    }

    public AppUser getUser() {
        return user;
    }

    public AppUserProfile user(AppUser appUser) {
        this.user = appUser;
        return this;
    }

    public void setUser(AppUser appUser) {
        this.user = appUser;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AppUserProfile)) {
            return false;
        }
        return id != null && id.equals(((AppUserProfile) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AppUserProfile{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", title='" + getTitle() + "'" +
            ", summary='" + getSummary() + "'" +
            ", headerBackgroundURI='" + getHeaderBackgroundURI() + "'" +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
