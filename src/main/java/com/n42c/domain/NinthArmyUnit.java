package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A NinthArmyUnit.
 */
@Entity
@Table(name = "ninth_army_unit")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NinthArmyUnit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "selectable_keywords")
    private String selectableKeywords;

    @OneToMany(mappedBy = "armyUnit")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<NinthArmyUnitMoment> moments = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "units", allowSetters = true)
    private NinthArmy army;

    @ManyToOne
    @JsonIgnoreProperties(value = "selections", allowSetters = true)
    private NinthUnit unit;

    @ManyToMany(mappedBy = "selectedUnits")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<NinthArmyMoment> selections = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSelectableKeywords() {
        return selectableKeywords;
    }

    public NinthArmyUnit selectableKeywords(String selectableKeywords) {
        this.selectableKeywords = selectableKeywords;
        return this;
    }

    public void setSelectableKeywords(String selectableKeywords) {
        this.selectableKeywords = selectableKeywords;
    }

    public Set<NinthArmyUnitMoment> getMoments() {
        return moments;
    }

    public NinthArmyUnit moments(Set<NinthArmyUnitMoment> ninthArmyUnitMoments) {
        this.moments = ninthArmyUnitMoments;
        return this;
    }

    public NinthArmyUnit addMoments(NinthArmyUnitMoment ninthArmyUnitMoment) {
        this.moments.add(ninthArmyUnitMoment);
        ninthArmyUnitMoment.setArmyUnit(this);
        return this;
    }

    public NinthArmyUnit removeMoments(NinthArmyUnitMoment ninthArmyUnitMoment) {
        this.moments.remove(ninthArmyUnitMoment);
        ninthArmyUnitMoment.setArmyUnit(null);
        return this;
    }

    public void setMoments(Set<NinthArmyUnitMoment> ninthArmyUnitMoments) {
        this.moments = ninthArmyUnitMoments;
    }

    public NinthArmy getArmy() {
        return army;
    }

    public NinthArmyUnit army(NinthArmy ninthArmy) {
        this.army = ninthArmy;
        return this;
    }

    public void setArmy(NinthArmy ninthArmy) {
        this.army = ninthArmy;
    }

    public NinthUnit getUnit() {
        return unit;
    }

    public NinthArmyUnit unit(NinthUnit ninthUnit) {
        this.unit = ninthUnit;
        return this;
    }

    public void setUnit(NinthUnit ninthUnit) {
        this.unit = ninthUnit;
    }

    public Set<NinthArmyMoment> getSelections() {
        return selections;
    }

    public NinthArmyUnit selections(Set<NinthArmyMoment> ninthArmyMoments) {
        this.selections = ninthArmyMoments;
        return this;
    }

    public NinthArmyUnit addSelections(NinthArmyMoment ninthArmyMoment) {
        this.selections.add(ninthArmyMoment);
        ninthArmyMoment.getSelectedUnits().add(this);
        return this;
    }

    public NinthArmyUnit removeSelections(NinthArmyMoment ninthArmyMoment) {
        this.selections.remove(ninthArmyMoment);
        ninthArmyMoment.getSelectedUnits().remove(this);
        return this;
    }

    public void setSelections(Set<NinthArmyMoment> ninthArmyMoments) {
        this.selections = ninthArmyMoments;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NinthArmyUnit)) {
            return false;
        }
        return id != null && id.equals(((NinthArmyUnit) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NinthArmyUnit{" +
            "id=" + getId() +
            ", selectableKeywords='" + getSelectableKeywords() + "'" +
            "}";
    }
}
