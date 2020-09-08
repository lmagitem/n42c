package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * Scriptorium's player.
 */
@ApiModel(description = "Scriptorium's player.")
@Entity
@Table(name = "player")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Player implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private AppUser appUser;

    @OneToMany(mappedBy = "author")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<NinthArmy> lists = new HashSet<>();

    @OneToMany(mappedBy = "owner")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<NinthUnit> collections = new HashSet<>();

    @OneToMany(mappedBy = "author")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<NinthStratagemGroup> stratagemGroups = new HashSet<>();

    @ManyToMany(mappedBy = "authors")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<NinthCampaign> authoredCampaigns = new HashSet<>();

    @ManyToMany(mappedBy = "participants")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<NinthCampaign> campaigns = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public Player appUser(AppUser appUser) {
        this.appUser = appUser;
        return this;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public Set<NinthArmy> getLists() {
        return lists;
    }

    public Player lists(Set<NinthArmy> ninthArmies) {
        this.lists = ninthArmies;
        return this;
    }

    public Player addLists(NinthArmy ninthArmy) {
        this.lists.add(ninthArmy);
        ninthArmy.setAuthor(this);
        return this;
    }

    public Player removeLists(NinthArmy ninthArmy) {
        this.lists.remove(ninthArmy);
        ninthArmy.setAuthor(null);
        return this;
    }

    public void setLists(Set<NinthArmy> ninthArmies) {
        this.lists = ninthArmies;
    }

    public Set<NinthUnit> getCollections() {
        return collections;
    }

    public Player collections(Set<NinthUnit> ninthUnits) {
        this.collections = ninthUnits;
        return this;
    }

    public Player addCollection(NinthUnit ninthUnit) {
        this.collections.add(ninthUnit);
        ninthUnit.setOwner(this);
        return this;
    }

    public Player removeCollection(NinthUnit ninthUnit) {
        this.collections.remove(ninthUnit);
        ninthUnit.setOwner(null);
        return this;
    }

    public void setCollections(Set<NinthUnit> ninthUnits) {
        this.collections = ninthUnits;
    }

    public Set<NinthStratagemGroup> getStratagemGroups() {
        return stratagemGroups;
    }

    public Player stratagemGroups(Set<NinthStratagemGroup> ninthStratagemGroups) {
        this.stratagemGroups = ninthStratagemGroups;
        return this;
    }

    public Player addStratagemGroups(NinthStratagemGroup ninthStratagemGroup) {
        this.stratagemGroups.add(ninthStratagemGroup);
        ninthStratagemGroup.setAuthor(this);
        return this;
    }

    public Player removeStratagemGroups(NinthStratagemGroup ninthStratagemGroup) {
        this.stratagemGroups.remove(ninthStratagemGroup);
        ninthStratagemGroup.setAuthor(null);
        return this;
    }

    public void setStratagemGroups(Set<NinthStratagemGroup> ninthStratagemGroups) {
        this.stratagemGroups = ninthStratagemGroups;
    }

    public Set<NinthCampaign> getAuthoredCampaigns() {
        return authoredCampaigns;
    }

    public Player authoredCampaigns(Set<NinthCampaign> ninthCampaigns) {
        this.authoredCampaigns = ninthCampaigns;
        return this;
    }

    public Player addAuthoredCampaigns(NinthCampaign ninthCampaign) {
        this.authoredCampaigns.add(ninthCampaign);
        ninthCampaign.getAuthors().add(this);
        return this;
    }

    public Player removeAuthoredCampaigns(NinthCampaign ninthCampaign) {
        this.authoredCampaigns.remove(ninthCampaign);
        ninthCampaign.getAuthors().remove(this);
        return this;
    }

    public void setAuthoredCampaigns(Set<NinthCampaign> ninthCampaigns) {
        this.authoredCampaigns = ninthCampaigns;
    }

    public Set<NinthCampaign> getCampaigns() {
        return campaigns;
    }

    public Player campaigns(Set<NinthCampaign> ninthCampaigns) {
        this.campaigns = ninthCampaigns;
        return this;
    }

    public Player addCampaigns(NinthCampaign ninthCampaign) {
        this.campaigns.add(ninthCampaign);
        ninthCampaign.getParticipants().add(this);
        return this;
    }

    public Player removeCampaigns(NinthCampaign ninthCampaign) {
        this.campaigns.remove(ninthCampaign);
        ninthCampaign.getParticipants().remove(this);
        return this;
    }

    public void setCampaigns(Set<NinthCampaign> ninthCampaigns) {
        this.campaigns = ninthCampaigns;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Player)) {
            return false;
        }
        return id != null && id.equals(((Player) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Player{" +
            "id=" + getId() +
            "}";
    }
}
