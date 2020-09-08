package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.n42c.domain.enumeration.Language;

/**
 * The Localized content of that product.
 */
@ApiModel(description = "The Localized content of that product.")
@Entity
@Table(name = "localized_product")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LocalizedProduct implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * An excerpt of the product to show on the shop.
     */
    @ApiModelProperty(value = "An excerpt of the product to show on the shop.")
    @Column(name = "excerpt")
    private String excerpt;

    /**
     * The url of a picture representing the item.
     */
    @ApiModelProperty(value = "The url of a picture representing the item.")
    @Column(name = "picture_url")
    private String pictureUrl;

    /**
     * The text describing this product.
     */
    @NotNull
    @ApiModelProperty(value = "The text describing this product.", required = true)
    @Column(name = "content", nullable = false)
    private String content;

    /**
     * This item's language.
     */
    @NotNull
    @ApiModelProperty(value = "This item's language.", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "language", nullable = false)
    private Language language;

    @ManyToOne
    @JsonIgnoreProperties(value = "localizations", allowSetters = true)
    private Product product;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExcerpt() {
        return excerpt;
    }

    public LocalizedProduct excerpt(String excerpt) {
        this.excerpt = excerpt;
        return this;
    }

    public void setExcerpt(String excerpt) {
        this.excerpt = excerpt;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public LocalizedProduct pictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
        return this;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public String getContent() {
        return content;
    }

    public LocalizedProduct content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Language getLanguage() {
        return language;
    }

    public LocalizedProduct language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Product getProduct() {
        return product;
    }

    public LocalizedProduct product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LocalizedProduct)) {
            return false;
        }
        return id != null && id.equals(((LocalizedProduct) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LocalizedProduct{" +
            "id=" + getId() +
            ", excerpt='" + getExcerpt() + "'" +
            ", pictureUrl='" + getPictureUrl() + "'" +
            ", content='" + getContent() + "'" +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}