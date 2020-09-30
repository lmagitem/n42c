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
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A precise item to display in a profile part. Contains informations about the duration\nand the place where the item took place, and can be linked to several individual experiences.
 */
@ApiModel(description = "A precise item to display in a profile part. Contains informations about the duration\nand the place where the item took place, and can be linked to several individual experiences.")
@Entity
@Table(name = "profile_part_precise_item")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProfilePartPreciseItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * This item's title.
     */
    @NotNull
    @ApiModelProperty(value = "This item's title.", required = true)
    @Column(name = "title", nullable = false)
    private String title;

    /**
     * This item's subtitle
     */
    @ApiModelProperty(value = "This item's subtitle")
    @Column(name = "sub_title")
    private String subTitle;

    /**
     * This item's beginning date.
     */
    @NotNull
    @ApiModelProperty(value = "This item's beginning date.", required = true)
    @Column(name = "start", nullable = false)
    private Instant start;

    /**
     * This item's end date.
     */
    @ApiModelProperty(value = "This item's end date.")
    @Column(name = "jhi_end")
    private Instant end;

    /**
     * This item's location name.
     */
    @ApiModelProperty(value = "This item's location name.")
    @Column(name = "location_name")
    private String locationName;

    /**
     * This item's location latitude.
     */
    @ApiModelProperty(value = "This item's location latitude.")
    @Column(name = "location_lat")
    private Double locationLat;

    /**
     * This item's location longitude.
     */
    @ApiModelProperty(value = "This item's location longitude.")
    @Column(name = "location_long")
    private Double locationLong;

    /**
     * This item's content.
     */
    @ApiModelProperty(value = "This item's content.")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "content")
    private String content;

    @OneToMany(mappedBy = "linkedItem")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ProfilePartLinkedExperience> experiences = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "preciseItems", allowSetters = true)
    private ProfilePart profilePart;

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

    public ProfilePartPreciseItem title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubTitle() {
        return subTitle;
    }

    public ProfilePartPreciseItem subTitle(String subTitle) {
        this.subTitle = subTitle;
        return this;
    }

    public void setSubTitle(String subTitle) {
        this.subTitle = subTitle;
    }

    public Instant getStart() {
        return start;
    }

    public ProfilePartPreciseItem start(Instant start) {
        this.start = start;
        return this;
    }

    public void setStart(Instant start) {
        this.start = start;
    }

    public Instant getEnd() {
        return end;
    }

    public ProfilePartPreciseItem end(Instant end) {
        this.end = end;
        return this;
    }

    public void setEnd(Instant end) {
        this.end = end;
    }

    public String getLocationName() {
        return locationName;
    }

    public ProfilePartPreciseItem locationName(String locationName) {
        this.locationName = locationName;
        return this;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public Double getLocationLat() {
        return locationLat;
    }

    public ProfilePartPreciseItem locationLat(Double locationLat) {
        this.locationLat = locationLat;
        return this;
    }

    public void setLocationLat(Double locationLat) {
        this.locationLat = locationLat;
    }

    public Double getLocationLong() {
        return locationLong;
    }

    public ProfilePartPreciseItem locationLong(Double locationLong) {
        this.locationLong = locationLong;
        return this;
    }

    public void setLocationLong(Double locationLong) {
        this.locationLong = locationLong;
    }

    public String getContent() {
        return content;
    }

    public ProfilePartPreciseItem content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Set<ProfilePartLinkedExperience> getExperiences() {
        return experiences;
    }

    public ProfilePartPreciseItem experiences(Set<ProfilePartLinkedExperience> profilePartLinkedExperiences) {
        this.experiences = profilePartLinkedExperiences;
        return this;
    }

    public ProfilePartPreciseItem addExperiences(ProfilePartLinkedExperience profilePartLinkedExperience) {
        this.experiences.add(profilePartLinkedExperience);
        profilePartLinkedExperience.setLinkedItem(this);
        return this;
    }

    public ProfilePartPreciseItem removeExperiences(ProfilePartLinkedExperience profilePartLinkedExperience) {
        this.experiences.remove(profilePartLinkedExperience);
        profilePartLinkedExperience.setLinkedItem(null);
        return this;
    }

    public void setExperiences(Set<ProfilePartLinkedExperience> profilePartLinkedExperiences) {
        this.experiences = profilePartLinkedExperiences;
    }

    public ProfilePart getProfilePart() {
        return profilePart;
    }

    public ProfilePartPreciseItem profilePart(ProfilePart profilePart) {
        this.profilePart = profilePart;
        return this;
    }

    public void setProfilePart(ProfilePart profilePart) {
        this.profilePart = profilePart;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProfilePartPreciseItem)) {
            return false;
        }
        return id != null && id.equals(((ProfilePartPreciseItem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProfilePartPreciseItem{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", subTitle='" + getSubTitle() + "'" +
            ", start='" + getStart() + "'" +
            ", end='" + getEnd() + "'" +
            ", locationName='" + getLocationName() + "'" +
            ", locationLat=" + getLocationLat() +
            ", locationLong=" + getLocationLong() +
            ", content='" + getContent() + "'" +
            "}";
    }
}
