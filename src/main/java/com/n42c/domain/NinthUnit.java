package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.n42c.domain.enumerations.Faction;
import com.n42c.domain.enumerations.NinthBattlefieldRole;
import com.n42c.domain.enumerations.SubFaction;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A NinthUnit.
 */
@Entity
@Table(name = "ninth_unit")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NinthUnit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "datasheet")
    private String datasheet;

    @Enumerated(EnumType.STRING)
    @Column(name = "faction")
    private Faction faction;

    @Enumerated(EnumType.STRING)
    @Column(name = "subfaction")
    private SubFaction subfaction;

    @Enumerated(EnumType.STRING)
    @Column(name = "battlefield_role")
    private NinthBattlefieldRole battlefieldRole;

    @Column(name = "keywords")
    private String keywords;

    @OneToMany(mappedBy = "unit")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<NinthArmyUnit> selections = new HashSet<>();

    @OneToMany(mappedBy = "unit")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<NinthUnitMoment> moments = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "collections", allowSetters = true)
    private Player owner;

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

    public NinthUnit name(String name) {
        this.name = name;
        return this;
    }

    public String getDatasheet() {
        return datasheet;
    }

    public void setDatasheet(String datasheet) {
        this.datasheet = datasheet;
    }

    public NinthUnit datasheet(String datasheet) {
        this.datasheet = datasheet;
        return this;
    }

    public Faction getFaction() {
        return faction;
    }

    public void setFaction(Faction faction) {
        this.faction = faction;
    }

    public NinthUnit faction(Faction faction) {
        this.faction = faction;
        return this;
    }

    public SubFaction getSubfaction() {
        return subfaction;
    }

    public void setSubfaction(SubFaction subfaction) {
        this.subfaction = subfaction;
    }

    public NinthUnit subfaction(SubFaction subfaction) {
        this.subfaction = subfaction;
        return this;
    }

    public NinthBattlefieldRole getBattlefieldRole() {
        return battlefieldRole;
    }

    public void setBattlefieldRole(NinthBattlefieldRole battlefieldRole) {
        this.battlefieldRole = battlefieldRole;
    }

    public NinthUnit battlefieldRole(NinthBattlefieldRole battlefieldRole) {
        this.battlefieldRole = battlefieldRole;
        return this;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public NinthUnit keywords(String keywords) {
        this.keywords = keywords;
        return this;
    }

    public Set<NinthArmyUnit> getSelections() {
        return selections;
    }

    public void setSelections(Set<NinthArmyUnit> ninthArmyUnits) {
        this.selections = ninthArmyUnits;
    }

    public NinthUnit selections(Set<NinthArmyUnit> ninthArmyUnits) {
        this.selections = ninthArmyUnits;
        return this;
    }

    public NinthUnit addSelections(NinthArmyUnit ninthArmyUnit) {
        this.selections.add(ninthArmyUnit);
        ninthArmyUnit.setUnit(this);
        return this;
    }

    public NinthUnit removeSelections(NinthArmyUnit ninthArmyUnit) {
        this.selections.remove(ninthArmyUnit);
        ninthArmyUnit.setUnit(null);
        return this;
    }

    public Set<NinthUnitMoment> getMoments() {
        return moments;
    }

    public void setMoments(Set<NinthUnitMoment> ninthUnitMoments) {
        this.moments = ninthUnitMoments;
    }

    public NinthUnit moments(Set<NinthUnitMoment> ninthUnitMoments) {
        this.moments = ninthUnitMoments;
        return this;
    }

    public NinthUnit addMoments(NinthUnitMoment ninthUnitMoment) {
        this.moments.add(ninthUnitMoment);
        ninthUnitMoment.setUnit(this);
        return this;
    }

    public NinthUnit removeMoments(NinthUnitMoment ninthUnitMoment) {
        this.moments.remove(ninthUnitMoment);
        ninthUnitMoment.setUnit(null);
        return this;
    }

    public Player getOwner() {
        return owner;
    }

    public void setOwner(Player player) {
        this.owner = player;
    }

    public NinthUnit owner(Player player) {
        this.owner = player;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NinthUnit)) {
            return false;
        }
        return id != null && id.equals(((NinthUnit) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NinthUnit{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", datasheet='" + getDatasheet() + "'" +
            ", faction='" + getFaction() + "'" +
            ", subfaction='" + getSubfaction() + "'" +
            ", battlefieldRole='" + getBattlefieldRole() + "'" +
            ", keywords='" + getKeywords() + "'" +
            "}";
    }
}
