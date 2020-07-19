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

import com.n42c.domain.enumeration.LevelOfMastery;

/**
 * A skill with its level of mastery.
 */
@ApiModel(description = "A skill with its level of mastery.")
@Entity
@Table(name = "profile_part_skill")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProfilePartSkill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * This skill's name.
     */
    @NotNull
    @ApiModelProperty(value = "This skill's name.", required = true)
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * The index where this item must be ordered alongside similar ones.
     */
    @ApiModelProperty(value = "The index where this item must be ordered alongside similar ones.")
    @Column(name = "index")
    private Integer index;

    /**
     * This skill's level of mastery.
     */
    @NotNull
    @ApiModelProperty(value = "This skill's level of mastery.", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "level", nullable = false)
    private LevelOfMastery level;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "profile_part_skill_linked_skills",
               joinColumns = @JoinColumn(name = "profile_part_skill_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "linked_skills_id", referencedColumnName = "id"))
    private Set<ProfilePartLinkedExperience> linkedSkills = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "profilePartSkills", allowSetters = true)
    private ProfilePartSkillCategory skills;

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

    public ProfilePartSkill name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getIndex() {
        return index;
    }

    public ProfilePartSkill index(Integer index) {
        this.index = index;
        return this;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public LevelOfMastery getLevel() {
        return level;
    }

    public ProfilePartSkill level(LevelOfMastery level) {
        this.level = level;
        return this;
    }

    public void setLevel(LevelOfMastery level) {
        this.level = level;
    }

    public Set<ProfilePartLinkedExperience> getLinkedSkills() {
        return linkedSkills;
    }

    public ProfilePartSkill linkedSkills(Set<ProfilePartLinkedExperience> profilePartLinkedExperiences) {
        this.linkedSkills = profilePartLinkedExperiences;
        return this;
    }

    public ProfilePartSkill addLinkedSkills(ProfilePartLinkedExperience profilePartLinkedExperience) {
        this.linkedSkills.add(profilePartLinkedExperience);
        profilePartLinkedExperience.getLinkedExperiences().add(this);
        return this;
    }

    public ProfilePartSkill removeLinkedSkills(ProfilePartLinkedExperience profilePartLinkedExperience) {
        this.linkedSkills.remove(profilePartLinkedExperience);
        profilePartLinkedExperience.getLinkedExperiences().remove(this);
        return this;
    }

    public void setLinkedSkills(Set<ProfilePartLinkedExperience> profilePartLinkedExperiences) {
        this.linkedSkills = profilePartLinkedExperiences;
    }

    public ProfilePartSkillCategory getSkills() {
        return skills;
    }

    public ProfilePartSkill skills(ProfilePartSkillCategory profilePartSkillCategory) {
        this.skills = profilePartSkillCategory;
        return this;
    }

    public void setSkills(ProfilePartSkillCategory profilePartSkillCategory) {
        this.skills = profilePartSkillCategory;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProfilePartSkill)) {
            return false;
        }
        return id != null && id.equals(((ProfilePartSkill) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProfilePartSkill{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", index=" + getIndex() +
            ", level='" + getLevel() + "'" +
            "}";
    }
}
