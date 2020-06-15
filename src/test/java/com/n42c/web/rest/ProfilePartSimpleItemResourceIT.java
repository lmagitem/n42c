package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.ProfilePartSimpleItem;
import com.n42c.repository.ProfilePartSimpleItemRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProfilePartSimpleItemResource} REST controller.
 */
@SpringBootTest(classes = { N42CApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class ProfilePartSimpleItemResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_SUB_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_SUB_TITLE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private ProfilePartSimpleItemRepository profilePartSimpleItemRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProfilePartSimpleItemMockMvc;

    private ProfilePartSimpleItem profilePartSimpleItem;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfilePartSimpleItem createEntity(EntityManager em) {
        ProfilePartSimpleItem profilePartSimpleItem = new ProfilePartSimpleItem()
            .title(DEFAULT_TITLE)
            .subTitle(DEFAULT_SUB_TITLE)
            .date(DEFAULT_DATE)
            .content(DEFAULT_CONTENT);
        return profilePartSimpleItem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfilePartSimpleItem createUpdatedEntity(EntityManager em) {
        ProfilePartSimpleItem profilePartSimpleItem = new ProfilePartSimpleItem()
            .title(UPDATED_TITLE)
            .subTitle(UPDATED_SUB_TITLE)
            .date(UPDATED_DATE)
            .content(UPDATED_CONTENT);
        return profilePartSimpleItem;
    }

    @BeforeEach
    public void initTest() {
        profilePartSimpleItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfilePartSimpleItem() throws Exception {
        int databaseSizeBeforeCreate = profilePartSimpleItemRepository.findAll().size();
        // Create the ProfilePartSimpleItem
        restProfilePartSimpleItemMockMvc.perform(post("/api/profile-part-simple-items").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartSimpleItem)))
            .andExpect(status().isCreated());

        // Validate the ProfilePartSimpleItem in the database
        List<ProfilePartSimpleItem> profilePartSimpleItemList = profilePartSimpleItemRepository.findAll();
        assertThat(profilePartSimpleItemList).hasSize(databaseSizeBeforeCreate + 1);
        ProfilePartSimpleItem testProfilePartSimpleItem = profilePartSimpleItemList.get(profilePartSimpleItemList.size() - 1);
        assertThat(testProfilePartSimpleItem.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testProfilePartSimpleItem.getSubTitle()).isEqualTo(DEFAULT_SUB_TITLE);
        assertThat(testProfilePartSimpleItem.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testProfilePartSimpleItem.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createProfilePartSimpleItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = profilePartSimpleItemRepository.findAll().size();

        // Create the ProfilePartSimpleItem with an existing ID
        profilePartSimpleItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfilePartSimpleItemMockMvc.perform(post("/api/profile-part-simple-items").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartSimpleItem)))
            .andExpect(status().isBadRequest());

        // Validate the ProfilePartSimpleItem in the database
        List<ProfilePartSimpleItem> profilePartSimpleItemList = profilePartSimpleItemRepository.findAll();
        assertThat(profilePartSimpleItemList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = profilePartSimpleItemRepository.findAll().size();
        // set the field null
        profilePartSimpleItem.setTitle(null);

        // Create the ProfilePartSimpleItem, which fails.


        restProfilePartSimpleItemMockMvc.perform(post("/api/profile-part-simple-items").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartSimpleItem)))
            .andExpect(status().isBadRequest());

        List<ProfilePartSimpleItem> profilePartSimpleItemList = profilePartSimpleItemRepository.findAll();
        assertThat(profilePartSimpleItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = profilePartSimpleItemRepository.findAll().size();
        // set the field null
        profilePartSimpleItem.setDate(null);

        // Create the ProfilePartSimpleItem, which fails.


        restProfilePartSimpleItemMockMvc.perform(post("/api/profile-part-simple-items").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartSimpleItem)))
            .andExpect(status().isBadRequest());

        List<ProfilePartSimpleItem> profilePartSimpleItemList = profilePartSimpleItemRepository.findAll();
        assertThat(profilePartSimpleItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProfilePartSimpleItems() throws Exception {
        // Initialize the database
        profilePartSimpleItemRepository.saveAndFlush(profilePartSimpleItem);

        // Get all the profilePartSimpleItemList
        restProfilePartSimpleItemMockMvc.perform(get("/api/profile-part-simple-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profilePartSimpleItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].subTitle").value(hasItem(DEFAULT_SUB_TITLE)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)));
    }
    
    @Test
    @Transactional
    public void getProfilePartSimpleItem() throws Exception {
        // Initialize the database
        profilePartSimpleItemRepository.saveAndFlush(profilePartSimpleItem);

        // Get the profilePartSimpleItem
        restProfilePartSimpleItemMockMvc.perform(get("/api/profile-part-simple-items/{id}", profilePartSimpleItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(profilePartSimpleItem.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.subTitle").value(DEFAULT_SUB_TITLE))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT));
    }
    @Test
    @Transactional
    public void getNonExistingProfilePartSimpleItem() throws Exception {
        // Get the profilePartSimpleItem
        restProfilePartSimpleItemMockMvc.perform(get("/api/profile-part-simple-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfilePartSimpleItem() throws Exception {
        // Initialize the database
        profilePartSimpleItemRepository.saveAndFlush(profilePartSimpleItem);

        int databaseSizeBeforeUpdate = profilePartSimpleItemRepository.findAll().size();

        // Update the profilePartSimpleItem
        ProfilePartSimpleItem updatedProfilePartSimpleItem = profilePartSimpleItemRepository.findById(profilePartSimpleItem.getId()).get();
        // Disconnect from session so that the updates on updatedProfilePartSimpleItem are not directly saved in db
        em.detach(updatedProfilePartSimpleItem);
        updatedProfilePartSimpleItem
            .title(UPDATED_TITLE)
            .subTitle(UPDATED_SUB_TITLE)
            .date(UPDATED_DATE)
            .content(UPDATED_CONTENT);

        restProfilePartSimpleItemMockMvc.perform(put("/api/profile-part-simple-items").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfilePartSimpleItem)))
            .andExpect(status().isOk());

        // Validate the ProfilePartSimpleItem in the database
        List<ProfilePartSimpleItem> profilePartSimpleItemList = profilePartSimpleItemRepository.findAll();
        assertThat(profilePartSimpleItemList).hasSize(databaseSizeBeforeUpdate);
        ProfilePartSimpleItem testProfilePartSimpleItem = profilePartSimpleItemList.get(profilePartSimpleItemList.size() - 1);
        assertThat(testProfilePartSimpleItem.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testProfilePartSimpleItem.getSubTitle()).isEqualTo(UPDATED_SUB_TITLE);
        assertThat(testProfilePartSimpleItem.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testProfilePartSimpleItem.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingProfilePartSimpleItem() throws Exception {
        int databaseSizeBeforeUpdate = profilePartSimpleItemRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfilePartSimpleItemMockMvc.perform(put("/api/profile-part-simple-items").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartSimpleItem)))
            .andExpect(status().isBadRequest());

        // Validate the ProfilePartSimpleItem in the database
        List<ProfilePartSimpleItem> profilePartSimpleItemList = profilePartSimpleItemRepository.findAll();
        assertThat(profilePartSimpleItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProfilePartSimpleItem() throws Exception {
        // Initialize the database
        profilePartSimpleItemRepository.saveAndFlush(profilePartSimpleItem);

        int databaseSizeBeforeDelete = profilePartSimpleItemRepository.findAll().size();

        // Delete the profilePartSimpleItem
        restProfilePartSimpleItemMockMvc.perform(delete("/api/profile-part-simple-items/{id}", profilePartSimpleItem.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProfilePartSimpleItem> profilePartSimpleItemList = profilePartSimpleItemRepository.findAll();
        assertThat(profilePartSimpleItemList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
