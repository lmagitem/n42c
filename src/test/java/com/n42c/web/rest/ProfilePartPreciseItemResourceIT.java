package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.ProfilePartPreciseItem;
import com.n42c.repository.ProfilePartPreciseItemRepository;

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
 * Integration tests for the {@link ProfilePartPreciseItemResource} REST controller.
 */
@SpringBootTest(classes = { N42CApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class ProfilePartPreciseItemResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_SUB_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_SUB_TITLE = "BBBBBBBBBB";

    private static final Instant DEFAULT_START = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_LOCATION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_LOCATION_LAT = 1D;
    private static final Double UPDATED_LOCATION_LAT = 2D;

    private static final Double DEFAULT_LOCATION_LONG = 1D;
    private static final Double UPDATED_LOCATION_LONG = 2D;

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private ProfilePartPreciseItemRepository profilePartPreciseItemRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProfilePartPreciseItemMockMvc;

    private ProfilePartPreciseItem profilePartPreciseItem;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfilePartPreciseItem createEntity(EntityManager em) {
        ProfilePartPreciseItem profilePartPreciseItem = new ProfilePartPreciseItem()
            .title(DEFAULT_TITLE)
            .subTitle(DEFAULT_SUB_TITLE)
            .start(DEFAULT_START)
            .end(DEFAULT_END)
            .locationName(DEFAULT_LOCATION_NAME)
            .locationLat(DEFAULT_LOCATION_LAT)
            .locationLong(DEFAULT_LOCATION_LONG)
            .content(DEFAULT_CONTENT);
        return profilePartPreciseItem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfilePartPreciseItem createUpdatedEntity(EntityManager em) {
        ProfilePartPreciseItem profilePartPreciseItem = new ProfilePartPreciseItem()
            .title(UPDATED_TITLE)
            .subTitle(UPDATED_SUB_TITLE)
            .start(UPDATED_START)
            .end(UPDATED_END)
            .locationName(UPDATED_LOCATION_NAME)
            .locationLat(UPDATED_LOCATION_LAT)
            .locationLong(UPDATED_LOCATION_LONG)
            .content(UPDATED_CONTENT);
        return profilePartPreciseItem;
    }

    @BeforeEach
    public void initTest() {
        profilePartPreciseItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfilePartPreciseItem() throws Exception {
        int databaseSizeBeforeCreate = profilePartPreciseItemRepository.findAll().size();
        // Create the ProfilePartPreciseItem
        restProfilePartPreciseItemMockMvc.perform(post("/api/profile-part-precise-items").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartPreciseItem)))
            .andExpect(status().isCreated());

        // Validate the ProfilePartPreciseItem in the database
        List<ProfilePartPreciseItem> profilePartPreciseItemList = profilePartPreciseItemRepository.findAll();
        assertThat(profilePartPreciseItemList).hasSize(databaseSizeBeforeCreate + 1);
        ProfilePartPreciseItem testProfilePartPreciseItem = profilePartPreciseItemList.get(profilePartPreciseItemList.size() - 1);
        assertThat(testProfilePartPreciseItem.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testProfilePartPreciseItem.getSubTitle()).isEqualTo(DEFAULT_SUB_TITLE);
        assertThat(testProfilePartPreciseItem.getStart()).isEqualTo(DEFAULT_START);
        assertThat(testProfilePartPreciseItem.getEnd()).isEqualTo(DEFAULT_END);
        assertThat(testProfilePartPreciseItem.getLocationName()).isEqualTo(DEFAULT_LOCATION_NAME);
        assertThat(testProfilePartPreciseItem.getLocationLat()).isEqualTo(DEFAULT_LOCATION_LAT);
        assertThat(testProfilePartPreciseItem.getLocationLong()).isEqualTo(DEFAULT_LOCATION_LONG);
        assertThat(testProfilePartPreciseItem.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createProfilePartPreciseItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = profilePartPreciseItemRepository.findAll().size();

        // Create the ProfilePartPreciseItem with an existing ID
        profilePartPreciseItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfilePartPreciseItemMockMvc.perform(post("/api/profile-part-precise-items").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartPreciseItem)))
            .andExpect(status().isBadRequest());

        // Validate the ProfilePartPreciseItem in the database
        List<ProfilePartPreciseItem> profilePartPreciseItemList = profilePartPreciseItemRepository.findAll();
        assertThat(profilePartPreciseItemList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = profilePartPreciseItemRepository.findAll().size();
        // set the field null
        profilePartPreciseItem.setTitle(null);

        // Create the ProfilePartPreciseItem, which fails.


        restProfilePartPreciseItemMockMvc.perform(post("/api/profile-part-precise-items").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartPreciseItem)))
            .andExpect(status().isBadRequest());

        List<ProfilePartPreciseItem> profilePartPreciseItemList = profilePartPreciseItemRepository.findAll();
        assertThat(profilePartPreciseItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartIsRequired() throws Exception {
        int databaseSizeBeforeTest = profilePartPreciseItemRepository.findAll().size();
        // set the field null
        profilePartPreciseItem.setStart(null);

        // Create the ProfilePartPreciseItem, which fails.


        restProfilePartPreciseItemMockMvc.perform(post("/api/profile-part-precise-items").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartPreciseItem)))
            .andExpect(status().isBadRequest());

        List<ProfilePartPreciseItem> profilePartPreciseItemList = profilePartPreciseItemRepository.findAll();
        assertThat(profilePartPreciseItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProfilePartPreciseItems() throws Exception {
        // Initialize the database
        profilePartPreciseItemRepository.saveAndFlush(profilePartPreciseItem);

        // Get all the profilePartPreciseItemList
        restProfilePartPreciseItemMockMvc.perform(get("/api/profile-part-precise-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profilePartPreciseItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].subTitle").value(hasItem(DEFAULT_SUB_TITLE)))
            .andExpect(jsonPath("$.[*].start").value(hasItem(DEFAULT_START.toString())))
            .andExpect(jsonPath("$.[*].end").value(hasItem(DEFAULT_END.toString())))
            .andExpect(jsonPath("$.[*].locationName").value(hasItem(DEFAULT_LOCATION_NAME)))
            .andExpect(jsonPath("$.[*].locationLat").value(hasItem(DEFAULT_LOCATION_LAT.doubleValue())))
            .andExpect(jsonPath("$.[*].locationLong").value(hasItem(DEFAULT_LOCATION_LONG.doubleValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }
    
    @Test
    @Transactional
    public void getProfilePartPreciseItem() throws Exception {
        // Initialize the database
        profilePartPreciseItemRepository.saveAndFlush(profilePartPreciseItem);

        // Get the profilePartPreciseItem
        restProfilePartPreciseItemMockMvc.perform(get("/api/profile-part-precise-items/{id}", profilePartPreciseItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(profilePartPreciseItem.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.subTitle").value(DEFAULT_SUB_TITLE))
            .andExpect(jsonPath("$.start").value(DEFAULT_START.toString()))
            .andExpect(jsonPath("$.end").value(DEFAULT_END.toString()))
            .andExpect(jsonPath("$.locationName").value(DEFAULT_LOCATION_NAME))
            .andExpect(jsonPath("$.locationLat").value(DEFAULT_LOCATION_LAT.doubleValue()))
            .andExpect(jsonPath("$.locationLong").value(DEFAULT_LOCATION_LONG.doubleValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingProfilePartPreciseItem() throws Exception {
        // Get the profilePartPreciseItem
        restProfilePartPreciseItemMockMvc.perform(get("/api/profile-part-precise-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfilePartPreciseItem() throws Exception {
        // Initialize the database
        profilePartPreciseItemRepository.saveAndFlush(profilePartPreciseItem);

        int databaseSizeBeforeUpdate = profilePartPreciseItemRepository.findAll().size();

        // Update the profilePartPreciseItem
        ProfilePartPreciseItem updatedProfilePartPreciseItem = profilePartPreciseItemRepository.findById(profilePartPreciseItem.getId()).get();
        // Disconnect from session so that the updates on updatedProfilePartPreciseItem are not directly saved in db
        em.detach(updatedProfilePartPreciseItem);
        updatedProfilePartPreciseItem
            .title(UPDATED_TITLE)
            .subTitle(UPDATED_SUB_TITLE)
            .start(UPDATED_START)
            .end(UPDATED_END)
            .locationName(UPDATED_LOCATION_NAME)
            .locationLat(UPDATED_LOCATION_LAT)
            .locationLong(UPDATED_LOCATION_LONG)
            .content(UPDATED_CONTENT);

        restProfilePartPreciseItemMockMvc.perform(put("/api/profile-part-precise-items").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfilePartPreciseItem)))
            .andExpect(status().isOk());

        // Validate the ProfilePartPreciseItem in the database
        List<ProfilePartPreciseItem> profilePartPreciseItemList = profilePartPreciseItemRepository.findAll();
        assertThat(profilePartPreciseItemList).hasSize(databaseSizeBeforeUpdate);
        ProfilePartPreciseItem testProfilePartPreciseItem = profilePartPreciseItemList.get(profilePartPreciseItemList.size() - 1);
        assertThat(testProfilePartPreciseItem.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testProfilePartPreciseItem.getSubTitle()).isEqualTo(UPDATED_SUB_TITLE);
        assertThat(testProfilePartPreciseItem.getStart()).isEqualTo(UPDATED_START);
        assertThat(testProfilePartPreciseItem.getEnd()).isEqualTo(UPDATED_END);
        assertThat(testProfilePartPreciseItem.getLocationName()).isEqualTo(UPDATED_LOCATION_NAME);
        assertThat(testProfilePartPreciseItem.getLocationLat()).isEqualTo(UPDATED_LOCATION_LAT);
        assertThat(testProfilePartPreciseItem.getLocationLong()).isEqualTo(UPDATED_LOCATION_LONG);
        assertThat(testProfilePartPreciseItem.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingProfilePartPreciseItem() throws Exception {
        int databaseSizeBeforeUpdate = profilePartPreciseItemRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfilePartPreciseItemMockMvc.perform(put("/api/profile-part-precise-items").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profilePartPreciseItem)))
            .andExpect(status().isBadRequest());

        // Validate the ProfilePartPreciseItem in the database
        List<ProfilePartPreciseItem> profilePartPreciseItemList = profilePartPreciseItemRepository.findAll();
        assertThat(profilePartPreciseItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProfilePartPreciseItem() throws Exception {
        // Initialize the database
        profilePartPreciseItemRepository.saveAndFlush(profilePartPreciseItem);

        int databaseSizeBeforeDelete = profilePartPreciseItemRepository.findAll().size();

        // Delete the profilePartPreciseItem
        restProfilePartPreciseItemMockMvc.perform(delete("/api/profile-part-precise-items/{id}", profilePartPreciseItem.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProfilePartPreciseItem> profilePartPreciseItemList = profilePartPreciseItemRepository.findAll();
        assertThat(profilePartPreciseItemList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
