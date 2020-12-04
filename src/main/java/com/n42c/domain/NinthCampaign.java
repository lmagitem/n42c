package com.n42c.domain;

import com.n42c.domain.enumeration.NinthGameType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A NinthCampaign.
 */
@Entity
@Table(name = "ninth_campaign")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NinthCampaign implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "game_type", nullable = false)
    private NinthGameType gameType;

    @NotNull
    @Column(name = "use_power_rating", nullable = false)
    private Boolean usePowerRating;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "campaign")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<NinthCampaignMoment> events = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "ninth_campaign_authors",
        joinColumns = @JoinColumn(name = "ninth_campaign_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "authors_id", referencedColumnName = "id"))
    private Set<Player> authors = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "ninth_campaign_participants",
        joinColumns = @JoinColumn(name = "ninth_campaign_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "participants_id", referencedColumnName = "id"))
    private Set<Player> participants = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "ninth_campaign_campaign_stratagems",
        joinColumns = @JoinColumn(name = "ninth_campaign_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "campaign_stratagems_id", referencedColumnName = "id"))
    private Set<NinthStratagemGroup> campaignStratagems = new HashSet<>();

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

    public NinthCampaign name(String name) {
        this.name = name;
        return this;
    }

    public NinthGameType getGameType() {
        return gameType;
    }

    public void setGameType(NinthGameType gameType) {
        this.gameType = gameType;
    }

    public NinthCampaign gameType(NinthGameType gameType) {
        this.gameType = gameType;
        return this;
    }

    public Boolean isUsePowerRating() {
        return usePowerRating;
    }

    public NinthCampaign usePowerRating(Boolean usePowerRating) {
        this.usePowerRating = usePowerRating;
        return this;
    }

    public void setUsePowerRating(Boolean usePowerRating) {
        this.usePowerRating = usePowerRating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public NinthCampaign description(String description) {
        this.description = description;
        return this;
    }

    public Set<NinthCampaignMoment> getEvents() {
        return events;
    }

    public void setEvents(Set<NinthCampaignMoment> ninthCampaignMoments) {
        this.events = ninthCampaignMoments;
    }

    public NinthCampaign events(Set<NinthCampaignMoment> ninthCampaignMoments) {
        this.events = ninthCampaignMoments;
        return this;
    }

    public NinthCampaign addEvents(NinthCampaignMoment ninthCampaignMoment) {
        this.events.add(ninthCampaignMoment);
        ninthCampaignMoment.setCampaign(this);
        return this;
    }

    public NinthCampaign removeEvents(NinthCampaignMoment ninthCampaignMoment) {
        this.events.remove(ninthCampaignMoment);
        ninthCampaignMoment.setCampaign(null);
        return this;
    }

    public Set<Player> getAuthors() {
        return authors;
    }

    public void setAuthors(Set<Player> players) {
        this.authors = players;
    }

    public NinthCampaign authors(Set<Player> players) {
        this.authors = players;
        return this;
    }

    public NinthCampaign addAuthors(Player player) {
        this.authors.add(player);
        player.getAuthoredCampaigns().add(this);
        return this;
    }

    public NinthCampaign removeAuthors(Player player) {
        this.authors.remove(player);
        player.getAuthoredCampaigns().remove(this);
        return this;
    }

    public Set<Player> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<Player> players) {
        this.participants = players;
    }

    public NinthCampaign participants(Set<Player> players) {
        this.participants = players;
        return this;
    }

    public NinthCampaign addParticipants(Player player) {
        this.participants.add(player);
        player.getCampaigns().add(this);
        return this;
    }

    public NinthCampaign removeParticipants(Player player) {
        this.participants.remove(player);
        player.getCampaigns().remove(this);
        return this;
    }

    public Set<NinthStratagemGroup> getCampaignStratagems() {
        return campaignStratagems;
    }

    public void setCampaignStratagems(Set<NinthStratagemGroup> ninthStratagemGroups) {
        this.campaignStratagems = ninthStratagemGroups;
    }

    public NinthCampaign campaignStratagems(Set<NinthStratagemGroup> ninthStratagemGroups) {
        this.campaignStratagems = ninthStratagemGroups;
        return this;
    }

    public NinthCampaign addCampaignStratagems(NinthStratagemGroup ninthStratagemGroup) {
        this.campaignStratagems.add(ninthStratagemGroup);
        ninthStratagemGroup.getCampaigns().add(this);
        return this;
    }

    public NinthCampaign removeCampaignStratagems(NinthStratagemGroup ninthStratagemGroup) {
        this.campaignStratagems.remove(ninthStratagemGroup);
        ninthStratagemGroup.getCampaigns().remove(this);
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NinthCampaign)) {
            return false;
        }
        return id != null && id.equals(((NinthCampaign) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NinthCampaign{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", gameType='" + getGameType() + "'" +
            ", usePowerRating='" + isUsePowerRating() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
