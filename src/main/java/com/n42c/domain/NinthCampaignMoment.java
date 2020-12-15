package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A NinthCampaignMoment.
 */
@Entity
@Table(name = "ninth_campaign_moment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NinthCampaignMoment implements Serializable {

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

    @Column(name = "name")
    private String name;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "summary")
    private String summary;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "campaignMoment")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<NinthBattle> battles = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "events", allowSetters = true)
    private NinthCampaign campaign;

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

    public NinthCampaignMoment current(Boolean current) {
        this.current = current;
        return this;
    }

    public void setCurrent(Boolean current) {
        this.current = current;
    }

    public Instant getSinceInstant() {
        return sinceInstant;
    }

    public void setSinceInstant(Instant sinceInstant) {
        this.sinceInstant = sinceInstant;
    }

    public NinthCampaignMoment sinceInstant(Instant sinceInstant) {
        this.sinceInstant = sinceInstant;
        return this;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public NinthCampaignMoment name(String name) {
        this.name = name;
        return this;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public NinthCampaignMoment summary(String summary) {
        this.summary = summary;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public NinthCampaignMoment description(String description) {
        this.description = description;
        return this;
    }

    public Set<NinthBattle> getBattles() {
        return battles;
    }

    public void setBattles(Set<NinthBattle> ninthBattles) {
        this.battles = ninthBattles;
    }

    public NinthCampaignMoment battles(Set<NinthBattle> ninthBattles) {
        this.battles = ninthBattles;
        return this;
    }

    public NinthCampaignMoment addBattles(NinthBattle ninthBattle) {
        this.battles.add(ninthBattle);
        ninthBattle.setCampaignMoment(this);
        return this;
    }

    public NinthCampaignMoment removeBattles(NinthBattle ninthBattle) {
        this.battles.remove(ninthBattle);
        ninthBattle.setCampaignMoment(null);
        return this;
    }

    public NinthCampaign getCampaign() {
        return campaign;
    }

    public void setCampaign(NinthCampaign ninthCampaign) {
        this.campaign = ninthCampaign;
    }

    public NinthCampaignMoment campaign(NinthCampaign ninthCampaign) {
        this.campaign = ninthCampaign;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NinthCampaignMoment)) {
            return false;
        }
        return id != null && id.equals(((NinthCampaignMoment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NinthCampaignMoment{" +
            "id=" + getId() +
            ", current='" + isCurrent() + "'" +
            ", sinceInstant='" + getSinceInstant() + "'" +
            ", name='" + getName() + "'" +
            ", summary='" + getSummary() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
