package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * An entry to display in the shop
 */
@ApiModel(description = "An entry to display in the shop")
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToMany(mappedBy = "product")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<LocalizedProduct> localizations = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "product_authors",
               joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "authors_id", referencedColumnName = "id"))
    private Set<AppUser> authors = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "products", allowSetters = true)
    private Shop shop;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<LocalizedProduct> getLocalizations() {
        return localizations;
    }

    public Product localizations(Set<LocalizedProduct> localizedProducts) {
        this.localizations = localizedProducts;
        return this;
    }

    public Product addLocalizations(LocalizedProduct localizedProduct) {
        this.localizations.add(localizedProduct);
        localizedProduct.setProduct(this);
        return this;
    }

    public Product removeLocalizations(LocalizedProduct localizedProduct) {
        this.localizations.remove(localizedProduct);
        localizedProduct.setProduct(null);
        return this;
    }

    public void setLocalizations(Set<LocalizedProduct> localizedProducts) {
        this.localizations = localizedProducts;
    }

    public Set<AppUser> getAuthors() {
        return authors;
    }

    public Product authors(Set<AppUser> appUsers) {
        this.authors = appUsers;
        return this;
    }

    public Product addAuthors(AppUser appUser) {
        this.authors.add(appUser);
        appUser.getProducts().add(this);
        return this;
    }

    public Product removeAuthors(AppUser appUser) {
        this.authors.remove(appUser);
        appUser.getProducts().remove(this);
        return this;
    }

    public void setAuthors(Set<AppUser> appUsers) {
        this.authors = appUsers;
    }

    public Shop getShop() {
        return shop;
    }

    public Product shop(Shop shop) {
        this.shop = shop;
        return this;
    }

    public void setShop(Shop shop) {
        this.shop = shop;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            "}";
    }
}
