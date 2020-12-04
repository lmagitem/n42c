package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.n42c.domain.enumeration.Language;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * The content of a blog, in a specific language.
 */
@ApiModel(description = "The content of a blog, in a specific language.")
@Entity
@Table(name = "localized_blog")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LocalizedBlog implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * This blog's localized title.
     */
    @NotNull
    @ApiModelProperty(value = "This blog's localized title.", required = true)
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * This blog's language.
     */
    @NotNull
    @ApiModelProperty(value = "This blog's language.", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "language", nullable = false)
    private Language language;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "localizations", allowSetters = true)
    private Blog blog;

    public LocalizedBlog() {
    }

    public LocalizedBlog(Long id, @NotNull String name, @NotNull Language language, @NotNull Blog blog) {
        this.id = id;
        this.name = name;
        this.language = language;
        this.blog = blog;
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

    public LocalizedBlog name(String name) {
        this.name = name;
        return this;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public LocalizedBlog language(Language language) {
        this.language = language;
        return this;
    }

    public Blog getBlog() {
        return blog;
    }

    public void setBlog(Blog blog) {
        this.blog = blog;
    }

    public LocalizedBlog blog(Blog blog) {
        this.blog = blog;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LocalizedBlog)) {
            return false;
        }
        return id != null && id.equals(((LocalizedBlog) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LocalizedBlog{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
