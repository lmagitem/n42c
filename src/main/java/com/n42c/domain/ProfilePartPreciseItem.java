package com.n42c.domain;

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
 * A precise item to display in a profile part. Contains informations about the duration\nand the place where the item took place, and can be linked to several individual experiences.
 */
@ApiModel(description = "A precise item to display in a profile part. Contains informations about the duration\nand the place where the item took place, and can be linked to several individual experiences.")
@Entity
@Table(name = "profile_part_precise_item")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProfilePartPreciseItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @Column(name = "end")
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
    @Column(name = "content")
    private String content;

    @OneToMany(mappedBy = "experiences")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ProfilePartLinkedExperience> profilePartLinkedExperiences = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "profilePartPreciseItems", allowSetters = true)
    private ProfilePart preciseItems;

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

    public Set<ProfilePartLinkedExperience> getProfilePartLinkedExperiences() {
        return profilePartLinkedExperiences;
    }

    public ProfilePartPreciseItem profilePartLinkedExperiences(Set<ProfilePartLinkedExperience> profilePartLinkedExperiences) {
        this.profilePartLinkedExperiences = profilePartLinkedExperiences;
        return this;
    }

    public ProfilePartPreciseItem addProfilePartLinkedExperience(ProfilePartLinkedExperience profilePartLinkedExperience) {
        this.profilePartLinkedExperiences.add(profilePartLinkedExperience);
        profilePartLinkedExperience.setExperiences(this);
        return this;
    }

    public ProfilePartPreciseItem removeProfilePartLinkedExperience(ProfilePartLinkedExperience profilePartLinkedExperience) {
        this.profilePartLinkedExperiences.remove(profilePartLinkedExperience);
        profilePartLinkedExperience.setExperiences(null);
        return this;
    }

    public void setProfilePartLinkedExperiences(Set<ProfilePartLinkedExperience> profilePartLinkedExperiences) {
        this.profilePartLinkedExperiences = profilePartLinkedExperiences;
    }

    public ProfilePart getPreciseItems() {
        return preciseItems;
    }

    public ProfilePartPreciseItem preciseItems(ProfilePart profilePart) {
        this.preciseItems = profilePart;
        return this;
    }

    public void setPreciseItems(ProfilePart profilePart) {
        this.preciseItems = profilePart;
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
