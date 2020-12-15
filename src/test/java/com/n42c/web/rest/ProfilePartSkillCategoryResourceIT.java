package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.ProfilePartSkillCategory;
import com.n42c.repository.ProfilePartSkillCategoryRepository;
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
 * Integration tests for the {@link ProfilePartSkillCategoryResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@AutoConfigureMockMvc
@WithMockUser
public class ProfilePartSkillCategoryResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_INDEX = 1;
    private static final Integer UPDATED_INDEX = 2;

    @Autowired
    private ProfilePartSkillCategoryRepository profilePartSkillCategoryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProfilePartSkillCategoryMockMvc;

    private ProfilePartSkillCategory profilePartSkillCategory;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfilePartSkillCategory createEntity(EntityManager em) {
        ProfilePartSkillCategory profilePartSkillCategory = new ProfilePartSkillCategory()
            .name(DEFAULT_NAME)
            .index(DEFAULT_INDEX);
        return profilePartSkillCategory;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfilePartSkillCategory createUpdatedEntity(EntityManager em) {
        ProfilePartSkillCategory profilePartSkillCategory = new ProfilePartSkillCategory()
            .name(UPDATED_NAME)
            .index(UPDATED_INDEX);
        return profilePartSkillCategory;
    }

    @BeforeEach
    public void initTest() {
        profilePartSkillCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfilePartSkillCategory() throws Exception {
        int databaseSizeBeforeCreate = profilePartSkillCategoryRepository.findAll().size();
        // Create the ProfilePartSkillCategory
        restProfilePartSkillCategoryMockMvc.perform(post("/api/profile-part-skill-categories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartSkillCategory)))
            .andExpect(status().isCreated());

        // Validate the ProfilePartSkillCategory in the database
        List<ProfilePartSkillCategory> profilePartSkillCategoryList = profilePartSkillCategoryRepository.findAll();
        assertThat(profilePartSkillCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        ProfilePartSkillCategory testProfilePartSkillCategory = profilePartSkillCategoryList.get(profilePartSkillCategoryList.size() - 1);
        assertThat(testProfilePartSkillCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testProfilePartSkillCategory.getIndex()).isEqualTo(DEFAULT_INDEX);
    }

    @Test
    @Transactional
    public void createProfilePartSkillCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = profilePartSkillCategoryRepository.findAll().size();

        // Create the ProfilePartSkillCategory with an existing ID
        profilePartSkillCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfilePartSkillCategoryMockMvc.perform(post("/api/profile-part-skill-categories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartSkillCategory)))
            .andExpect(status().isBadRequest());

        // Validate the ProfilePartSkillCategory in the database
        List<ProfilePartSkillCategory> profilePartSkillCategoryList = profilePartSkillCategoryRepository.findAll();
        assertThat(profilePartSkillCategoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = profilePartSkillCategoryRepository.findAll().size();
        // set the field null
        profilePartSkillCategory.setName(null);

        // Create the ProfilePartSkillCategory, which fails.


        restProfilePartSkillCategoryMockMvc.perform(post("/api/profile-part-skill-categories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartSkillCategory)))
            .andExpect(status().isBadRequest());

        List<ProfilePartSkillCategory> profilePartSkillCategoryList = profilePartSkillCategoryRepository.findAll();
        assertThat(profilePartSkillCategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProfilePartSkillCategories() throws Exception {
        // Initialize the database
        profilePartSkillCategoryRepository.saveAndFlush(profilePartSkillCategory);

        // Get all the profilePartSkillCategoryList
        restProfilePartSkillCategoryMockMvc.perform(get("/api/profile-part-skill-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profilePartSkillCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].index").value(hasItem(DEFAULT_INDEX)));
    }

    @Test
    @Transactional
    public void getProfilePartSkillCategory() throws Exception {
        // Initialize the database
        profilePartSkillCategoryRepository.saveAndFlush(profilePartSkillCategory);

        // Get the profilePartSkillCategory
        restProfilePartSkillCategoryMockMvc.perform(get("/api/profile-part-skill-categories/{id}", profilePartSkillCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(profilePartSkillCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.index").value(DEFAULT_INDEX));
    }

    @Test
    @Transactional
    public void getNonExistingProfilePartSkillCategory() throws Exception {
        // Get the profilePartSkillCategory
        restProfilePartSkillCategoryMockMvc.perform(get("/api/profile-part-skill-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfilePartSkillCategory() throws Exception {
        // Initialize the database
        profilePartSkillCategoryRepository.saveAndFlush(profilePartSkillCategory);

        int databaseSizeBeforeUpdate = profilePartSkillCategoryRepository.findAll().size();

        // Update the profilePartSkillCategory
        ProfilePartSkillCategory updatedProfilePartSkillCategory = profilePartSkillCategoryRepository.findById(profilePartSkillCategory.getId()).get();
        // Disconnect from session so that the updates on updatedProfilePartSkillCategory are not directly saved in db
        em.detach(updatedProfilePartSkillCategory);
        updatedProfilePartSkillCategory
            .name(UPDATED_NAME)
            .index(UPDATED_INDEX);

        restProfilePartSkillCategoryMockMvc.perform(put("/api/profile-part-skill-categories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfilePartSkillCategory)))
            .andExpect(status().isOk());

        // Validate the ProfilePartSkillCategory in the database
        List<ProfilePartSkillCategory> profilePartSkillCategoryList = profilePartSkillCategoryRepository.findAll();
        assertThat(profilePartSkillCategoryList).hasSize(databaseSizeBeforeUpdate);
        ProfilePartSkillCategory testProfilePartSkillCategory = profilePartSkillCategoryList.get(profilePartSkillCategoryList.size() - 1);
        assertThat(testProfilePartSkillCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testProfilePartSkillCategory.getIndex()).isEqualTo(UPDATED_INDEX);
    }

    @Test
    @Transactional
    public void updateNonExistingProfilePartSkillCategory() throws Exception {
        int databaseSizeBeforeUpdate = profilePartSkillCategoryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfilePartSkillCategoryMockMvc.perform(put("/api/profile-part-skill-categories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartSkillCategory)))
            .andExpect(status().isBadRequest());

        // Validate the ProfilePartSkillCategory in the database
        List<ProfilePartSkillCategory> profilePartSkillCategoryList = profilePartSkillCategoryRepository.findAll();
        assertThat(profilePartSkillCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProfilePartSkillCategory() throws Exception {
        // Initialize the database
        profilePartSkillCategoryRepository.saveAndFlush(profilePartSkillCategory);

        int databaseSizeBeforeDelete = profilePartSkillCategoryRepository.findAll().size();

        // Delete the profilePartSkillCategory
        restProfilePartSkillCategoryMockMvc.perform(delete("/api/profile-part-skill-categories/{id}", profilePartSkillCategory.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProfilePartSkillCategory> profilePartSkillCategoryList = profilePartSkillCategoryRepository.findAll();
        assertThat(profilePartSkillCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
