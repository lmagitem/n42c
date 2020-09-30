package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.ProfilePartLinkedExperience;
import com.n42c.repository.ProfilePartLinkedExperienceRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProfilePartLinkedExperienceResource} REST controller.
 */
@SpringBootTest(classes = { N42CApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class ProfilePartLinkedExperienceResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_SUB_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_SUB_TITLE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private ProfilePartLinkedExperienceRepository profilePartLinkedExperienceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProfilePartLinkedExperienceMockMvc;

    private ProfilePartLinkedExperience profilePartLinkedExperience;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfilePartLinkedExperience createEntity(EntityManager em) {
        ProfilePartLinkedExperience profilePartLinkedExperience = new ProfilePartLinkedExperience()
            .title(DEFAULT_TITLE)
            .subTitle(DEFAULT_SUB_TITLE)
            .date(DEFAULT_DATE)
            .content(DEFAULT_CONTENT);
        return profilePartLinkedExperience;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfilePartLinkedExperience createUpdatedEntity(EntityManager em) {
        ProfilePartLinkedExperience profilePartLinkedExperience = new ProfilePartLinkedExperience()
            .title(UPDATED_TITLE)
            .subTitle(UPDATED_SUB_TITLE)
            .date(UPDATED_DATE)
            .content(UPDATED_CONTENT);
        return profilePartLinkedExperience;
    }

    @BeforeEach
    public void initTest() {
        profilePartLinkedExperience = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfilePartLinkedExperience() throws Exception {
        int databaseSizeBeforeCreate = profilePartLinkedExperienceRepository.findAll().size();
        // Create the ProfilePartLinkedExperience
        restProfilePartLinkedExperienceMockMvc.perform(post("/api/profile-part-linked-experiences").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartLinkedExperience)))
            .andExpect(status().isCreated());

        // Validate the ProfilePartLinkedExperience in the database
        List<ProfilePartLinkedExperience> profilePartLinkedExperienceList = profilePartLinkedExperienceRepository.findAll();
        assertThat(profilePartLinkedExperienceList).hasSize(databaseSizeBeforeCreate + 1);
        ProfilePartLinkedExperience testProfilePartLinkedExperience = profilePartLinkedExperienceList.get(profilePartLinkedExperienceList.size() - 1);
        assertThat(testProfilePartLinkedExperience.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testProfilePartLinkedExperience.getSubTitle()).isEqualTo(DEFAULT_SUB_TITLE);
        assertThat(testProfilePartLinkedExperience.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testProfilePartLinkedExperience.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createProfilePartLinkedExperienceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = profilePartLinkedExperienceRepository.findAll().size();

        // Create the ProfilePartLinkedExperience with an existing ID
        profilePartLinkedExperience.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfilePartLinkedExperienceMockMvc.perform(post("/api/profile-part-linked-experiences").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartLinkedExperience)))
            .andExpect(status().isBadRequest());

        // Validate the ProfilePartLinkedExperience in the database
        List<ProfilePartLinkedExperience> profilePartLinkedExperienceList = profilePartLinkedExperienceRepository.findAll();
        assertThat(profilePartLinkedExperienceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = profilePartLinkedExperienceRepository.findAll().size();
        // set the field null
        profilePartLinkedExperience.setTitle(null);

        // Create the ProfilePartLinkedExperience, which fails.


        restProfilePartLinkedExperienceMockMvc.perform(post("/api/profile-part-linked-experiences").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartLinkedExperience)))
            .andExpect(status().isBadRequest());

        List<ProfilePartLinkedExperience> profilePartLinkedExperienceList = profilePartLinkedExperienceRepository.findAll();
        assertThat(profilePartLinkedExperienceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = profilePartLinkedExperienceRepository.findAll().size();
        // set the field null
        profilePartLinkedExperience.setDate(null);

        // Create the ProfilePartLinkedExperience, which fails.


        restProfilePartLinkedExperienceMockMvc.perform(post("/api/profile-part-linked-experiences").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartLinkedExperience)))
            .andExpect(status().isBadRequest());

        List<ProfilePartLinkedExperience> profilePartLinkedExperienceList = profilePartLinkedExperienceRepository.findAll();
        assertThat(profilePartLinkedExperienceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProfilePartLinkedExperiences() throws Exception {
        // Initialize the database
        profilePartLinkedExperienceRepository.saveAndFlush(profilePartLinkedExperience);

        // Get all the profilePartLinkedExperienceList
        restProfilePartLinkedExperienceMockMvc.perform(get("/api/profile-part-linked-experiences?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profilePartLinkedExperience.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].subTitle").value(hasItem(DEFAULT_SUB_TITLE)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }
    
    @Test
    @Transactional
    public void getProfilePartLinkedExperience() throws Exception {
        // Initialize the database
        profilePartLinkedExperienceRepository.saveAndFlush(profilePartLinkedExperience);

        // Get the profilePartLinkedExperience
        restProfilePartLinkedExperienceMockMvc.perform(get("/api/profile-part-linked-experiences/{id}", profilePartLinkedExperience.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(profilePartLinkedExperience.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.subTitle").value(DEFAULT_SUB_TITLE))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingProfilePartLinkedExperience() throws Exception {
        // Get the profilePartLinkedExperience
        restProfilePartLinkedExperienceMockMvc.perform(get("/api/profile-part-linked-experiences/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfilePartLinkedExperience() throws Exception {
        // Initialize the database
        profilePartLinkedExperienceRepository.saveAndFlush(profilePartLinkedExperience);

        int databaseSizeBeforeUpdate = profilePartLinkedExperienceRepository.findAll().size();

        // Update the profilePartLinkedExperience
        ProfilePartLinkedExperience updatedProfilePartLinkedExperience = profilePartLinkedExperienceRepository.findById(profilePartLinkedExperience.getId()).get();
        // Disconnect from session so that the updates on updatedProfilePartLinkedExperience are not directly saved in db
        em.detach(updatedProfilePartLinkedExperience);
        updatedProfilePartLinkedExperience
            .title(UPDATED_TITLE)
            .subTitle(UPDATED_SUB_TITLE)
            .date(UPDATED_DATE)
            .content(UPDATED_CONTENT);

        restProfilePartLinkedExperienceMockMvc.perform(put("/api/profile-part-linked-experiences").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfilePartLinkedExperience)))
            .andExpect(status().isOk());

        // Validate the ProfilePartLinkedExperience in the database
        List<ProfilePartLinkedExperience> profilePartLinkedExperienceList = profilePartLinkedExperienceRepository.findAll();
        assertThat(profilePartLinkedExperienceList).hasSize(databaseSizeBeforeUpdate);
        ProfilePartLinkedExperience testProfilePartLinkedExperience = profilePartLinkedExperienceList.get(profilePartLinkedExperienceList.size() - 1);
        assertThat(testProfilePartLinkedExperience.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testProfilePartLinkedExperience.getSubTitle()).isEqualTo(UPDATED_SUB_TITLE);
        assertThat(testProfilePartLinkedExperience.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testProfilePartLinkedExperience.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingProfilePartLinkedExperience() throws Exception {
        int databaseSizeBeforeUpdate = profilePartLinkedExperienceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfilePartLinkedExperienceMockMvc.perform(put("/api/profile-part-linked-experiences").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartLinkedExperience)))
            .andExpect(status().isBadRequest());

        // Validate the ProfilePartLinkedExperience in the database
        List<ProfilePartLinkedExperience> profilePartLinkedExperienceList = profilePartLinkedExperienceRepository.findAll();
        assertThat(profilePartLinkedExperienceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProfilePartLinkedExperience() throws Exception {
        // Initialize the database
        profilePartLinkedExperienceRepository.saveAndFlush(profilePartLinkedExperience);

        int databaseSizeBeforeDelete = profilePartLinkedExperienceRepository.findAll().size();

        // Delete the profilePartLinkedExperience
        restProfilePartLinkedExperienceMockMvc.perform(delete("/api/profile-part-linked-experiences/{id}", profilePartLinkedExperience.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProfilePartLinkedExperience> profilePartLinkedExperienceList = profilePartLinkedExperienceRepository.findAll();
        assertThat(profilePartLinkedExperienceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
