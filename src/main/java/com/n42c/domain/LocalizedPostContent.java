package com.n42c.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.n42c.domain.enumeration.Language;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * The content of a post, in a specific language.
 */
@ApiModel(description = "The content of a post, in a specific language.")
@Entity
@Table(name = "localized_post_content")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LocalizedPostContent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * This post's localized title.
     */
    @NotNull
    @ApiModelProperty(value = "This post's localized title.", required = true)
    @Column(name = "title", nullable = false)
    private String title;

    /**
     * An excerpt of the post to show on the blog page.
     */
    @ApiModelProperty(value = "An excerpt of the post to show on the blog page.")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "excerpt")
    private String excerpt;

    /**
     * The content of the post.
     */

    @ApiModelProperty(value = "The content of the post.", required = true)
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "content", nullable = false)
    private String content;

    /**
     * This post's language.
     */
    @NotNull
    @ApiModelProperty(value = "This post's language.", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "language", nullable = false)
    private Language language;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "localizations", allowSetters = true)
    private BlogPost post;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalizedPostContent title(String title) {
        this.title = title;
        return this;
    }

    public String getExcerpt() {
        return excerpt;
    }

    public void setExcerpt(String excerpt) {
        this.excerpt = excerpt;
    }

    public LocalizedPostContent excerpt(String excerpt) {
        this.excerpt = excerpt;
        return this;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalizedPostContent content(String content) {
        this.content = content;
        return this;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public LocalizedPostContent language(Language language) {
        this.language = language;
        return this;
    }

    public BlogPost getPost() {
        return post;
    }

    public void setPost(BlogPost blogPost) {
        this.post = blogPost;
    }

    public LocalizedPostContent post(BlogPost blogPost) {
        this.post = blogPost;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LocalizedPostContent)) {
            return false;
        }
        return id != null && id.equals(((LocalizedPostContent) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LocalizedPostContent{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", excerpt='" + getExcerpt() + "'" +
            ", content='" + getContent() + "'" +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
