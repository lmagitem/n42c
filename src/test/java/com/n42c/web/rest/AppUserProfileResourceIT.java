package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.AppUser;
import com.n42c.domain.AppUserProfile;
import com.n42c.domain.enumerations.Language;
import com.n42c.repository.AppUserProfileRepository;
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
 * Integration tests for the {@link AppUserProfileResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@AutoConfigureMockMvc
@WithMockUser
public class AppUserProfileResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_SUMMARY = "AAAAAAAAAA";
    private static final String UPDATED_SUMMARY = "BBBBBBBBBB";

    private static final String DEFAULT_HEADER_BACKGROUND_URI = "AAAAAAAAAA";
    private static final String UPDATED_HEADER_BACKGROUND_URI = "BBBBBBBBBB";

    private static final Language DEFAULT_LANGUAGE = Language.EN;
    private static final Language UPDATED_LANGUAGE = Language.FR;

    @Autowired
    private AppUserProfileRepository appUserProfileRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAppUserProfileMockMvc;

    private AppUserProfile appUserProfile;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AppUserProfile createEntity(EntityManager em) {
        AppUserProfile appUserProfile = new AppUserProfile()
            .name(DEFAULT_NAME)
            .title(DEFAULT_TITLE)
            .summary(DEFAULT_SUMMARY)
            .headerBackgroundURI(DEFAULT_HEADER_BACKGROUND_URI)
            .language(DEFAULT_LANGUAGE);
        // Add required entity
        AppUser appUser;
        if (TestUtil.findAll(em, AppUser.class).isEmpty()) {
            appUser = AppUserResourceIT.createEntity(em);
            em.persist(appUser);
            em.flush();
        } else {
            appUser = TestUtil.findAll(em, AppUser.class).get(0);
        }
        appUserProfile.setUser(appUser);
        return appUserProfile;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AppUserProfile createUpdatedEntity(EntityManager em) {
        AppUserProfile appUserProfile = new AppUserProfile()
            .name(UPDATED_NAME)
            .title(UPDATED_TITLE)
            .summary(UPDATED_SUMMARY)
            .headerBackgroundURI(UPDATED_HEADER_BACKGROUND_URI)
            .language(UPDATED_LANGUAGE);
        // Add required entity
        AppUser appUser;
        if (TestUtil.findAll(em, AppUser.class).isEmpty()) {
            appUser = AppUserResourceIT.createUpdatedEntity(em);
            em.persist(appUser);
            em.flush();
        } else {
            appUser = TestUtil.findAll(em, AppUser.class).get(0);
        }
        appUserProfile.setUser(appUser);
        return appUserProfile;
    }

    @BeforeEach
    public void initTest() {
        appUserProfile = createEntity(em);
    }

    @Test
    @Transactional
    public void createAppUserProfile() throws Exception {
        int databaseSizeBeforeCreate = appUserProfileRepository.findAll().size();
        // Create the AppUserProfile
        restAppUserProfileMockMvc.perform(post("/api/app-user-profiles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(appUserProfile)))
            .andExpect(status().isCreated());

        // Validate the AppUserProfile in the database
        List<AppUserProfile> appUserProfileList = appUserProfileRepository.findAll();
        assertThat(appUserProfileList).hasSize(databaseSizeBeforeCreate + 1);
        AppUserProfile testAppUserProfile = appUserProfileList.get(appUserProfileList.size() - 1);
        assertThat(testAppUserProfile.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAppUserProfile.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testAppUserProfile.getSummary()).isEqualTo(DEFAULT_SUMMARY);
        assertThat(testAppUserProfile.getHeaderBackgroundURI()).isEqualTo(DEFAULT_HEADER_BACKGROUND_URI);
        assertThat(testAppUserProfile.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
    }

    @Test
    @Transactional
    public void createAppUserProfileWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = appUserProfileRepository.findAll().size();

        // Create the AppUserProfile with an existing ID
        appUserProfile.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAppUserProfileMockMvc.perform(post("/api/app-user-profiles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(appUserProfile)))
            .andExpect(status().isBadRequest());

        // Validate the AppUserProfile in the database
        List<AppUserProfile> appUserProfileList = appUserProfileRepository.findAll();
        assertThat(appUserProfileList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = appUserProfileRepository.findAll().size();
        // set the field null
        appUserProfile.setName(null);

        // Create the AppUserProfile, which fails.


        restAppUserProfileMockMvc.perform(post("/api/app-user-profiles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(appUserProfile)))
            .andExpect(status().isBadRequest());

        List<AppUserProfile> appUserProfileList = appUserProfileRepository.findAll();
        assertThat(appUserProfileList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAppUserProfiles() throws Exception {
        // Initialize the database
        appUserProfileRepository.saveAndFlush(appUserProfile);

        // Get all the appUserProfileList
        restAppUserProfileMockMvc.perform(get("/api/app-user-profiles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(appUserProfile.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].summary").value(hasItem(DEFAULT_SUMMARY)))
            .andExpect(jsonPath("$.[*].headerBackgroundURI").value(hasItem(DEFAULT_HEADER_BACKGROUND_URI)))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }

    @Test
    @Transactional
    public void getAppUserProfile() throws Exception {
        // Initialize the database
        appUserProfileRepository.saveAndFlush(appUserProfile);

        // Get the appUserProfile
        restAppUserProfileMockMvc.perform(get("/api/app-user-profiles/{id}", appUserProfile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(appUserProfile.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.summary").value(DEFAULT_SUMMARY))
            .andExpect(jsonPath("$.headerBackgroundURI").value(DEFAULT_HEADER_BACKGROUND_URI))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAppUserProfile() throws Exception {
        // Get the appUserProfile
        restAppUserProfileMockMvc.perform(get("/api/app-user-profiles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAppUserProfile() throws Exception {
        // Initialize the database
        appUserProfileRepository.saveAndFlush(appUserProfile);

        int databaseSizeBeforeUpdate = appUserProfileRepository.findAll().size();

        // Update the appUserProfile
        AppUserProfile updatedAppUserProfile = appUserProfileRepository.findById(appUserProfile.getId()).get();
        // Disconnect from session so that the updates on updatedAppUserProfile are not directly saved in db
        em.detach(updatedAppUserProfile);
        updatedAppUserProfile
            .name(UPDATED_NAME)
            .title(UPDATED_TITLE)
            .summary(UPDATED_SUMMARY)
            .headerBackgroundURI(UPDATED_HEADER_BACKGROUND_URI)
            .language(UPDATED_LANGUAGE);

        restAppUserProfileMockMvc.perform(put("/api/app-user-profiles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAppUserProfile)))
            .andExpect(status().isOk());

        // Validate the AppUserProfile in the database
        List<AppUserProfile> appUserProfileList = appUserProfileRepository.findAll();
        assertThat(appUserProfileList).hasSize(databaseSizeBeforeUpdate);
        AppUserProfile testAppUserProfile = appUserProfileList.get(appUserProfileList.size() - 1);
        assertThat(testAppUserProfile.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAppUserProfile.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testAppUserProfile.getSummary()).isEqualTo(UPDATED_SUMMARY);
        assertThat(testAppUserProfile.getHeaderBackgroundURI()).isEqualTo(UPDATED_HEADER_BACKGROUND_URI);
        assertThat(testAppUserProfile.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingAppUserProfile() throws Exception {
        int databaseSizeBeforeUpdate = appUserProfileRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAppUserProfileMockMvc.perform(put("/api/app-user-profiles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(appUserProfile)))
            .andExpect(status().isBadRequest());

        // Validate the AppUserProfile in the database
        List<AppUserProfile> appUserProfileList = appUserProfileRepository.findAll();
        assertThat(appUserProfileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAppUserProfile() throws Exception {
        // Initialize the database
        appUserProfileRepository.saveAndFlush(appUserProfile);

        int databaseSizeBeforeDelete = appUserProfileRepository.findAll().size();

        // Delete the appUserProfile
        restAppUserProfileMockMvc.perform(delete("/api/app-user-profiles/{id}", appUserProfile.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AppUserProfile> appUserProfileList = appUserProfileRepository.findAll();
        assertThat(appUserProfileList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
