package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.BlogPost;
import com.n42c.domain.LocalizedBlogPost;
import com.n42c.domain.enumerations.Language;
import com.n42c.repository.LocalizedBlogPostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link LocalizedBlogPostResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@AutoConfigureMockMvc
@WithMockUser
public class LocalizedBlogPostResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_EXCERPT = "AAAAAAAAAA";
    private static final String UPDATED_EXCERPT = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Language DEFAULT_LANGUAGE = Language.EN;
    private static final Language UPDATED_LANGUAGE = Language.FR;

    @Autowired
    private LocalizedBlogPostRepository localizedBlogPostRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLocalizedBlogPostMockMvc;

    private LocalizedBlogPost localizedBlogPost;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedBlogPost createEntity(EntityManager em) {
        LocalizedBlogPost localizedBlogPost = new LocalizedBlogPost()
            .title(DEFAULT_TITLE)
            .excerpt(DEFAULT_EXCERPT)
            .content(DEFAULT_CONTENT)
            .language(DEFAULT_LANGUAGE);
        // Add required entity
        BlogPost blogPost;
        if (TestUtil.findAll(em, BlogPost.class).isEmpty()) {
            blogPost = BlogPostResourceIT.createEntity(em);
            em.persist(blogPost);
            em.flush();
        } else {
            blogPost = TestUtil.findAll(em, BlogPost.class).get(0);
        }
        localizedBlogPost.setPost(blogPost);
        return localizedBlogPost;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedBlogPost createUpdatedEntity(EntityManager em) {
        LocalizedBlogPost localizedBlogPost = new LocalizedBlogPost()
            .title(UPDATED_TITLE)
            .excerpt(UPDATED_EXCERPT)
            .content(UPDATED_CONTENT)
            .language(UPDATED_LANGUAGE);
        // Add required entity
        BlogPost blogPost;
        if (TestUtil.findAll(em, BlogPost.class).isEmpty()) {
            blogPost = BlogPostResourceIT.createUpdatedEntity(em);
            em.persist(blogPost);
            em.flush();
        } else {
            blogPost = TestUtil.findAll(em, BlogPost.class).get(0);
        }
        localizedBlogPost.setPost(blogPost);
        return localizedBlogPost;
    }

    @BeforeEach
    public void initTest() {
        localizedBlogPost = createEntity(em);
    }

    @Test
    @Transactional
    public void createLocalizedBlogPost() throws Exception {
        int databaseSizeBeforeCreate = localizedBlogPostRepository.findAll().size();
        // Create the LocalizedBlogPost
        restLocalizedBlogPostMockMvc.perform(post("/api/localized-blog-posts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedBlogPost)))
            .andExpect(status().isCreated());

        // Validate the LocalizedBlogPost in the database
        List<LocalizedBlogPost> localizedBlogPostList = localizedBlogPostRepository.findAll();
        assertThat(localizedBlogPostList).hasSize(databaseSizeBeforeCreate + 1);
        LocalizedBlogPost testLocalizedBlogPost = localizedBlogPostList.get(localizedBlogPostList.size() - 1);
        assertThat(testLocalizedBlogPost.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testLocalizedBlogPost.getExcerpt()).isEqualTo(DEFAULT_EXCERPT);
        assertThat(testLocalizedBlogPost.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testLocalizedBlogPost.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
    }

    @Test
    @Transactional
    public void createLocalizedBlogPostWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = localizedBlogPostRepository.findAll().size();

        // Create the LocalizedBlogPost with an existing ID
        localizedBlogPost.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocalizedBlogPostMockMvc.perform(post("/api/localized-blog-posts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedBlogPost)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedBlogPost in the database
        List<LocalizedBlogPost> localizedBlogPostList = localizedBlogPostRepository.findAll();
        assertThat(localizedBlogPostList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = localizedBlogPostRepository.findAll().size();
        // set the field null
        localizedBlogPost.setTitle(null);

        // Create the LocalizedBlogPost, which fails.


        restLocalizedBlogPostMockMvc.perform(post("/api/localized-blog-posts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedBlogPost)))
            .andExpect(status().isBadRequest());

        List<LocalizedBlogPost> localizedBlogPostList = localizedBlogPostRepository.findAll();
        assertThat(localizedBlogPostList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = localizedBlogPostRepository.findAll().size();
        // set the field null
        localizedBlogPost.setLanguage(null);

        // Create the LocalizedBlogPost, which fails.


        restLocalizedBlogPostMockMvc.perform(post("/api/localized-blog-posts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedBlogPost)))
            .andExpect(status().isBadRequest());

        List<LocalizedBlogPost> localizedBlogPostList = localizedBlogPostRepository.findAll();
        assertThat(localizedBlogPostList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLocalizedBlogPosts() throws Exception {
        // Initialize the database
        localizedBlogPostRepository.saveAndFlush(localizedBlogPost);

        // Get all the localizedBlogPostList
        restLocalizedBlogPostMockMvc.perform(get("/api/localized-blog-posts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(localizedBlogPost.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].excerpt").value(hasItem(DEFAULT_EXCERPT)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }

    @Test
    @Transactional
    public void getLocalizedBlogPost() throws Exception {
        // Initialize the database
        localizedBlogPostRepository.saveAndFlush(localizedBlogPost);

        // Get the localizedBlogPost
        restLocalizedBlogPostMockMvc.perform(get("/api/localized-blog-posts/{id}", localizedBlogPost.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(localizedBlogPost.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.excerpt").value(DEFAULT_EXCERPT))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLocalizedBlogPost() throws Exception {
        // Get the localizedBlogPost
        restLocalizedBlogPostMockMvc.perform(get("/api/localized-blog-posts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLocalizedBlogPost() throws Exception {
        // Initialize the database
        localizedBlogPostRepository.saveAndFlush(localizedBlogPost);

        int databaseSizeBeforeUpdate = localizedBlogPostRepository.findAll().size();

        // Update the localizedBlogPost
        LocalizedBlogPost updatedLocalizedBlogPost = localizedBlogPostRepository.findById(localizedBlogPost.getId()).get();
        // Disconnect from session so that the updates on updatedLocalizedBlogPost are not directly saved in db
        em.detach(updatedLocalizedBlogPost);
        updatedLocalizedBlogPost
            .title(UPDATED_TITLE)
            .excerpt(UPDATED_EXCERPT)
            .content(UPDATED_CONTENT)
            .language(UPDATED_LANGUAGE);

        restLocalizedBlogPostMockMvc.perform(put("/api/localized-blog-posts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLocalizedBlogPost)))
            .andExpect(status().isOk());

        // Validate the LocalizedBlogPost in the database
        List<LocalizedBlogPost> localizedBlogPostList = localizedBlogPostRepository.findAll();
        assertThat(localizedBlogPostList).hasSize(databaseSizeBeforeUpdate);
        LocalizedBlogPost testLocalizedBlogPost = localizedBlogPostList.get(localizedBlogPostList.size() - 1);
        assertThat(testLocalizedBlogPost.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testLocalizedBlogPost.getExcerpt()).isEqualTo(UPDATED_EXCERPT);
        assertThat(testLocalizedBlogPost.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testLocalizedBlogPost.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingLocalizedBlogPost() throws Exception {
        int databaseSizeBeforeUpdate = localizedBlogPostRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalizedBlogPostMockMvc.perform(put("/api/localized-blog-posts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedBlogPost)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedBlogPost in the database
        List<LocalizedBlogPost> localizedBlogPostList = localizedBlogPostRepository.findAll();
        assertThat(localizedBlogPostList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLocalizedBlogPost() throws Exception {
        // Initialize the database
        localizedBlogPostRepository.saveAndFlush(localizedBlogPost);

        int databaseSizeBeforeDelete = localizedBlogPostRepository.findAll().size();

        // Delete the localizedBlogPost
        restLocalizedBlogPostMockMvc.perform(delete("/api/localized-blog-posts/{id}", localizedBlogPost.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LocalizedBlogPost> localizedBlogPostList = localizedBlogPostRepository.findAll();
        assertThat(localizedBlogPostList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
