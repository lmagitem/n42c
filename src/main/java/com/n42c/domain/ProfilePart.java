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

import com.n42c.domain.enumeration.ProfilePartType;

import com.n42c.domain.enumeration.ProfilePartOrderType;

/**
 * A category in which to display the content of a profile.
 */
@ApiModel(description = "A category in which to display the content of a profile.")
@Entity
@Table(name = "profile_part")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProfilePart implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * That part's title.
     */
    @NotNull
    @ApiModelProperty(value = "That part's title.", required = true)
    @Column(name = "title", nullable = false)
    private String title;

    /**
     * That part's type.
     */
    @NotNull
    @ApiModelProperty(value = "That part's type.", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private ProfilePartType type;

    /**
     * The index where this item must be ordered alongside similar ones.
     */
    @ApiModelProperty(value = "The index where this item must be ordered alongside similar ones.")
    @Column(name = "index")
    private Integer index;

    /**
     * The order to use when displaying the elements contained in this part.
     */
    @NotNull
    @ApiModelProperty(value = "The order to use when displaying the elements contained in this part.", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_order", nullable = false)
    private ProfilePartOrderType order;

    @OneToMany(mappedBy = "simpleItems")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ProfilePartSimpleItem> profilePartSimpleItems = new HashSet<>();

    @OneToMany(mappedBy = "preciseItems")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ProfilePartPreciseItem> profilePartPreciseItems = new HashSet<>();

    @OneToMany(mappedBy = "skillCategories")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ProfilePartSkillCategory> profilePartSkillCategories = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "profileParts", allowSetters = true)
    private AppUserProfile categories;

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

    public ProfilePart title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ProfilePartType getType() {
        return type;
    }

    public ProfilePart type(ProfilePartType type) {
        this.type = type;
        return this;
    }

    public void setType(ProfilePartType type) {
        this.type = type;
    }

    public Integer getIndex() {
        return index;
    }

    public ProfilePart index(Integer index) {
        this.index = index;
        return this;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public ProfilePartOrderType getOrder() {
        return order;
    }

    public ProfilePart order(ProfilePartOrderType order) {
        this.order = order;
        return this;
    }

    public void setOrder(ProfilePartOrderType order) {
        this.order = order;
    }

    public Set<ProfilePartSimpleItem> getProfilePartSimpleItems() {
        return profilePartSimpleItems;
    }

    public ProfilePart profilePartSimpleItems(Set<ProfilePartSimpleItem> profilePartSimpleItems) {
        this.profilePartSimpleItems = profilePartSimpleItems;
        return this;
    }

    public ProfilePart addProfilePartSimpleItem(ProfilePartSimpleItem profilePartSimpleItem) {
        this.profilePartSimpleItems.add(profilePartSimpleItem);
        profilePartSimpleItem.setSimpleItems(this);
        return this;
    }

    public ProfilePart removeProfilePartSimpleItem(ProfilePartSimpleItem profilePartSimpleItem) {
        this.profilePartSimpleItems.remove(profilePartSimpleItem);
        profilePartSimpleItem.setSimpleItems(null);
        return this;
    }

    public void setProfilePartSimpleItems(Set<ProfilePartSimpleItem> profilePartSimpleItems) {
        this.profilePartSimpleItems = profilePartSimpleItems;
    }

    public Set<ProfilePartPreciseItem> getProfilePartPreciseItems() {
        return profilePartPreciseItems;
    }

    public ProfilePart profilePartPreciseItems(Set<ProfilePartPreciseItem> profilePartPreciseItems) {
        this.profilePartPreciseItems = profilePartPreciseItems;
        return this;
    }

    public ProfilePart addProfilePartPreciseItem(ProfilePartPreciseItem profilePartPreciseItem) {
        this.profilePartPreciseItems.add(profilePartPreciseItem);
        profilePartPreciseItem.setPreciseItems(this);
        return this;
    }

    public ProfilePart removeProfilePartPreciseItem(ProfilePartPreciseItem profilePartPreciseItem) {
        this.profilePartPreciseItems.remove(profilePartPreciseItem);
        profilePartPreciseItem.setPreciseItems(null);
        return this;
    }

    public void setProfilePartPreciseItems(Set<ProfilePartPreciseItem> profilePartPreciseItems) {
        this.profilePartPreciseItems = profilePartPreciseItems;
    }

    public Set<ProfilePartSkillCategory> getProfilePartSkillCategories() {
        return profilePartSkillCategories;
    }

    public ProfilePart profilePartSkillCategories(Set<ProfilePartSkillCategory> profilePartSkillCategories) {
        this.profilePartSkillCategories = profilePartSkillCategories;
        return this;
    }

    public ProfilePart addProfilePartSkillCategory(ProfilePartSkillCategory profilePartSkillCategory) {
        this.profilePartSkillCategories.add(profilePartSkillCategory);
        profilePartSkillCategory.setSkillCategories(this);
        return this;
    }

    public ProfilePart removeProfilePartSkillCategory(ProfilePartSkillCategory profilePartSkillCategory) {
        this.profilePartSkillCategories.remove(profilePartSkillCategory);
        profilePartSkillCategory.setSkillCategories(null);
        return this;
    }

    public void setProfilePartSkillCategories(Set<ProfilePartSkillCategory> profilePartSkillCategories) {
        this.profilePartSkillCategories = profilePartSkillCategories;
    }

    public AppUserProfile getCategories() {
        return categories;
    }

    public ProfilePart categories(AppUserProfile appUserProfile) {
        this.categories = appUserProfile;
        return this;
    }

    public void setCategories(AppUserProfile appUserProfile) {
        this.categories = appUserProfile;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProfilePart)) {
            return false;
        }
        return id != null && id.equals(((ProfilePart) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProfilePart{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", type='" + getType() + "'" +
            ", index=" + getIndex() +
            ", order='" + getOrder() + "'" +
            "}";
    }
}
