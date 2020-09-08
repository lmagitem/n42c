package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

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

    @ManyToOne
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

    public LocalizedNinthStratagemGroup name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public NinthStratagemGroup getStratagemGroup() {
        return stratagemGroup;
    }

    public LocalizedNinthStratagemGroup stratagemGroup(NinthStratagemGroup ninthStratagemGroup) {
        this.stratagemGroup = ninthStratagemGroup;
        return this;
    }

    public void setStratagemGroup(NinthStratagemGroup ninthStratagemGroup) {
        this.stratagemGroup = ninthStratagemGroup;
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
            "}";
    }
}
