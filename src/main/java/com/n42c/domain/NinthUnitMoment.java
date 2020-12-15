package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;

/**
 * A NinthUnitMoment.
 */
@Entity
@Table(name = "ninth_unit_moment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NinthUnitMoment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "current", nullable = false)
    private Boolean current;

    @NotNull
    @Column(name = "since_instant", nullable = false)
    private Instant sinceInstant;

    @Column(name = "picture_url")
    private String pictureUrl;

    @ManyToOne
    @JsonIgnoreProperties(value = "moments", allowSetters = true)
    private NinthUnit unit;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isCurrent() {
        return current;
    }

    public NinthUnitMoment current(Boolean current) {
        this.current = current;
        return this;
    }

    public void setCurrent(Boolean current) {
        this.current = current;
    }

    public Instant getSinceInstant() {
        return sinceInstant;
    }

    public void setSinceInstant(Instant sinceInstant) {
        this.sinceInstant = sinceInstant;
    }

    public NinthUnitMoment sinceInstant(Instant sinceInstant) {
        this.sinceInstant = sinceInstant;
        return this;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public NinthUnitMoment pictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
        return this;
    }

    public NinthUnit getUnit() {
        return unit;
    }

    public void setUnit(NinthUnit ninthUnit) {
        this.unit = ninthUnit;
    }

    public NinthUnitMoment unit(NinthUnit ninthUnit) {
        this.unit = ninthUnit;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NinthUnitMoment)) {
            return false;
        }
        return id != null && id.equals(((NinthUnitMoment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NinthUnitMoment{" +
            "id=" + getId() +
            ", current='" + isCurrent() + "'" +
            ", sinceInstant='" + getSinceInstant() + "'" +
            ", pictureUrl='" + getPictureUrl() + "'" +
            "}";
    }
}
