package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.n42c.domain.enumeration.Language;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * A LocalizedNinthMission.
 */
@Entity
@Table(name = "localized_ninth_mission")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LocalizedNinthMission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "briefing")
    private String briefing;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "language", nullable = false)
    private Language language;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "localizations", allowSetters = true)
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

    public void setName(String name) {
        this.name = name;
    }

    public LocalizedNinthMission name(String name) {
        this.name = name;
        return this;
    }

    public String getBriefing() {
        return briefing;
    }

    public void setBriefing(String briefing) {
        this.briefing = briefing;
    }

    public LocalizedNinthMission briefing(String briefing) {
        this.briefing = briefing;
        return this;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public LocalizedNinthMission language(Language language) {
        this.language = language;
        return this;
    }

    public NinthMission getMission() {
        return mission;
    }

    public void setMission(NinthMission ninthMission) {
        this.mission = ninthMission;
    }

    public LocalizedNinthMission mission(NinthMission ninthMission) {
        this.mission = ninthMission;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LocalizedNinthMission)) {
            return false;
        }
        return id != null && id.equals(((LocalizedNinthMission) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LocalizedNinthMission{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", briefing='" + getBriefing() + "'" +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
