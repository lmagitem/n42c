package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.n42c.domain.enumerations.Faction;
import com.n42c.domain.enumerations.NinthGamePhase;
import com.n42c.domain.enumerations.NinthGameTurn;
import com.n42c.domain.enumerations.SubFaction;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A NinthStratagem.
 */
@Entity
@Table(name = "ninth_stratagem")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NinthStratagem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cost")
    private Integer cost;

    @Enumerated(EnumType.STRING)
    @Column(name = "faction")
    private Faction faction;

    @Enumerated(EnumType.STRING)
    @Column(name = "subfaction")
    private SubFaction subfaction;

    @Enumerated(EnumType.STRING)
    @Column(name = "turn")
    private NinthGameTurn turn;

    @Enumerated(EnumType.STRING)
    @Column(name = "phase")
    private NinthGamePhase phase;

    @OneToMany(mappedBy = "stratagem")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<LocalizedNinthStratagem> localizations = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "stratagems", allowSetters = true)
    private NinthStratagemGroup group;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCost() {
        return cost;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
    }

    public NinthStratagem cost(Integer cost) {
        this.cost = cost;
        return this;
    }

    public Faction getFaction() {
        return faction;
    }

    public void setFaction(Faction faction) {
        this.faction = faction;
    }

    public NinthStratagem faction(Faction faction) {
        this.faction = faction;
        return this;
    }

    public SubFaction getSubfaction() {
        return subfaction;
    }

    public void setSubfaction(SubFaction subfaction) {
        this.subfaction = subfaction;
    }

    public NinthStratagem subfaction(SubFaction subfaction) {
        this.subfaction = subfaction;
        return this;
    }

    public NinthGameTurn getTurn() {
        return turn;
    }

    public void setTurn(NinthGameTurn turn) {
        this.turn = turn;
    }

    public NinthStratagem turn(NinthGameTurn turn) {
        this.turn = turn;
        return this;
    }

    public NinthGamePhase getPhase() {
        return phase;
    }

    public void setPhase(NinthGamePhase phase) {
        this.phase = phase;
    }

    public NinthStratagem phase(NinthGamePhase phase) {
        this.phase = phase;
        return this;
    }

    public Set<LocalizedNinthStratagem> getLocalizations() {
        return localizations;
    }

    public void setLocalizations(Set<LocalizedNinthStratagem> localizedNinthStratagems) {
        this.localizations = localizedNinthStratagems;
    }

    public NinthStratagem localizations(Set<LocalizedNinthStratagem> localizedNinthStratagems) {
        this.localizations = localizedNinthStratagems;
        return this;
    }

    public NinthStratagem addLocalizations(LocalizedNinthStratagem localizedNinthStratagem) {
        this.localizations.add(localizedNinthStratagem);
        localizedNinthStratagem.setStratagem(this);
        return this;
    }

    public NinthStratagem removeLocalizations(LocalizedNinthStratagem localizedNinthStratagem) {
        this.localizations.remove(localizedNinthStratagem);
        localizedNinthStratagem.setStratagem(null);
        return this;
    }

    public NinthStratagemGroup getGroup() {
        return group;
    }

    public void setGroup(NinthStratagemGroup ninthStratagemGroup) {
        this.group = ninthStratagemGroup;
    }

    public NinthStratagem group(NinthStratagemGroup ninthStratagemGroup) {
        this.group = ninthStratagemGroup;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NinthStratagem)) {
            return false;
        }
        return id != null && id.equals(((NinthStratagem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NinthStratagem{" +
            "id=" + getId() +
            ", cost=" + getCost() +
            ", faction='" + getFaction() + "'" +
            ", subfaction='" + getSubfaction() + "'" +
            ", turn='" + getTurn() + "'" +
            ", phase='" + getPhase() + "'" +
            "}";
    }
}
