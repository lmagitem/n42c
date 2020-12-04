package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.ProfilePart;
import com.n42c.domain.enumeration.ProfilePartOrderType;
import com.n42c.domain.enumeration.ProfilePartType;
import com.n42c.repository.ProfilePartRepository;
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
 * Integration tests for the {@link ProfilePartResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@AutoConfigureMockMvc
@WithMockUser
public class ProfilePartResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final ProfilePartType DEFAULT_TYPE = ProfilePartType.ED;
    private static final ProfilePartType UPDATED_TYPE = ProfilePartType.PR;

    private static final Integer DEFAULT_INDEX = 1;
    private static final Integer UPDATED_INDEX = 2;

    private static final ProfilePartOrderType DEFAULT_ORDER = ProfilePartOrderType.AZA;
    private static final ProfilePartOrderType UPDATED_ORDER = ProfilePartOrderType.AZD;

    @Autowired
    private ProfilePartRepository profilePartRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProfilePartMockMvc;

    private ProfilePart profilePart;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfilePart createEntity(EntityManager em) {
        ProfilePart profilePart = new ProfilePart()
            .title(DEFAULT_TITLE)
            .type(DEFAULT_TYPE)
            .index(DEFAULT_INDEX)
            .order(DEFAULT_ORDER);
        return profilePart;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfilePart createUpdatedEntity(EntityManager em) {
        ProfilePart profilePart = new ProfilePart()
            .title(UPDATED_TITLE)
            .type(UPDATED_TYPE)
            .index(UPDATED_INDEX)
            .order(UPDATED_ORDER);
        return profilePart;
    }

    @BeforeEach
    public void initTest() {
        profilePart = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfilePart() throws Exception {
        int databaseSizeBeforeCreate = profilePartRepository.findAll().size();
        // Create the ProfilePart
        restProfilePartMockMvc.perform(post("/api/profile-parts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePart)))
            .andExpect(status().isCreated());

        // Validate the ProfilePart in the database
        List<ProfilePart> profilePartList = profilePartRepository.findAll();
        assertThat(profilePartList).hasSize(databaseSizeBeforeCreate + 1);
        ProfilePart testProfilePart = profilePartList.get(profilePartList.size() - 1);
        assertThat(testProfilePart.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testProfilePart.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testProfilePart.getIndex()).isEqualTo(DEFAULT_INDEX);
        assertThat(testProfilePart.getOrder()).isEqualTo(DEFAULT_ORDER);
    }

    @Test
    @Transactional
    public void createProfilePartWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = profilePartRepository.findAll().size();

        // Create the ProfilePart with an existing ID
        profilePart.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfilePartMockMvc.perform(post("/api/profile-parts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePart)))
            .andExpect(status().isBadRequest());

        // Validate the ProfilePart in the database
        List<ProfilePart> profilePartList = profilePartRepository.findAll();
        assertThat(profilePartList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = profilePartRepository.findAll().size();
        // set the field null
        profilePart.setTitle(null);

        // Create the ProfilePart, which fails.


        restProfilePartMockMvc.perform(post("/api/profile-parts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePart)))
            .andExpect(status().isBadRequest());

        List<ProfilePart> profilePartList = profilePartRepository.findAll();
        assertThat(profilePartList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = profilePartRepository.findAll().size();
        // set the field null
        profilePart.setType(null);

        // Create the ProfilePart, which fails.


        restProfilePartMockMvc.perform(post("/api/profile-parts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePart)))
            .andExpect(status().isBadRequest());

        List<ProfilePart> profilePartList = profilePartRepository.findAll();
        assertThat(profilePartList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOrderIsRequired() throws Exception {
        int databaseSizeBeforeTest = profilePartRepository.findAll().size();
        // set the field null
        profilePart.setOrder(null);

        // Create the ProfilePart, which fails.


        restProfilePartMockMvc.perform(post("/api/profile-parts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePart)))
            .andExpect(status().isBadRequest());

        List<ProfilePart> profilePartList = profilePartRepository.findAll();
        assertThat(profilePartList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProfileParts() throws Exception {
        // Initialize the database
        profilePartRepository.saveAndFlush(profilePart);

        // Get all the profilePartList
        restProfilePartMockMvc.perform(get("/api/profile-parts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profilePart.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].index").value(hasItem(DEFAULT_INDEX)))
            .andExpect(jsonPath("$.[*].order").value(hasItem(DEFAULT_ORDER.toString())));
    }

    @Test
    @Transactional
    public void getProfilePart() throws Exception {
        // Initialize the database
        profilePartRepository.saveAndFlush(profilePart);

        // Get the profilePart
        restProfilePartMockMvc.perform(get("/api/profile-parts/{id}", profilePart.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(profilePart.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.index").value(DEFAULT_INDEX))
            .andExpect(jsonPath("$.order").value(DEFAULT_ORDER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProfilePart() throws Exception {
        // Get the profilePart
        restProfilePartMockMvc.perform(get("/api/profile-parts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfilePart() throws Exception {
        // Initialize the database
        profilePartRepository.saveAndFlush(profilePart);

        int databaseSizeBeforeUpdate = profilePartRepository.findAll().size();

        // Update the profilePart
        ProfilePart updatedProfilePart = profilePartRepository.findById(profilePart.getId()).get();
        // Disconnect from session so that the updates on updatedProfilePart are not directly saved in db
        em.detach(updatedProfilePart);
        updatedProfilePart
            .title(UPDATED_TITLE)
            .type(UPDATED_TYPE)
            .index(UPDATED_INDEX)
            .order(UPDATED_ORDER);

        restProfilePartMockMvc.perform(put("/api/profile-parts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfilePart)))
            .andExpect(status().isOk());

        // Validate the ProfilePart in the database
        List<ProfilePart> profilePartList = profilePartRepository.findAll();
        assertThat(profilePartList).hasSize(databaseSizeBeforeUpdate);
        ProfilePart testProfilePart = profilePartList.get(profilePartList.size() - 1);
        assertThat(testProfilePart.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testProfilePart.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testProfilePart.getIndex()).isEqualTo(UPDATED_INDEX);
        assertThat(testProfilePart.getOrder()).isEqualTo(UPDATED_ORDER);
    }

    @Test
    @Transactional
    public void updateNonExistingProfilePart() throws Exception {
        int databaseSizeBeforeUpdate = profilePartRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfilePartMockMvc.perform(put("/api/profile-parts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePart)))
            .andExpect(status().isBadRequest());

        // Validate the ProfilePart in the database
        List<ProfilePart> profilePartList = profilePartRepository.findAll();
        assertThat(profilePartList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProfilePart() throws Exception {
        // Initialize the database
        profilePartRepository.saveAndFlush(profilePart);

        int databaseSizeBeforeDelete = profilePartRepository.findAll().size();

        // Delete the profilePart
        restProfilePartMockMvc.perform(delete("/api/profile-parts/{id}", profilePart.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProfilePart> profilePartList = profilePartRepository.findAll();
        assertThat(profilePartList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
