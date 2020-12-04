package com.n42c.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A NinthDeploymentMap.
 */
@Entity
@Table(name = "ninth_deployment_map")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NinthDeploymentMap implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "url")
    private String url;

    @Column(name = "shareable")
    private Boolean shareable;

    @OneToMany(mappedBy = "deploymentMap")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<LocalizedNinthDeploymentMap> localizations = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "ninth_deployment_map_used_in_missions",
        joinColumns = @JoinColumn(name = "ninth_deployment_map_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "used_in_missions_id", referencedColumnName = "id"))
    private Set<NinthMission> usedInMissions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public NinthDeploymentMap url(String url) {
        this.url = url;
        return this;
    }

    public Boolean isShareable() {
        return shareable;
    }

    public NinthDeploymentMap shareable(Boolean shareable) {
        this.shareable = shareable;
        return this;
    }

    public void setShareable(Boolean shareable) {
        this.shareable = shareable;
    }

    public Set<LocalizedNinthDeploymentMap> getLocalizations() {
        return localizations;
    }

    public void setLocalizations(Set<LocalizedNinthDeploymentMap> localizedNinthDeploymentMaps) {
        this.localizations = localizedNinthDeploymentMaps;
    }

    public NinthDeploymentMap localizations(Set<LocalizedNinthDeploymentMap> localizedNinthDeploymentMaps) {
        this.localizations = localizedNinthDeploymentMaps;
        return this;
    }

    public NinthDeploymentMap addLocalizations(LocalizedNinthDeploymentMap localizedNinthDeploymentMap) {
        this.localizations.add(localizedNinthDeploymentMap);
        localizedNinthDeploymentMap.setDeploymentMap(this);
        return this;
    }

    public NinthDeploymentMap removeLocalizations(LocalizedNinthDeploymentMap localizedNinthDeploymentMap) {
        this.localizations.remove(localizedNinthDeploymentMap);
        localizedNinthDeploymentMap.setDeploymentMap(null);
        return this;
    }

    public Set<NinthMission> getUsedInMissions() {
        return usedInMissions;
    }

    public void setUsedInMissions(Set<NinthMission> ninthMissions) {
        this.usedInMissions = ninthMissions;
    }

    public NinthDeploymentMap usedInMissions(Set<NinthMission> ninthMissions) {
        this.usedInMissions = ninthMissions;
        return this;
    }

    public NinthDeploymentMap addUsedInMissions(NinthMission ninthMission) {
        this.usedInMissions.add(ninthMission);
        ninthMission.getMissionDeployments().add(this);
        return this;
    }

    public NinthDeploymentMap removeUsedInMissions(NinthMission ninthMission) {
        this.usedInMissions.remove(ninthMission);
        ninthMission.getMissionDeployments().remove(this);
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NinthDeploymentMap)) {
            return false;
        }
        return id != null && id.equals(((NinthDeploymentMap) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NinthDeploymentMap{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", shareable='" + isShareable() + "'" +
            "}";
    }
}
