package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

import com.n42c.domain.enumeration.NinthCrusadeRank;

/**
 * A NinthArmyUnitMoment.
 */
@Entity
@Table(name = "ninth_army_unit_moment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NinthArmyUnitMoment implements Serializable {

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

    @Column(name = "points_cost")
    private Integer pointsCost;

    @Column(name = "power_rating")
    private Integer powerRating;

    @Column(name = "experience_points")
    private Integer experiencePoints;

    @Column(name = "crusade_points")
    private Integer crusadePoints;

    @Column(name = "equipment")
    private String equipment;

    @Column(name = "psychic_powers")
    private String psychicPowers;

    @Column(name = "warlord_traits")
    private String warlordTraits;

    @Column(name = "relics")
    private String relics;

    @Column(name = "other_upgrades")
    private String otherUpgrades;

    @Column(name = "battles_played")
    private Integer battlesPlayed;

    @Column(name = "battles_survived")
    private Integer battlesSurvived;

    @Column(name = "ranged_kills")
    private Integer rangedKills;

    @Column(name = "melee_kills")
    private Integer meleeKills;

    @Column(name = "psychic_kills")
    private Integer psychicKills;

    @Enumerated(EnumType.STRING)
    @Column(name = "crusade_rank")
    private NinthCrusadeRank crusadeRank;

    @Column(name = "battle_honours")
    private String battleHonours;

    @Column(name = "battle_scars")
    private String battleScars;

    @ManyToOne
    @JsonIgnoreProperties(value = "moments", allowSetters = true)
    private NinthArmyUnit armyUnit;

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

    public NinthArmyUnitMoment current(Boolean current) {
        this.current = current;
        return this;
    }

    public void setCurrent(Boolean current) {
        this.current = current;
    }

    public Instant getSinceInstant() {
        return sinceInstant;
    }

    public NinthArmyUnitMoment sinceInstant(Instant sinceInstant) {
        this.sinceInstant = sinceInstant;
        return this;
    }

    public void setSinceInstant(Instant sinceInstant) {
        this.sinceInstant = sinceInstant;
    }

    public Integer getPointsCost() {
        return pointsCost;
    }

    public NinthArmyUnitMoment pointsCost(Integer pointsCost) {
        this.pointsCost = pointsCost;
        return this;
    }

    public void setPointsCost(Integer pointsCost) {
        this.pointsCost = pointsCost;
    }

    public Integer getPowerRating() {
        return powerRating;
    }

    public NinthArmyUnitMoment powerRating(Integer powerRating) {
        this.powerRating = powerRating;
        return this;
    }

    public void setPowerRating(Integer powerRating) {
        this.powerRating = powerRating;
    }

    public Integer getExperiencePoints() {
        return experiencePoints;
    }

    public NinthArmyUnitMoment experiencePoints(Integer experiencePoints) {
        this.experiencePoints = experiencePoints;
        return this;
    }

    public void setExperiencePoints(Integer experiencePoints) {
        this.experiencePoints = experiencePoints;
    }

    public Integer getCrusadePoints() {
        return crusadePoints;
    }

    public NinthArmyUnitMoment crusadePoints(Integer crusadePoints) {
        this.crusadePoints = crusadePoints;
        return this;
    }

    public void setCrusadePoints(Integer crusadePoints) {
        this.crusadePoints = crusadePoints;
    }

    public String getEquipment() {
        return equipment;
    }

    public NinthArmyUnitMoment equipment(String equipment) {
        this.equipment = equipment;
        return this;
    }

    public void setEquipment(String equipment) {
        this.equipment = equipment;
    }

    public String getPsychicPowers() {
        return psychicPowers;
    }

    public NinthArmyUnitMoment psychicPowers(String psychicPowers) {
        this.psychicPowers = psychicPowers;
        return this;
    }

    public void setPsychicPowers(String psychicPowers) {
        this.psychicPowers = psychicPowers;
    }

    public String getWarlordTraits() {
        return warlordTraits;
    }

    public NinthArmyUnitMoment warlordTraits(String warlordTraits) {
        this.warlordTraits = warlordTraits;
        return this;
    }

    public void setWarlordTraits(String warlordTraits) {
        this.warlordTraits = warlordTraits;
    }

    public String getRelics() {
        return relics;
    }

    public NinthArmyUnitMoment relics(String relics) {
        this.relics = relics;
        return this;
    }

    public void setRelics(String relics) {
        this.relics = relics;
    }

    public String getOtherUpgrades() {
        return otherUpgrades;
    }

    public NinthArmyUnitMoment otherUpgrades(String otherUpgrades) {
        this.otherUpgrades = otherUpgrades;
        return this;
    }

    public void setOtherUpgrades(String otherUpgrades) {
        this.otherUpgrades = otherUpgrades;
    }

    public Integer getBattlesPlayed() {
        return battlesPlayed;
    }

    public NinthArmyUnitMoment battlesPlayed(Integer battlesPlayed) {
        this.battlesPlayed = battlesPlayed;
        return this;
    }

    public void setBattlesPlayed(Integer battlesPlayed) {
        this.battlesPlayed = battlesPlayed;
    }

    public Integer getBattlesSurvived() {
        return battlesSurvived;
    }

    public NinthArmyUnitMoment battlesSurvived(Integer battlesSurvived) {
        this.battlesSurvived = battlesSurvived;
        return this;
    }

    public void setBattlesSurvived(Integer battlesSurvived) {
        this.battlesSurvived = battlesSurvived;
    }

    public Integer getRangedKills() {
        return rangedKills;
    }

    public NinthArmyUnitMoment rangedKills(Integer rangedKills) {
        this.rangedKills = rangedKills;
        return this;
    }

    public void setRangedKills(Integer rangedKills) {
        this.rangedKills = rangedKills;
    }

    public Integer getMeleeKills() {
        return meleeKills;
    }

    public NinthArmyUnitMoment meleeKills(Integer meleeKills) {
        this.meleeKills = meleeKills;
        return this;
    }

    public void setMeleeKills(Integer meleeKills) {
        this.meleeKills = meleeKills;
    }

    public Integer getPsychicKills() {
        return psychicKills;
    }

    public NinthArmyUnitMoment psychicKills(Integer psychicKills) {
        this.psychicKills = psychicKills;
        return this;
    }

    public void setPsychicKills(Integer psychicKills) {
        this.psychicKills = psychicKills;
    }

    public NinthCrusadeRank getCrusadeRank() {
        return crusadeRank;
    }

    public NinthArmyUnitMoment crusadeRank(NinthCrusadeRank crusadeRank) {
        this.crusadeRank = crusadeRank;
        return this;
    }

    public void setCrusadeRank(NinthCrusadeRank crusadeRank) {
        this.crusadeRank = crusadeRank;
    }

    public String getBattleHonours() {
        return battleHonours;
    }

    public NinthArmyUnitMoment battleHonours(String battleHonours) {
        this.battleHonours = battleHonours;
        return this;
    }

    public void setBattleHonours(String battleHonours) {
        this.battleHonours = battleHonours;
    }

    public String getBattleScars() {
        return battleScars;
    }

    public NinthArmyUnitMoment battleScars(String battleScars) {
        this.battleScars = battleScars;
        return this;
    }

    public void setBattleScars(String battleScars) {
        this.battleScars = battleScars;
    }

    public NinthArmyUnit getArmyUnit() {
        return armyUnit;
    }

    public NinthArmyUnitMoment armyUnit(NinthArmyUnit ninthArmyUnit) {
        this.armyUnit = ninthArmyUnit;
        return this;
    }

    public void setArmyUnit(NinthArmyUnit ninthArmyUnit) {
        this.armyUnit = ninthArmyUnit;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NinthArmyUnitMoment)) {
            return false;
        }
        return id != null && id.equals(((NinthArmyUnitMoment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NinthArmyUnitMoment{" +
            "id=" + getId() +
            ", current='" + isCurrent() + "'" +
            ", sinceInstant='" + getSinceInstant() + "'" +
            ", pointsCost=" + getPointsCost() +
            ", powerRating=" + getPowerRating() +
            ", experiencePoints=" + getExperiencePoints() +
            ", crusadePoints=" + getCrusadePoints() +
            ", equipment='" + getEquipment() + "'" +
            ", psychicPowers='" + getPsychicPowers() + "'" +
            ", warlordTraits='" + getWarlordTraits() + "'" +
            ", relics='" + getRelics() + "'" +
            ", otherUpgrades='" + getOtherUpgrades() + "'" +
            ", battlesPlayed=" + getBattlesPlayed() +
            ", battlesSurvived=" + getBattlesSurvived() +
            ", rangedKills=" + getRangedKills() +
            ", meleeKills=" + getMeleeKills() +
            ", psychicKills=" + getPsychicKills() +
            ", crusadeRank='" + getCrusadeRank() + "'" +
            ", battleHonours='" + getBattleHonours() + "'" +
            ", battleScars='" + getBattleScars() + "'" +
            "}";
    }
}
