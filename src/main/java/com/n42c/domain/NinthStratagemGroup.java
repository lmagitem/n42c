package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A NinthStratagemGroup.
 */
@Entity
@Table(name = "ninth_stratagem_group")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NinthStratagemGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "shareable")
    private Boolean shareable;

    @OneToMany(mappedBy = "stratagemGroup")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<LocalizedNinthStratagemGroup> localizations = new HashSet<>();

    @OneToMany(mappedBy = "group")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<NinthStratagem> stratagems = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "stratagemGroups", allowSetters = true)
    private Player author;

    @ManyToMany(mappedBy = "campaignStratagems")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<NinthCampaign> campaigns = new HashSet<>();

    @ManyToMany(mappedBy = "missionStratagems")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<NinthMission> missions = new HashSet<>();

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

    public NinthStratagemGroup shareable(Boolean shareable) {
        this.shareable = shareable;
        return this;
    }

    public void setShareable(Boolean shareable) {
        this.shareable = shareable;
    }

    public Set<LocalizedNinthStratagemGroup> getLocalizations() {
        return localizations;
    }

    public void setLocalizations(Set<LocalizedNinthStratagemGroup> localizedNinthStratagemGroups) {
        this.localizations = localizedNinthStratagemGroups;
    }

    public NinthStratagemGroup localizations(Set<LocalizedNinthStratagemGroup> localizedNinthStratagemGroups) {
        this.localizations = localizedNinthStratagemGroups;
        return this;
    }

    public NinthStratagemGroup addLocalizations(LocalizedNinthStratagemGroup localizedNinthStratagemGroup) {
        this.localizations.add(localizedNinthStratagemGroup);
        localizedNinthStratagemGroup.setStratagemGroup(this);
        return this;
    }

    public NinthStratagemGroup removeLocalizations(LocalizedNinthStratagemGroup localizedNinthStratagemGroup) {
        this.localizations.remove(localizedNinthStratagemGroup);
        localizedNinthStratagemGroup.setStratagemGroup(null);
        return this;
    }

    public Set<NinthStratagem> getStratagems() {
        return stratagems;
    }

    public void setStratagems(Set<NinthStratagem> ninthStratagems) {
        this.stratagems = ninthStratagems;
    }

    public NinthStratagemGroup stratagems(Set<NinthStratagem> ninthStratagems) {
        this.stratagems = ninthStratagems;
        return this;
    }

    public NinthStratagemGroup addStratagems(NinthStratagem ninthStratagem) {
        this.stratagems.add(ninthStratagem);
        ninthStratagem.setGroup(this);
        return this;
    }

    public NinthStratagemGroup removeStratagems(NinthStratagem ninthStratagem) {
        this.stratagems.remove(ninthStratagem);
        ninthStratagem.setGroup(null);
        return this;
    }

    public Player getAuthor() {
        return author;
    }

    public void setAuthor(Player player) {
        this.author = player;
    }

    public NinthStratagemGroup author(Player player) {
        this.author = player;
        return this;
    }

    public Set<NinthCampaign> getCampaigns() {
        return campaigns;
    }

    public void setCampaigns(Set<NinthCampaign> ninthCampaigns) {
        this.campaigns = ninthCampaigns;
    }

    public NinthStratagemGroup campaigns(Set<NinthCampaign> ninthCampaigns) {
        this.campaigns = ninthCampaigns;
        return this;
    }

    public NinthStratagemGroup addCampaigns(NinthCampaign ninthCampaign) {
        this.campaigns.add(ninthCampaign);
        ninthCampaign.getCampaignStratagems().add(this);
        return this;
    }

    public NinthStratagemGroup removeCampaigns(NinthCampaign ninthCampaign) {
        this.campaigns.remove(ninthCampaign);
        ninthCampaign.getCampaignStratagems().remove(this);
        return this;
    }

    public Set<NinthMission> getMissions() {
        return missions;
    }

    public void setMissions(Set<NinthMission> ninthMissions) {
        this.missions = ninthMissions;
    }

    public NinthStratagemGroup missions(Set<NinthMission> ninthMissions) {
        this.missions = ninthMissions;
        return this;
    }

    public NinthStratagemGroup addMissions(NinthMission ninthMission) {
        this.missions.add(ninthMission);
        ninthMission.getMissionStratagems().add(this);
        return this;
    }

    public NinthStratagemGroup removeMissions(NinthMission ninthMission) {
        this.missions.remove(ninthMission);
        ninthMission.getMissionStratagems().remove(this);
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NinthStratagemGroup)) {
            return false;
        }
        return id != null && id.equals(((NinthStratagemGroup) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NinthStratagemGroup{" +
            "id=" + getId() +
            ", shareable='" + isShareable() + "'" +
            "}";
    }
}
