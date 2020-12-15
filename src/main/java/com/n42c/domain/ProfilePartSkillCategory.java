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
 * A category in which to display various skills with their levels.
 */
@ApiModel(description = "A category in which to display various skills with their levels.")
@Entity
@Table(name = "profile_part_skill_category")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProfilePartSkillCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * This category's title.
     */
    @NotNull
    @ApiModelProperty(value = "This category's title.", required = true)
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * The index where this item must be ordered alongside similar ones.
     */
    @ApiModelProperty(value = "The index where this item must be ordered alongside similar ones.")
    @Column(name = "index")
    private Integer index;

    @OneToMany(mappedBy = "skillCategory")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ProfilePartSkill> skills = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "skillCategories", allowSetters = true)
    private ProfilePart profilePart;

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

    public ProfilePartSkillCategory name(String name) {
        this.name = name;
        return this;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public ProfilePartSkillCategory index(Integer index) {
        this.index = index;
        return this;
    }

    public Set<ProfilePartSkill> getSkills() {
        return skills;
    }

    public void setSkills(Set<ProfilePartSkill> profilePartSkills) {
        this.skills = profilePartSkills;
    }

    public ProfilePartSkillCategory skills(Set<ProfilePartSkill> profilePartSkills) {
        this.skills = profilePartSkills;
        return this;
    }

    public ProfilePartSkillCategory addSkills(ProfilePartSkill profilePartSkill) {
        this.skills.add(profilePartSkill);
        profilePartSkill.setSkillCategory(this);
        return this;
    }

    public ProfilePartSkillCategory removeSkills(ProfilePartSkill profilePartSkill) {
        this.skills.remove(profilePartSkill);
        profilePartSkill.setSkillCategory(null);
        return this;
    }

    public ProfilePart getProfilePart() {
        return profilePart;
    }

    public void setProfilePart(ProfilePart profilePart) {
        this.profilePart = profilePart;
    }

    public ProfilePartSkillCategory profilePart(ProfilePart profilePart) {
        this.profilePart = profilePart;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProfilePartSkillCategory)) {
            return false;
        }
        return id != null && id.equals(((ProfilePartSkillCategory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProfilePartSkillCategory{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", index=" + getIndex() +
            "}";
    }
}
