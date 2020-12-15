package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.n42c.domain.enumerations.NinthObjectiveType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A NinthObjective.
 */
@Entity
@Table(name = "ninth_objective")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NinthObjective implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "shareable")
    private Boolean shareable;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private NinthObjectiveType type;

    @OneToMany(mappedBy = "objective")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<LocalizedNinthObjective> localizations = new HashSet<>();

    @ManyToMany(mappedBy = "selectedObjectives")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Set<NinthArmyMoment> selections = new HashSet<>();

    @ManyToMany(mappedBy = "primaryObjectives")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Set<NinthMission> allowedAsPrimaries = new HashSet<>();

    @ManyToMany(mappedBy = "allowedSecondaries")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Set<NinthMission> allowedAsSecondaries = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isShareable() {
        return shareable;
    }

    public NinthObjective shareable(Boolean shareable) {
        this.shareable = shareable;
        return this;
    }

    public void setShareable(Boolean shareable) {
        this.shareable = shareable;
    }

    public NinthObjectiveType getType() {
        return type;
    }

    public void setType(NinthObjectiveType type) {
        this.type = type;
    }

    public NinthObjective type(NinthObjectiveType type) {
        this.type = type;
        return this;
    }

    public Set<LocalizedNinthObjective> getLocalizations() {
        return localizations;
    }

    public void setLocalizations(Set<LocalizedNinthObjective> localizedNinthObjectives) {
        this.localizations = localizedNinthObjectives;
    }

    public NinthObjective localizations(Set<LocalizedNinthObjective> localizedNinthObjectives) {
        this.localizations = localizedNinthObjectives;
        return this;
    }

    public NinthObjective addLocalizations(LocalizedNinthObjective localizedNinthObjective) {
        this.localizations.add(localizedNinthObjective);
        localizedNinthObjective.setObjective(this);
        return this;
    }

    public NinthObjective removeLocalizations(LocalizedNinthObjective localizedNinthObjective) {
        this.localizations.remove(localizedNinthObjective);
        localizedNinthObjective.setObjective(null);
        return this;
    }

    public Set<NinthArmyMoment> getSelections() {
        return selections;
    }

    public void setSelections(Set<NinthArmyMoment> ninthArmyMoments) {
        this.selections = ninthArmyMoments;
    }

    public NinthObjective selections(Set<NinthArmyMoment> ninthArmyMoments) {
        this.selections = ninthArmyMoments;
        return this;
    }

    public NinthObjective addSelections(NinthArmyMoment ninthArmyMoment) {
        this.selections.add(ninthArmyMoment);
        ninthArmyMoment.getSelectedObjectives().add(this);
        return this;
    }

    public NinthObjective removeSelections(NinthArmyMoment ninthArmyMoment) {
        this.selections.remove(ninthArmyMoment);
        ninthArmyMoment.getSelectedObjectives().remove(this);
        return this;
    }

    public Set<NinthMission> getAllowedAsPrimaries() {
        return allowedAsPrimaries;
    }

    public void setAllowedAsPrimaries(Set<NinthMission> ninthMissions) {
        this.allowedAsPrimaries = ninthMissions;
    }

    public NinthObjective allowedAsPrimaries(Set<NinthMission> ninthMissions) {
        this.allowedAsPrimaries = ninthMissions;
        return this;
    }

    public NinthObjective addAllowedAsPrimaries(NinthMission ninthMission) {
        this.allowedAsPrimaries.add(ninthMission);
        ninthMission.getPrimaryObjectives().add(this);
        return this;
    }

    public NinthObjective removeAllowedAsPrimaries(NinthMission ninthMission) {
        this.allowedAsPrimaries.remove(ninthMission);
        ninthMission.getPrimaryObjectives().remove(this);
        return this;
    }

    public Set<NinthMission> getAllowedAsSecondaries() {
        return allowedAsSecondaries;
    }

    public void setAllowedAsSecondaries(Set<NinthMission> ninthMissions) {
        this.allowedAsSecondaries = ninthMissions;
    }

    public NinthObjective allowedAsSecondaries(Set<NinthMission> ninthMissions) {
        this.allowedAsSecondaries = ninthMissions;
        return this;
    }

    public NinthObjective addAllowedAsSecondaries(NinthMission ninthMission) {
        this.allowedAsSecondaries.add(ninthMission);
        ninthMission.getAllowedSecondaries().add(this);
        return this;
    }

    public NinthObjective removeAllowedAsSecondaries(NinthMission ninthMission) {
        this.allowedAsSecondaries.remove(ninthMission);
        ninthMission.getAllowedSecondaries().remove(this);
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NinthObjective)) {
            return false;
        }
        return id != null && id.equals(((NinthObjective) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NinthObjective{" +
            "id=" + getId() +
            ", shareable='" + isShareable() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
