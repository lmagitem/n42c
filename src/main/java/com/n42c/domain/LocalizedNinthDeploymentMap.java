package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A LocalizedNinthDeploymentMap.
 */
@Entity
@Table(name = "localized_ninth_deployment_map")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LocalizedNinthDeploymentMap implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JsonIgnoreProperties(value = "localizations", allowSetters = true)
    private NinthDeploymentMap deploymentMap;

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

    public LocalizedNinthDeploymentMap name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public LocalizedNinthDeploymentMap description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public NinthDeploymentMap getDeploymentMap() {
        return deploymentMap;
    }

    public LocalizedNinthDeploymentMap deploymentMap(NinthDeploymentMap ninthDeploymentMap) {
        this.deploymentMap = ninthDeploymentMap;
        return this;
    }

    public void setDeploymentMap(NinthDeploymentMap ninthDeploymentMap) {
        this.deploymentMap = ninthDeploymentMap;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LocalizedNinthDeploymentMap)) {
            return false;
        }
        return id != null && id.equals(((LocalizedNinthDeploymentMap) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LocalizedNinthDeploymentMap{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
