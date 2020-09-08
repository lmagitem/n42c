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

/**
 * A simple item to display in a profile part.
 */
@ApiModel(description = "A simple item to display in a profile part.")
@Entity
@Table(name = "profile_part_simple_item")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProfilePartSimpleItem implements Serializable {

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
     * This item's date. Might be used to order the items.
     */
    @NotNull
    @ApiModelProperty(value = "This item's date. Might be used to order the items.", required = true)
    @Column(name = "date", nullable = false)
    private Instant date;

    /**
     * This item's content.
     */
    @ApiModelProperty(value = "This item's content.")
    @Column(name = "content")
    private String content;

    @ManyToOne
    @JsonIgnoreProperties(value = "simpleItems", allowSetters = true)
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

    public ProfilePartSimpleItem title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubTitle() {
        return subTitle;
    }

    public ProfilePartSimpleItem subTitle(String subTitle) {
        this.subTitle = subTitle;
        return this;
    }

    public void setSubTitle(String subTitle) {
        this.subTitle = subTitle;
    }

    public Instant getDate() {
        return date;
    }

    public ProfilePartSimpleItem date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getContent() {
        return content;
    }

    public ProfilePartSimpleItem content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public ProfilePart getProfilePart() {
        return profilePart;
    }

    public ProfilePartSimpleItem profilePart(ProfilePart profilePart) {
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
        if (!(o instanceof ProfilePartSimpleItem)) {
            return false;
        }
        return id != null && id.equals(((ProfilePartSimpleItem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProfilePartSimpleItem{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", subTitle='" + getSubTitle() + "'" +
            ", date='" + getDate() + "'" +
            ", content='" + getContent() + "'" +
            "}";
    }
}
