package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * An individual experience that can be linked to a precise item.
 */
@ApiModel(description = "An individual experience that can be linked to a precise item.")
@Entity
@Table(name = "profile_part_linked_experience")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProfilePartLinkedExperience implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * This experience's title.
     */
    @NotNull
    @ApiModelProperty(value = "This experience's title.", required = true)
    @Column(name = "title", nullable = false)
    private String title;

    /**
     * This experience's subtitle
     */
    @ApiModelProperty(value = "This experience's subtitle")
    @Column(name = "sub_title")
    private String subTitle;

    /**
     * This experience's date.
     */
    @NotNull
    @ApiModelProperty(value = "This experience's date.", required = true)
    @Column(name = "date", nullable = false)
    private Instant date;

    /**
     * This experience's content.
     */
    @ApiModelProperty(value = "This experience's content.")
    @Column(name = "content")
    private String content;

    @ManyToOne
    @JsonIgnoreProperties(value = "experiences", allowSetters = true)
    private ProfilePartPreciseItem linkedItem;

    @ManyToMany(mappedBy = "linkedSkills")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<ProfilePartSkill> linkedExperiences = new HashSet<>();

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

    public ProfilePartLinkedExperience title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubTitle() {
        return subTitle;
    }

    public ProfilePartLinkedExperience subTitle(String subTitle) {
        this.subTitle = subTitle;
        return this;
    }

    public void setSubTitle(String subTitle) {
        this.subTitle = subTitle;
    }

    public Instant getDate() {
        return date;
    }

    public ProfilePartLinkedExperience date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getContent() {
        return content;
    }

    public ProfilePartLinkedExperience content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public ProfilePartPreciseItem getLinkedItem() {
        return linkedItem;
    }

    public ProfilePartLinkedExperience linkedItem(ProfilePartPreciseItem profilePartPreciseItem) {
        this.linkedItem = profilePartPreciseItem;
        return this;
    }

    public void setLinkedItem(ProfilePartPreciseItem profilePartPreciseItem) {
        this.linkedItem = profilePartPreciseItem;
    }

    public Set<ProfilePartSkill> getLinkedExperiences() {
        return linkedExperiences;
    }

    public ProfilePartLinkedExperience linkedExperiences(Set<ProfilePartSkill> profilePartSkills) {
        this.linkedExperiences = profilePartSkills;
        return this;
    }

    public ProfilePartLinkedExperience addLinkedExperiences(ProfilePartSkill profilePartSkill) {
        this.linkedExperiences.add(profilePartSkill);
        profilePartSkill.getLinkedSkills().add(this);
        return this;
    }

    public ProfilePartLinkedExperience removeLinkedExperiences(ProfilePartSkill profilePartSkill) {
        this.linkedExperiences.remove(profilePartSkill);
        profilePartSkill.getLinkedSkills().remove(this);
        return this;
    }

    public void setLinkedExperiences(Set<ProfilePartSkill> profilePartSkills) {
        this.linkedExperiences = profilePartSkills;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProfilePartLinkedExperience)) {
            return false;
        }
        return id != null && id.equals(((ProfilePartLinkedExperience) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProfilePartLinkedExperience{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", subTitle='" + getSubTitle() + "'" +
            ", date='" + getDate() + "'" +
            ", content='" + getContent() + "'" +
            "}";
    }
}
