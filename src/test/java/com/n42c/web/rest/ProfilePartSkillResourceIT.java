package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.ProfilePartSkill;
import com.n42c.domain.enumerations.LevelOfMastery;
import com.n42c.repository.ProfilePartSkillRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProfilePartSkillResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProfilePartSkillResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_INDEX = 1;
    private static final Integer UPDATED_INDEX = 2;

    private static final LevelOfMastery DEFAULT_LEVEL = LevelOfMastery.DA;
    private static final LevelOfMastery UPDATED_LEVEL = LevelOfMastery.NO;

    @Autowired
    private ProfilePartSkillRepository profilePartSkillRepository;

    @Mock
    private ProfilePartSkillRepository profilePartSkillRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProfilePartSkillMockMvc;

    private ProfilePartSkill profilePartSkill;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfilePartSkill createEntity(EntityManager em) {
        ProfilePartSkill profilePartSkill = new ProfilePartSkill()
            .name(DEFAULT_NAME)
            .index(DEFAULT_INDEX)
            .level(DEFAULT_LEVEL);
        return profilePartSkill;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfilePartSkill createUpdatedEntity(EntityManager em) {
        ProfilePartSkill profilePartSkill = new ProfilePartSkill()
            .name(UPDATED_NAME)
            .index(UPDATED_INDEX)
            .level(UPDATED_LEVEL);
        return profilePartSkill;
    }

    @BeforeEach
    public void initTest() {
        profilePartSkill = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfilePartSkill() throws Exception {
        int databaseSizeBeforeCreate = profilePartSkillRepository.findAll().size();
        // Create the ProfilePartSkill
        restProfilePartSkillMockMvc.perform(post("/api/profile-part-skills").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartSkill)))
            .andExpect(status().isCreated());

        // Validate the ProfilePartSkill in the database
        List<ProfilePartSkill> profilePartSkillList = profilePartSkillRepository.findAll();
        assertThat(profilePartSkillList).hasSize(databaseSizeBeforeCreate + 1);
        ProfilePartSkill testProfilePartSkill = profilePartSkillList.get(profilePartSkillList.size() - 1);
        assertThat(testProfilePartSkill.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testProfilePartSkill.getIndex()).isEqualTo(DEFAULT_INDEX);
        assertThat(testProfilePartSkill.getLevel()).isEqualTo(DEFAULT_LEVEL);
    }

    @Test
    @Transactional
    public void createProfilePartSkillWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = profilePartSkillRepository.findAll().size();

        // Create the ProfilePartSkill with an existing ID
        profilePartSkill.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfilePartSkillMockMvc.perform(post("/api/profile-part-skills").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartSkill)))
            .andExpect(status().isBadRequest());

        // Validate the ProfilePartSkill in the database
        List<ProfilePartSkill> profilePartSkillList = profilePartSkillRepository.findAll();
        assertThat(profilePartSkillList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = profilePartSkillRepository.findAll().size();
        // set the field null
        profilePartSkill.setName(null);

        // Create the ProfilePartSkill, which fails.


        restProfilePartSkillMockMvc.perform(post("/api/profile-part-skills").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartSkill)))
            .andExpect(status().isBadRequest());

        List<ProfilePartSkill> profilePartSkillList = profilePartSkillRepository.findAll();
        assertThat(profilePartSkillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLevelIsRequired() throws Exception {
        int databaseSizeBeforeTest = profilePartSkillRepository.findAll().size();
        // set the field null
        profilePartSkill.setLevel(null);

        // Create the ProfilePartSkill, which fails.


        restProfilePartSkillMockMvc.perform(post("/api/profile-part-skills").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartSkill)))
            .andExpect(status().isBadRequest());

        List<ProfilePartSkill> profilePartSkillList = profilePartSkillRepository.findAll();
        assertThat(profilePartSkillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProfilePartSkills() throws Exception {
        // Initialize the database
        profilePartSkillRepository.saveAndFlush(profilePartSkill);

        // Get all the profilePartSkillList
        restProfilePartSkillMockMvc.perform(get("/api/profile-part-skills?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profilePartSkill.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].index").value(hasItem(DEFAULT_INDEX)))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL.toString())));
    }

    @SuppressWarnings({"unchecked"})
    public void getAllProfilePartSkillsWithEagerRelationshipsIsEnabled() throws Exception {
        when(profilePartSkillRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restProfilePartSkillMockMvc.perform(get("/api/profile-part-skills?eagerload=true"))
            .andExpect(status().isOk());

        verify(profilePartSkillRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllProfilePartSkillsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(profilePartSkillRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restProfilePartSkillMockMvc.perform(get("/api/profile-part-skills?eagerload=true"))
            .andExpect(status().isOk());

        verify(profilePartSkillRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getProfilePartSkill() throws Exception {
        // Initialize the database
        profilePartSkillRepository.saveAndFlush(profilePartSkill);

        // Get the profilePartSkill
        restProfilePartSkillMockMvc.perform(get("/api/profile-part-skills/{id}", profilePartSkill.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(profilePartSkill.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.index").value(DEFAULT_INDEX))
            .andExpect(jsonPath("$.level").value(DEFAULT_LEVEL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProfilePartSkill() throws Exception {
        // Get the profilePartSkill
        restProfilePartSkillMockMvc.perform(get("/api/profile-part-skills/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfilePartSkill() throws Exception {
        // Initialize the database
        profilePartSkillRepository.saveAndFlush(profilePartSkill);

        int databaseSizeBeforeUpdate = profilePartSkillRepository.findAll().size();

        // Update the profilePartSkill
        ProfilePartSkill updatedProfilePartSkill = profilePartSkillRepository.findById(profilePartSkill.getId()).get();
        // Disconnect from session so that the updates on updatedProfilePartSkill are not directly saved in db
        em.detach(updatedProfilePartSkill);
        updatedProfilePartSkill
            .name(UPDATED_NAME)
            .index(UPDATED_INDEX)
            .level(UPDATED_LEVEL);

        restProfilePartSkillMockMvc.perform(put("/api/profile-part-skills").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfilePartSkill)))
            .andExpect(status().isOk());

        // Validate the ProfilePartSkill in the database
        List<ProfilePartSkill> profilePartSkillList = profilePartSkillRepository.findAll();
        assertThat(profilePartSkillList).hasSize(databaseSizeBeforeUpdate);
        ProfilePartSkill testProfilePartSkill = profilePartSkillList.get(profilePartSkillList.size() - 1);
        assertThat(testProfilePartSkill.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testProfilePartSkill.getIndex()).isEqualTo(UPDATED_INDEX);
        assertThat(testProfilePartSkill.getLevel()).isEqualTo(UPDATED_LEVEL);
    }

    @Test
    @Transactional
    public void updateNonExistingProfilePartSkill() throws Exception {
        int databaseSizeBeforeUpdate = profilePartSkillRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfilePartSkillMockMvc.perform(put("/api/profile-part-skills").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartSkill)))
            .andExpect(status().isBadRequest());

        // Validate the ProfilePartSkill in the database
        List<ProfilePartSkill> profilePartSkillList = profilePartSkillRepository.findAll();
        assertThat(profilePartSkillList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProfilePartSkill() throws Exception {
        // Initialize the database
        profilePartSkillRepository.saveAndFlush(profilePartSkill);

        int databaseSizeBeforeDelete = profilePartSkillRepository.findAll().size();

        // Delete the profilePartSkill
        restProfilePartSkillMockMvc.perform(delete("/api/profile-part-skills/{id}", profilePartSkill.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProfilePartSkill> profilePartSkillList = profilePartSkillRepository.findAll();
        assertThat(profilePartSkillList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
