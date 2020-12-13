package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.n42c.domain.enumerations.NinthGameSize;
import com.n42c.domain.enumerations.NinthGameType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A NinthMission.
 */
@Entity
@Table(name = "ninth_mission")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NinthMission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "game_type")
    private NinthGameType gameType;

    @Enumerated(EnumType.STRING)
    @Column(name = "game_size")
    private NinthGameSize gameSize;

    @Column(name = "shareable")
    private Boolean shareable;

    @OneToMany(mappedBy = "mission")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<NinthBattle> battles = new HashSet<>();

    @OneToMany(mappedBy = "mission")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<LocalizedNinthMission> localizations = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "ninth_mission_mission_stratagems",
        joinColumns = @JoinColumn(name = "ninth_mission_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "mission_stratagems_id", referencedColumnName = "id"))
    private Set<NinthStratagemGroup> missionStratagems = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "ninth_mission_primary_objectives",
        joinColumns = @JoinColumn(name = "ninth_mission_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "primary_objectives_id", referencedColumnName = "id"))
    private Set<NinthObjective> primaryObjectives = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "ninth_mission_allowed_secondaries",
        joinColumns = @JoinColumn(name = "ninth_mission_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "allowed_secondaries_id", referencedColumnName = "id"))
    private Set<NinthObjective> allowedSecondaries = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "ninth_mission_rules",
        joinColumns = @JoinColumn(name = "ninth_mission_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "rules_id", referencedColumnName = "id"))
    private Set<NinthMissionRule> rules = new HashSet<>();

    @ManyToMany(mappedBy = "usedInMissions")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Set<NinthDeploymentMap> missionDeployments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NinthGameType getGameType() {
        return gameType;
    }

    public void setGameType(NinthGameType gameType) {
        this.gameType = gameType;
    }

    public NinthMission gameType(NinthGameType gameType) {
        this.gameType = gameType;
        return this;
    }

    public NinthGameSize getGameSize() {
        return gameSize;
    }

    public void setGameSize(NinthGameSize gameSize) {
        this.gameSize = gameSize;
    }

    public NinthMission gameSize(NinthGameSize gameSize) {
        this.gameSize = gameSize;
        return this;
    }

    public Boolean isShareable() {
        return shareable;
    }

    public NinthMission shareable(Boolean shareable) {
        this.shareable = shareable;
        return this;
    }

    public void setShareable(Boolean shareable) {
        this.shareable = shareable;
    }

    public Set<NinthBattle> getBattles() {
        return battles;
    }

    public void setBattles(Set<NinthBattle> ninthBattles) {
        this.battles = ninthBattles;
    }

    public NinthMission battles(Set<NinthBattle> ninthBattles) {
        this.battles = ninthBattles;
        return this;
    }

    public NinthMission addBattles(NinthBattle ninthBattle) {
        this.battles.add(ninthBattle);
        ninthBattle.setMission(this);
        return this;
    }

    public NinthMission removeBattles(NinthBattle ninthBattle) {
        this.battles.remove(ninthBattle);
        ninthBattle.setMission(null);
        return this;
    }

    public Set<LocalizedNinthMission> getLocalizations() {
        return localizations;
    }

    public void setLocalizations(Set<LocalizedNinthMission> localizedNinthMissions) {
        this.localizations = localizedNinthMissions;
    }

    public NinthMission localizations(Set<LocalizedNinthMission> localizedNinthMissions) {
        this.localizations = localizedNinthMissions;
        return this;
    }

    public NinthMission addLocalizations(LocalizedNinthMission localizedNinthMission) {
        this.localizations.add(localizedNinthMission);
        localizedNinthMission.setMission(this);
        return this;
    }

    public NinthMission removeLocalizations(LocalizedNinthMission localizedNinthMission) {
        this.localizations.remove(localizedNinthMission);
        localizedNinthMission.setMission(null);
        return this;
    }

    public Set<NinthStratagemGroup> getMissionStratagems() {
        return missionStratagems;
    }

    public void setMissionStratagems(Set<NinthStratagemGroup> ninthStratagemGroups) {
        this.missionStratagems = ninthStratagemGroups;
    }

    public NinthMission missionStratagems(Set<NinthStratagemGroup> ninthStratagemGroups) {
        this.missionStratagems = ninthStratagemGroups;
        return this;
    }

    public NinthMission addMissionStratagems(NinthStratagemGroup ninthStratagemGroup) {
        this.missionStratagems.add(ninthStratagemGroup);
        ninthStratagemGroup.getMissions().add(this);
        return this;
    }

    public NinthMission removeMissionStratagems(NinthStratagemGroup ninthStratagemGroup) {
        this.missionStratagems.remove(ninthStratagemGroup);
        ninthStratagemGroup.getMissions().remove(this);
        return this;
    }

    public Set<NinthObjective> getPrimaryObjectives() {
        return primaryObjectives;
    }

    public void setPrimaryObjectives(Set<NinthObjective> ninthObjectives) {
        this.primaryObjectives = ninthObjectives;
    }

    public NinthMission primaryObjectives(Set<NinthObjective> ninthObjectives) {
        this.primaryObjectives = ninthObjectives;
        return this;
    }

    public NinthMission addPrimaryObjectives(NinthObjective ninthObjective) {
        this.primaryObjectives.add(ninthObjective);
        ninthObjective.getAllowedAsPrimaries().add(this);
        return this;
    }

    public NinthMission removePrimaryObjectives(NinthObjective ninthObjective) {
        this.primaryObjectives.remove(ninthObjective);
        ninthObjective.getAllowedAsPrimaries().remove(this);
        return this;
    }

    public Set<NinthObjective> getAllowedSecondaries() {
        return allowedSecondaries;
    }

    public void setAllowedSecondaries(Set<NinthObjective> ninthObjectives) {
        this.allowedSecondaries = ninthObjectives;
    }

    public NinthMission allowedSecondaries(Set<NinthObjective> ninthObjectives) {
        this.allowedSecondaries = ninthObjectives;
        return this;
    }

    public NinthMission addAllowedSecondaries(NinthObjective ninthObjective) {
        this.allowedSecondaries.add(ninthObjective);
        ninthObjective.getAllowedAsSecondaries().add(this);
        return this;
    }

    public NinthMission removeAllowedSecondaries(NinthObjective ninthObjective) {
        this.allowedSecondaries.remove(ninthObjective);
        ninthObjective.getAllowedAsSecondaries().remove(this);
        return this;
    }

    public Set<NinthMissionRule> getRules() {
        return rules;
    }

    public void setRules(Set<NinthMissionRule> ninthMissionRules) {
        this.rules = ninthMissionRules;
    }

    public NinthMission rules(Set<NinthMissionRule> ninthMissionRules) {
        this.rules = ninthMissionRules;
        return this;
    }

    public NinthMission addRules(NinthMissionRule ninthMissionRule) {
        this.rules.add(ninthMissionRule);
        ninthMissionRule.getMissions().add(this);
        return this;
    }

    public NinthMission removeRules(NinthMissionRule ninthMissionRule) {
        this.rules.remove(ninthMissionRule);
        ninthMissionRule.getMissions().remove(this);
        return this;
    }

    public Set<NinthDeploymentMap> getMissionDeployments() {
        return missionDeployments;
    }

    public void setMissionDeployments(Set<NinthDeploymentMap> ninthDeploymentMaps) {
        this.missionDeployments = ninthDeploymentMaps;
    }

    public NinthMission missionDeployments(Set<NinthDeploymentMap> ninthDeploymentMaps) {
        this.missionDeployments = ninthDeploymentMaps;
        return this;
    }

    public NinthMission addMissionDeployment(NinthDeploymentMap ninthDeploymentMap) {
        this.missionDeployments.add(ninthDeploymentMap);
        ninthDeploymentMap.getUsedInMissions().add(this);
        return this;
    }

    public NinthMission removeMissionDeployment(NinthDeploymentMap ninthDeploymentMap) {
        this.missionDeployments.remove(ninthDeploymentMap);
        ninthDeploymentMap.getUsedInMissions().remove(this);
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NinthMission)) {
            return false;
        }
        return id != null && id.equals(((NinthMission) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NinthMission{" +
            "id=" + getId() +
            ", gameType='" + getGameType() + "'" +
            ", gameSize='" + getGameSize() + "'" +
            ", shareable='" + isShareable() + "'" +
            "}";
    }
}
