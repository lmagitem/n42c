package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.LocalizedBlogCategory;
import com.n42c.domain.BlogCategory;
import com.n42c.repository.LocalizedBlogCategoryRepository;

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

import com.n42c.domain.enumeration.Language;
/**
 * Integration tests for the {@link LocalizedBlogCategoryResource} REST controller.
 */
@SpringBootTest(classes = { N42CApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class LocalizedBlogCategoryResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Language DEFAULT_LANGUAGE = Language.EN;
    private static final Language UPDATED_LANGUAGE = Language.FR;

    @Autowired
    private LocalizedBlogCategoryRepository localizedBlogCategoryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLocalizedBlogCategoryMockMvc;

    private LocalizedBlogCategory localizedBlogCategory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedBlogCategory createEntity(EntityManager em) {
        LocalizedBlogCategory localizedBlogCategory = new LocalizedBlogCategory()
            .name(DEFAULT_NAME)
            .language(DEFAULT_LANGUAGE);
        // Add required entity
        BlogCategory blogCategory;
        if (TestUtil.findAll(em, BlogCategory.class).isEmpty()) {
            blogCategory = BlogCategoryResourceIT.createEntity(em);
            em.persist(blogCategory);
            em.flush();
        } else {
            blogCategory = TestUtil.findAll(em, BlogCategory.class).get(0);
        }
        localizedBlogCategory.setCategory(blogCategory);
        return localizedBlogCategory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedBlogCategory createUpdatedEntity(EntityManager em) {
        LocalizedBlogCategory localizedBlogCategory = new LocalizedBlogCategory()
            .name(UPDATED_NAME)
            .language(UPDATED_LANGUAGE);
        // Add required entity
        BlogCategory blogCategory;
        if (TestUtil.findAll(em, BlogCategory.class).isEmpty()) {
            blogCategory = BlogCategoryResourceIT.createUpdatedEntity(em);
            em.persist(blogCategory);
            em.flush();
        } else {
            blogCategory = TestUtil.findAll(em, BlogCategory.class).get(0);
        }
        localizedBlogCategory.setCategory(blogCategory);
        return localizedBlogCategory;
    }

    @BeforeEach
    public void initTest() {
        localizedBlogCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createLocalizedBlogCategory() throws Exception {
        int databaseSizeBeforeCreate = localizedBlogCategoryRepository.findAll().size();
        // Create the LocalizedBlogCategory
        restLocalizedBlogCategoryMockMvc.perform(post("/api/localized-blog-categories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedBlogCategory)))
            .andExpect(status().isCreated());

        // Validate the LocalizedBlogCategory in the database
        List<LocalizedBlogCategory> localizedBlogCategoryList = localizedBlogCategoryRepository.findAll();
        assertThat(localizedBlogCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        LocalizedBlogCategory testLocalizedBlogCategory = localizedBlogCategoryList.get(localizedBlogCategoryList.size() - 1);
        assertThat(testLocalizedBlogCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testLocalizedBlogCategory.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
    }

    @Test
    @Transactional
    public void createLocalizedBlogCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = localizedBlogCategoryRepository.findAll().size();

        // Create the LocalizedBlogCategory with an existing ID
        localizedBlogCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocalizedBlogCategoryMockMvc.perform(post("/api/localized-blog-categories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedBlogCategory)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedBlogCategory in the database
        List<LocalizedBlogCategory> localizedBlogCategoryList = localizedBlogCategoryRepository.findAll();
        assertThat(localizedBlogCategoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = localizedBlogCategoryRepository.findAll().size();
        // set the field null
        localizedBlogCategory.setName(null);

        // Create the LocalizedBlogCategory, which fails.


        restLocalizedBlogCategoryMockMvc.perform(post("/api/localized-blog-categories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedBlogCategory)))
            .andExpect(status().isBadRequest());

        List<LocalizedBlogCategory> localizedBlogCategoryList = localizedBlogCategoryRepository.findAll();
        assertThat(localizedBlogCategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = localizedBlogCategoryRepository.findAll().size();
        // set the field null
        localizedBlogCategory.setLanguage(null);

        // Create the LocalizedBlogCategory, which fails.


        restLocalizedBlogCategoryMockMvc.perform(post("/api/localized-blog-categories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedBlogCategory)))
            .andExpect(status().isBadRequest());

        List<LocalizedBlogCategory> localizedBlogCategoryList = localizedBlogCategoryRepository.findAll();
        assertThat(localizedBlogCategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLocalizedBlogCategories() throws Exception {
        // Initialize the database
        localizedBlogCategoryRepository.saveAndFlush(localizedBlogCategory);

        // Get all the localizedBlogCategoryList
        restLocalizedBlogCategoryMockMvc.perform(get("/api/localized-blog-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(localizedBlogCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getLocalizedBlogCategory() throws Exception {
        // Initialize the database
        localizedBlogCategoryRepository.saveAndFlush(localizedBlogCategory);

        // Get the localizedBlogCategory
        restLocalizedBlogCategoryMockMvc.perform(get("/api/localized-blog-categories/{id}", localizedBlogCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(localizedBlogCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingLocalizedBlogCategory() throws Exception {
        // Get the localizedBlogCategory
        restLocalizedBlogCategoryMockMvc.perform(get("/api/localized-blog-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLocalizedBlogCategory() throws Exception {
        // Initialize the database
        localizedBlogCategoryRepository.saveAndFlush(localizedBlogCategory);

        int databaseSizeBeforeUpdate = localizedBlogCategoryRepository.findAll().size();

        // Update the localizedBlogCategory
        LocalizedBlogCategory updatedLocalizedBlogCategory = localizedBlogCategoryRepository.findById(localizedBlogCategory.getId()).get();
        // Disconnect from session so that the updates on updatedLocalizedBlogCategory are not directly saved in db
        em.detach(updatedLocalizedBlogCategory);
        updatedLocalizedBlogCategory
            .name(UPDATED_NAME)
            .language(UPDATED_LANGUAGE);

        restLocalizedBlogCategoryMockMvc.perform(put("/api/localized-blog-categories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLocalizedBlogCategory)))
            .andExpect(status().isOk());

        // Validate the LocalizedBlogCategory in the database
        List<LocalizedBlogCategory> localizedBlogCategoryList = localizedBlogCategoryRepository.findAll();
        assertThat(localizedBlogCategoryList).hasSize(databaseSizeBeforeUpdate);
        LocalizedBlogCategory testLocalizedBlogCategory = localizedBlogCategoryList.get(localizedBlogCategoryList.size() - 1);
        assertThat(testLocalizedBlogCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testLocalizedBlogCategory.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingLocalizedBlogCategory() throws Exception {
        int databaseSizeBeforeUpdate = localizedBlogCategoryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalizedBlogCategoryMockMvc.perform(put("/api/localized-blog-categories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedBlogCategory)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedBlogCategory in the database
        List<LocalizedBlogCategory> localizedBlogCategoryList = localizedBlogCategoryRepository.findAll();
        assertThat(localizedBlogCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLocalizedBlogCategory() throws Exception {
        // Initialize the database
        localizedBlogCategoryRepository.saveAndFlush(localizedBlogCategory);

        int databaseSizeBeforeDelete = localizedBlogCategoryRepository.findAll().size();

        // Delete the localizedBlogCategory
        restLocalizedBlogCategoryMockMvc.perform(delete("/api/localized-blog-categories/{id}", localizedBlogCategory.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LocalizedBlogCategory> localizedBlogCategoryList = localizedBlogCategoryRepository.findAll();
        assertThat(localizedBlogCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
