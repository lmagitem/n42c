package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A NinthBattle.
 */
@Entity
@Table(name = "ninth_battle")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NinthBattle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "battle")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<NinthArmyMoment> armies = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "battles", allowSetters = true)
    private NinthCampaignMoment campaignMoment;

    @ManyToOne
    @JsonIgnoreProperties(value = "battles", allowSetters = true)
    private NinthMission mission;

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

    public NinthBattle name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<NinthArmyMoment> getArmies() {
        return armies;
    }

    public NinthBattle armies(Set<NinthArmyMoment> ninthArmyMoments) {
        this.armies = ninthArmyMoments;
        return this;
    }

    public NinthBattle addArmies(NinthArmyMoment ninthArmyMoment) {
        this.armies.add(ninthArmyMoment);
        ninthArmyMoment.setBattle(this);
        return this;
    }

    public NinthBattle removeArmies(NinthArmyMoment ninthArmyMoment) {
        this.armies.remove(ninthArmyMoment);
        ninthArmyMoment.setBattle(null);
        return this;
    }

    public void setArmies(Set<NinthArmyMoment> ninthArmyMoments) {
        this.armies = ninthArmyMoments;
    }

    public NinthCampaignMoment getCampaignMoment() {
        return campaignMoment;
    }

    public NinthBattle campaignMoment(NinthCampaignMoment ninthCampaignMoment) {
        this.campaignMoment = ninthCampaignMoment;
        return this;
    }

    public void setCampaignMoment(NinthCampaignMoment ninthCampaignMoment) {
        this.campaignMoment = ninthCampaignMoment;
    }

    public NinthMission getMission() {
        return mission;
    }

    public NinthBattle mission(NinthMission ninthMission) {
        this.mission = ninthMission;
        return this;
    }

    public void setMission(NinthMission ninthMission) {
        this.mission = ninthMission;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NinthBattle)) {
            return false;
        }
        return id != null && id.equals(((NinthBattle) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NinthBattle{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
