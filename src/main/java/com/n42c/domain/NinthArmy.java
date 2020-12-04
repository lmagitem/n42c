package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.n42c.domain.enumeration.Faction;
import com.n42c.domain.enumeration.SubFaction;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A NinthArmy.
 */
@Entity
@Table(name = "ninth_army")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NinthArmy implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "crusade", nullable = false)
    private Boolean crusade;

    @Enumerated(EnumType.STRING)
    @Column(name = "faction")
    private Faction faction;

    @Enumerated(EnumType.STRING)
    @Column(name = "subfaction")
    private SubFaction subfaction;

    @OneToMany(mappedBy = "army")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<NinthArmyUnit> units = new HashSet<>();

    @OneToMany(mappedBy = "army")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<NinthArmyMoment> moments = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "lists", allowSetters = true)
    private Player author;

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

    public NinthArmy name(String name) {
        this.name = name;
        return this;
    }

    public Boolean isCrusade() {
        return crusade;
    }

    public NinthArmy crusade(Boolean crusade) {
        this.crusade = crusade;
        return this;
    }

    public void setCrusade(Boolean crusade) {
        this.crusade = crusade;
    }

    public Faction getFaction() {
        return faction;
    }

    public void setFaction(Faction faction) {
        this.faction = faction;
    }

    public NinthArmy faction(Faction faction) {
        this.faction = faction;
        return this;
    }

    public SubFaction getSubfaction() {
        return subfaction;
    }

    public void setSubfaction(SubFaction subfaction) {
        this.subfaction = subfaction;
    }

    public NinthArmy subfaction(SubFaction subfaction) {
        this.subfaction = subfaction;
        return this;
    }

    public Set<NinthArmyUnit> getUnits() {
        return units;
    }

    public void setUnits(Set<NinthArmyUnit> ninthArmyUnits) {
        this.units = ninthArmyUnits;
    }

    public NinthArmy units(Set<NinthArmyUnit> ninthArmyUnits) {
        this.units = ninthArmyUnits;
        return this;
    }

    public NinthArmy addUnits(NinthArmyUnit ninthArmyUnit) {
        this.units.add(ninthArmyUnit);
        ninthArmyUnit.setArmy(this);
        return this;
    }

    public NinthArmy removeUnits(NinthArmyUnit ninthArmyUnit) {
        this.units.remove(ninthArmyUnit);
        ninthArmyUnit.setArmy(null);
        return this;
    }

    public Set<NinthArmyMoment> getMoments() {
        return moments;
    }

    public void setMoments(Set<NinthArmyMoment> ninthArmyMoments) {
        this.moments = ninthArmyMoments;
    }

    public NinthArmy moments(Set<NinthArmyMoment> ninthArmyMoments) {
        this.moments = ninthArmyMoments;
        return this;
    }

    public NinthArmy addMoments(NinthArmyMoment ninthArmyMoment) {
        this.moments.add(ninthArmyMoment);
        ninthArmyMoment.setArmy(this);
        return this;
    }

    public NinthArmy removeMoments(NinthArmyMoment ninthArmyMoment) {
        this.moments.remove(ninthArmyMoment);
        ninthArmyMoment.setArmy(null);
        return this;
    }

    public Player getAuthor() {
        return author;
    }

    public void setAuthor(Player player) {
        this.author = player;
    }

    public NinthArmy author(Player player) {
        this.author = player;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NinthArmy)) {
            return false;
        }
        return id != null && id.equals(((NinthArmy) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NinthArmy{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", crusade='" + isCrusade() + "'" +
            ", faction='" + getFaction() + "'" +
            ", subfaction='" + getSubfaction() + "'" +
            "}";
    }
}
