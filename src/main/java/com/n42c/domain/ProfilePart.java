package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.n42c.domain.enumeration.ProfilePartOrderType;
import com.n42c.domain.enumeration.ProfilePartType;
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

    @OneToMany(mappedBy = "profilePart")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ProfilePartSimpleItem> simpleItems = new HashSet<>();

    @OneToMany(mappedBy = "profilePart")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ProfilePartPreciseItem> preciseItems = new HashSet<>();

    @OneToMany(mappedBy = "profilePart")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ProfilePartSkillCategory> skillCategories = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "profileParts", allowSetters = true)
    private AppUserProfile profile;

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

    public ProfilePart title(String title) {
        this.title = title;
        return this;
    }

    public ProfilePartType getType() {
        return type;
    }

    public void setType(ProfilePartType type) {
        this.type = type;
    }

    public ProfilePart type(ProfilePartType type) {
        this.type = type;
        return this;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public ProfilePart index(Integer index) {
        this.index = index;
        return this;
    }

    public ProfilePartOrderType getOrder() {
        return order;
    }

    public void setOrder(ProfilePartOrderType order) {
        this.order = order;
    }

    public ProfilePart order(ProfilePartOrderType order) {
        this.order = order;
        return this;
    }

    public Set<ProfilePartSimpleItem> getSimpleItems() {
        return simpleItems;
    }

    public void setSimpleItems(Set<ProfilePartSimpleItem> profilePartSimpleItems) {
        this.simpleItems = profilePartSimpleItems;
    }

    public ProfilePart simpleItems(Set<ProfilePartSimpleItem> profilePartSimpleItems) {
        this.simpleItems = profilePartSimpleItems;
        return this;
    }

    public ProfilePart addSimpleItems(ProfilePartSimpleItem profilePartSimpleItem) {
        this.simpleItems.add(profilePartSimpleItem);
        profilePartSimpleItem.setProfilePart(this);
        return this;
    }

    public ProfilePart removeSimpleItems(ProfilePartSimpleItem profilePartSimpleItem) {
        this.simpleItems.remove(profilePartSimpleItem);
        profilePartSimpleItem.setProfilePart(null);
        return this;
    }

    public Set<ProfilePartPreciseItem> getPreciseItems() {
        return preciseItems;
    }

    public void setPreciseItems(Set<ProfilePartPreciseItem> profilePartPreciseItems) {
        this.preciseItems = profilePartPreciseItems;
    }

    public ProfilePart preciseItems(Set<ProfilePartPreciseItem> profilePartPreciseItems) {
        this.preciseItems = profilePartPreciseItems;
        return this;
    }

    public ProfilePart addPreciseItems(ProfilePartPreciseItem profilePartPreciseItem) {
        this.preciseItems.add(profilePartPreciseItem);
        profilePartPreciseItem.setProfilePart(this);
        return this;
    }

    public ProfilePart removePreciseItems(ProfilePartPreciseItem profilePartPreciseItem) {
        this.preciseItems.remove(profilePartPreciseItem);
        profilePartPreciseItem.setProfilePart(null);
        return this;
    }

    public Set<ProfilePartSkillCategory> getSkillCategories() {
        return skillCategories;
    }

    public void setSkillCategories(Set<ProfilePartSkillCategory> profilePartSkillCategories) {
        this.skillCategories = profilePartSkillCategories;
    }

    public ProfilePart skillCategories(Set<ProfilePartSkillCategory> profilePartSkillCategories) {
        this.skillCategories = profilePartSkillCategories;
        return this;
    }

    public ProfilePart addSkillCategories(ProfilePartSkillCategory profilePartSkillCategory) {
        this.skillCategories.add(profilePartSkillCategory);
        profilePartSkillCategory.setProfilePart(this);
        return this;
    }

    public ProfilePart removeSkillCategories(ProfilePartSkillCategory profilePartSkillCategory) {
        this.skillCategories.remove(profilePartSkillCategory);
        profilePartSkillCategory.setProfilePart(null);
        return this;
    }

    public AppUserProfile getProfile() {
        return profile;
    }

    public void setProfile(AppUserProfile appUserProfile) {
        this.profile = appUserProfile;
    }

    public ProfilePart profile(AppUserProfile appUserProfile) {
        this.profile = appUserProfile;
        return this;
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
