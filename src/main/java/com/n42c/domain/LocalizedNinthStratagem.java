package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.n42c.domain.enumeration.Language;

/**
 * A LocalizedNinthStratagem.
 */
@Entity
@Table(name = "localized_ninth_stratagem")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LocalizedNinthStratagem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "summary")
    private String summary;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "description")
    private String description;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "keywords")
    private String keywords;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "language", nullable = false)
    private Language language;

    @ManyToOne
    @JsonIgnoreProperties(value = "localizations", allowSetters = true)
    private NinthStratagem stratagem;

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

    public LocalizedNinthStratagem name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSummary() {
        return summary;
    }

    public LocalizedNinthStratagem summary(String summary) {
        this.summary = summary;
        return this;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDescription() {
        return description;
    }

    public LocalizedNinthStratagem description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getKeywords() {
        return keywords;
    }

    public LocalizedNinthStratagem keywords(String keywords) {
        this.keywords = keywords;
        return this;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public Language getLanguage() {
        return language;
    }

    public LocalizedNinthStratagem language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public NinthStratagem getStratagem() {
        return stratagem;
    }

    public LocalizedNinthStratagem stratagem(NinthStratagem ninthStratagem) {
        this.stratagem = ninthStratagem;
        return this;
    }

    public void setStratagem(NinthStratagem ninthStratagem) {
        this.stratagem = ninthStratagem;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LocalizedNinthStratagem)) {
            return false;
        }
        return id != null && id.equals(((LocalizedNinthStratagem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LocalizedNinthStratagem{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", summary='" + getSummary() + "'" +
            ", description='" + getDescription() + "'" +
            ", keywords='" + getKeywords() + "'" +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
