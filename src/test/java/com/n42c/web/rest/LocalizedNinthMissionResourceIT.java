package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.LocalizedNinthMission;
import com.n42c.repository.LocalizedNinthMissionRepository;

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
 * Integration tests for the {@link LocalizedNinthMissionResource} REST controller.
 */
@SpringBootTest(classes = { N42CApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class LocalizedNinthMissionResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_BRIEFING = "AAAAAAAAAA";
    private static final String UPDATED_BRIEFING = "BBBBBBBBBB";

    @Autowired
    private LocalizedNinthMissionRepository localizedNinthMissionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLocalizedNinthMissionMockMvc;

    private LocalizedNinthMission localizedNinthMission;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedNinthMission createEntity(EntityManager em) {
        LocalizedNinthMission localizedNinthMission = new LocalizedNinthMission()
            .name(DEFAULT_NAME)
            .briefing(DEFAULT_BRIEFING);
        return localizedNinthMission;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedNinthMission createUpdatedEntity(EntityManager em) {
        LocalizedNinthMission localizedNinthMission = new LocalizedNinthMission()
            .name(UPDATED_NAME)
            .briefing(UPDATED_BRIEFING);
        return localizedNinthMission;
    }

    @BeforeEach
    public void initTest() {
        localizedNinthMission = createEntity(em);
    }

    @Test
    @Transactional
    public void createLocalizedNinthMission() throws Exception {
        int databaseSizeBeforeCreate = localizedNinthMissionRepository.findAll().size();
        // Create the LocalizedNinthMission
        restLocalizedNinthMissionMockMvc.perform(post("/api/localized-ninth-missions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthMission)))
            .andExpect(status().isCreated());

        // Validate the LocalizedNinthMission in the database
        List<LocalizedNinthMission> localizedNinthMissionList = localizedNinthMissionRepository.findAll();
        assertThat(localizedNinthMissionList).hasSize(databaseSizeBeforeCreate + 1);
        LocalizedNinthMission testLocalizedNinthMission = localizedNinthMissionList.get(localizedNinthMissionList.size() - 1);
        assertThat(testLocalizedNinthMission.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testLocalizedNinthMission.getBriefing()).isEqualTo(DEFAULT_BRIEFING);
    }

    @Test
    @Transactional
    public void createLocalizedNinthMissionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = localizedNinthMissionRepository.findAll().size();

        // Create the LocalizedNinthMission with an existing ID
        localizedNinthMission.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocalizedNinthMissionMockMvc.perform(post("/api/localized-ninth-missions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthMission)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedNinthMission in the database
        List<LocalizedNinthMission> localizedNinthMissionList = localizedNinthMissionRepository.findAll();
        assertThat(localizedNinthMissionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLocalizedNinthMissions() throws Exception {
        // Initialize the database
        localizedNinthMissionRepository.saveAndFlush(localizedNinthMission);

        // Get all the localizedNinthMissionList
        restLocalizedNinthMissionMockMvc.perform(get("/api/localized-ninth-missions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(localizedNinthMission.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].briefing").value(hasItem(DEFAULT_BRIEFING)));
    }
    
    @Test
    @Transactional
    public void getLocalizedNinthMission() throws Exception {
        // Initialize the database
        localizedNinthMissionRepository.saveAndFlush(localizedNinthMission);

        // Get the localizedNinthMission
        restLocalizedNinthMissionMockMvc.perform(get("/api/localized-ninth-missions/{id}", localizedNinthMission.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(localizedNinthMission.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.briefing").value(DEFAULT_BRIEFING));
    }
    @Test
    @Transactional
    public void getNonExistingLocalizedNinthMission() throws Exception {
        // Get the localizedNinthMission
        restLocalizedNinthMissionMockMvc.perform(get("/api/localized-ninth-missions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLocalizedNinthMission() throws Exception {
        // Initialize the database
        localizedNinthMissionRepository.saveAndFlush(localizedNinthMission);

        int databaseSizeBeforeUpdate = localizedNinthMissionRepository.findAll().size();

        // Update the localizedNinthMission
        LocalizedNinthMission updatedLocalizedNinthMission = localizedNinthMissionRepository.findById(localizedNinthMission.getId()).get();
        // Disconnect from session so that the updates on updatedLocalizedNinthMission are not directly saved in db
        em.detach(updatedLocalizedNinthMission);
        updatedLocalizedNinthMission
            .name(UPDATED_NAME)
            .briefing(UPDATED_BRIEFING);

        restLocalizedNinthMissionMockMvc.perform(put("/api/localized-ninth-missions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLocalizedNinthMission)))
            .andExpect(status().isOk());

        // Validate the LocalizedNinthMission in the database
        List<LocalizedNinthMission> localizedNinthMissionList = localizedNinthMissionRepository.findAll();
        assertThat(localizedNinthMissionList).hasSize(databaseSizeBeforeUpdate);
        LocalizedNinthMission testLocalizedNinthMission = localizedNinthMissionList.get(localizedNinthMissionList.size() - 1);
        assertThat(testLocalizedNinthMission.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testLocalizedNinthMission.getBriefing()).isEqualTo(UPDATED_BRIEFING);
    }

    @Test
    @Transactional
    public void updateNonExistingLocalizedNinthMission() throws Exception {
        int databaseSizeBeforeUpdate = localizedNinthMissionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalizedNinthMissionMockMvc.perform(put("/api/localized-ninth-missions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthMission)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedNinthMission in the database
        List<LocalizedNinthMission> localizedNinthMissionList = localizedNinthMissionRepository.findAll();
        assertThat(localizedNinthMissionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLocalizedNinthMission() throws Exception {
        // Initialize the database
        localizedNinthMissionRepository.saveAndFlush(localizedNinthMission);

        int databaseSizeBeforeDelete = localizedNinthMissionRepository.findAll().size();

        // Delete the localizedNinthMission
        restLocalizedNinthMissionMockMvc.perform(delete("/api/localized-ninth-missions/{id}", localizedNinthMission.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LocalizedNinthMission> localizedNinthMissionList = localizedNinthMissionRepository.findAll();
        assertThat(localizedNinthMissionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
