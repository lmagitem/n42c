package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.n42c.domain.enumerations.Language;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * A LocalizedNinthStratagemGroup.
 */
@Entity
@Table(name = "localized_ninth_stratagem_grp")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LocalizedNinthStratagemGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "language", nullable = false)
    private Language language;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "localizations", allowSetters = true)
    private NinthStratagemGroup stratagemGroup;

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

    public LocalizedNinthStratagemGroup name(String name) {
        this.name = name;
        return this;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public LocalizedNinthStratagemGroup language(Language language) {
        this.language = language;
        return this;
    }

    public NinthStratagemGroup getStratagemGroup() {
        return stratagemGroup;
    }

    public void setStratagemGroup(NinthStratagemGroup ninthStratagemGroup) {
        this.stratagemGroup = ninthStratagemGroup;
    }

    public LocalizedNinthStratagemGroup stratagemGroup(NinthStratagemGroup ninthStratagemGroup) {
        this.stratagemGroup = ninthStratagemGroup;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LocalizedNinthStratagemGroup)) {
            return false;
        }
        return id != null && id.equals(((LocalizedNinthStratagemGroup) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LocalizedNinthStratagemGroup{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
