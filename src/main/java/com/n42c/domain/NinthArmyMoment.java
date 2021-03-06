package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A NinthArmyMoment.
 */
@Entity
@Table(name = "ninth_army_moment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NinthArmyMoment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "current", nullable = false)
    private Boolean current;

    @Column(name = "major_victories")
    private Integer majorVictories;

    @Column(name = "minor_victories")
    private Integer minorVictories;

    @Column(name = "draws")
    private Integer draws;

    @Column(name = "minor_defeats")
    private Integer minorDefeats;

    @Column(name = "major_defeats")
    private Integer majorDefeats;

    @Column(name = "requisition")
    private Integer requisition;

    @Column(name = "supply_limit")
    private Integer supplyLimit;

    @Column(name = "supply_used")
    private Integer supplyUsed;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "objectives")
    private String objectives;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "notes")
    private String notes;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "ninth_army_moment_selected_units",
        joinColumns = @JoinColumn(name = "ninth_army_moment_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "selected_units_id", referencedColumnName = "id"))
    private Set<NinthArmyUnit> selectedUnits = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "ninth_army_moment_selected_objectives",
        joinColumns = @JoinColumn(name = "ninth_army_moment_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "selected_objectives_id", referencedColumnName = "id"))
    private Set<NinthObjective> selectedObjectives = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "armies", allowSetters = true)
    private NinthBattle battle;

    @ManyToOne
    @JsonIgnoreProperties(value = "moments", allowSetters = true)
    private NinthArmy army;

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

    public NinthArmyMoment current(Boolean current) {
        this.current = current;
        return this;
    }

    public void setCurrent(Boolean current) {
        this.current = current;
    }

    public Integer getMajorVictories() {
        return majorVictories;
    }

    public void setMajorVictories(Integer majorVictories) {
        this.majorVictories = majorVictories;
    }

    public NinthArmyMoment majorVictories(Integer majorVictories) {
        this.majorVictories = majorVictories;
        return this;
    }

    public Integer getMinorVictories() {
        return minorVictories;
    }

    public void setMinorVictories(Integer minorVictories) {
        this.minorVictories = minorVictories;
    }

    public NinthArmyMoment minorVictories(Integer minorVictories) {
        this.minorVictories = minorVictories;
        return this;
    }

    public Integer getDraws() {
        return draws;
    }

    public void setDraws(Integer draws) {
        this.draws = draws;
    }

    public NinthArmyMoment draws(Integer draws) {
        this.draws = draws;
        return this;
    }

    public Integer getMinorDefeats() {
        return minorDefeats;
    }

    public void setMinorDefeats(Integer minorDefeats) {
        this.minorDefeats = minorDefeats;
    }

    public NinthArmyMoment minorDefeats(Integer minorDefeats) {
        this.minorDefeats = minorDefeats;
        return this;
    }

    public Integer getMajorDefeats() {
        return majorDefeats;
    }

    public void setMajorDefeats(Integer majorDefeats) {
        this.majorDefeats = majorDefeats;
    }

    public NinthArmyMoment majorDefeats(Integer majorDefeats) {
        this.majorDefeats = majorDefeats;
        return this;
    }

    public Integer getRequisition() {
        return requisition;
    }

    public void setRequisition(Integer requisition) {
        this.requisition = requisition;
    }

    public NinthArmyMoment requisition(Integer requisition) {
        this.requisition = requisition;
        return this;
    }

    public Integer getSupplyLimit() {
        return supplyLimit;
    }

    public void setSupplyLimit(Integer supplyLimit) {
        this.supplyLimit = supplyLimit;
    }

    public NinthArmyMoment supplyLimit(Integer supplyLimit) {
        this.supplyLimit = supplyLimit;
        return this;
    }

    public Integer getSupplyUsed() {
        return supplyUsed;
    }

    public void setSupplyUsed(Integer supplyUsed) {
        this.supplyUsed = supplyUsed;
    }

    public NinthArmyMoment supplyUsed(Integer supplyUsed) {
        this.supplyUsed = supplyUsed;
        return this;
    }

    public String getObjectives() {
        return objectives;
    }

    public void setObjectives(String objectives) {
        this.objectives = objectives;
    }

    public NinthArmyMoment objectives(String objectives) {
        this.objectives = objectives;
        return this;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public NinthArmyMoment notes(String notes) {
        this.notes = notes;
        return this;
    }

    public Set<NinthArmyUnit> getSelectedUnits() {
        return selectedUnits;
    }

    public void setSelectedUnits(Set<NinthArmyUnit> ninthArmyUnits) {
        this.selectedUnits = ninthArmyUnits;
    }

    public NinthArmyMoment selectedUnits(Set<NinthArmyUnit> ninthArmyUnits) {
        this.selectedUnits = ninthArmyUnits;
        return this;
    }

    public NinthArmyMoment addSelectedUnits(NinthArmyUnit ninthArmyUnit) {
        this.selectedUnits.add(ninthArmyUnit);
        ninthArmyUnit.getSelections().add(this);
        return this;
    }

    public NinthArmyMoment removeSelectedUnits(NinthArmyUnit ninthArmyUnit) {
        this.selectedUnits.remove(ninthArmyUnit);
        ninthArmyUnit.getSelections().remove(this);
        return this;
    }

    public Set<NinthObjective> getSelectedObjectives() {
        return selectedObjectives;
    }

    public void setSelectedObjectives(Set<NinthObjective> ninthObjectives) {
        this.selectedObjectives = ninthObjectives;
    }

    public NinthArmyMoment selectedObjectives(Set<NinthObjective> ninthObjectives) {
        this.selectedObjectives = ninthObjectives;
        return this;
    }

    public NinthArmyMoment addSelectedObjectives(NinthObjective ninthObjective) {
        this.selectedObjectives.add(ninthObjective);
        ninthObjective.getSelections().add(this);
        return this;
    }

    public NinthArmyMoment removeSelectedObjectives(NinthObjective ninthObjective) {
        this.selectedObjectives.remove(ninthObjective);
        ninthObjective.getSelections().remove(this);
        return this;
    }

    public NinthBattle getBattle() {
        return battle;
    }

    public void setBattle(NinthBattle ninthBattle) {
        this.battle = ninthBattle;
    }

    public NinthArmyMoment battle(NinthBattle ninthBattle) {
        this.battle = ninthBattle;
        return this;
    }

    public NinthArmy getArmy() {
        return army;
    }

    public void setArmy(NinthArmy ninthArmy) {
        this.army = ninthArmy;
    }

    public NinthArmyMoment army(NinthArmy ninthArmy) {
        this.army = ninthArmy;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NinthArmyMoment)) {
            return false;
        }
        return id != null && id.equals(((NinthArmyMoment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NinthArmyMoment{" +
            "id=" + getId() +
            ", current='" + isCurrent() + "'" +
            ", majorVictories=" + getMajorVictories() +
            ", minorVictories=" + getMinorVictories() +
            ", draws=" + getDraws() +
            ", minorDefeats=" + getMinorDefeats() +
            ", majorDefeats=" + getMajorDefeats() +
            ", requisition=" + getRequisition() +
            ", supplyLimit=" + getSupplyLimit() +
            ", supplyUsed=" + getSupplyUsed() +
            ", objectives='" + getObjectives() + "'" +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
