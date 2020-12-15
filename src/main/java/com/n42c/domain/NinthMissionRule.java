package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A NinthMissionRule.
 */
@Entity
@Table(name = "ninth_mission_rule")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NinthMissionRule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToMany(mappedBy = "rule")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<LocalizedNinthMissionRule> localizations = new HashSet<>();

    @ManyToMany(mappedBy = "rules")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Set<NinthMission> missions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<LocalizedNinthMissionRule> getLocalizations() {
        return localizations;
    }

    public void setLocalizations(Set<LocalizedNinthMissionRule> localizedNinthMissionRules) {
        this.localizations = localizedNinthMissionRules;
    }

    public NinthMissionRule localizations(Set<LocalizedNinthMissionRule> localizedNinthMissionRules) {
        this.localizations = localizedNinthMissionRules;
        return this;
    }

    public NinthMissionRule addLocalizations(LocalizedNinthMissionRule localizedNinthMissionRule) {
        this.localizations.add(localizedNinthMissionRule);
        localizedNinthMissionRule.setRule(this);
        return this;
    }

    public NinthMissionRule removeLocalizations(LocalizedNinthMissionRule localizedNinthMissionRule) {
        this.localizations.remove(localizedNinthMissionRule);
        localizedNinthMissionRule.setRule(null);
        return this;
    }

    public Set<NinthMission> getMissions() {
        return missions;
    }

    public void setMissions(Set<NinthMission> ninthMissions) {
        this.missions = ninthMissions;
    }

    public NinthMissionRule missions(Set<NinthMission> ninthMissions) {
        this.missions = ninthMissions;
        return this;
    }

    public NinthMissionRule addMissions(NinthMission ninthMission) {
        this.missions.add(ninthMission);
        ninthMission.getRules().add(this);
        return this;
    }

    public NinthMissionRule removeMissions(NinthMission ninthMission) {
        this.missions.remove(ninthMission);
        ninthMission.getRules().remove(this);
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NinthMissionRule)) {
            return false;
        }
        return id != null && id.equals(((NinthMissionRule) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NinthMissionRule{" +
            "id=" + getId() +
            "}";
    }
}
