package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.n42c.domain.enumerations.Language;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * The localization for this category
 */
@ApiModel(description = "The localization for this category")
@Entity
@Table(name = "localized_blog_category")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LocalizedBlogCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * This category's localized name.
     */
    @NotNull
    @ApiModelProperty(value = "This category's localized name.", required = true)
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * This category's language.
     */
    @NotNull
    @ApiModelProperty(value = "This category's language.", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "language", nullable = false)
    private Language language;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "localizations", allowSetters = true)
    private BlogCategory category;

    public LocalizedBlogCategory() {
    }

    public LocalizedBlogCategory(Long id, @NotNull String name, @NotNull Language language) {
        this.id = id;
        this.name = name;
        this.language = language;
    }

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

    public LocalizedBlogCategory name(String name) {
        this.name = name;
        return this;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public LocalizedBlogCategory language(Language language) {
        this.language = language;
        return this;
    }

    public BlogCategory getCategory() {
        return category;
    }

    public void setCategory(BlogCategory blogCategory) {
        this.category = blogCategory;
    }

    public LocalizedBlogCategory category(BlogCategory blogCategory) {
        this.category = blogCategory;
        return this;
    }
// jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LocalizedBlogCategory)) {
            return false;
        }
        return id != null && id.equals(((LocalizedBlogCategory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LocalizedBlogCategory{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
