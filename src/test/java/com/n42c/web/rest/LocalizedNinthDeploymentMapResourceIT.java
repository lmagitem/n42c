package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.LocalizedNinthDeploymentMap;
import com.n42c.repository.LocalizedNinthDeploymentMapRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link LocalizedNinthDeploymentMapResource} REST controller.
 */
@SpringBootTest(classes = { N42CApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class LocalizedNinthDeploymentMapResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private LocalizedNinthDeploymentMapRepository localizedNinthDeploymentMapRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLocalizedNinthDeploymentMapMockMvc;

    private LocalizedNinthDeploymentMap localizedNinthDeploymentMap;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedNinthDeploymentMap createEntity(EntityManager em) {
        LocalizedNinthDeploymentMap localizedNinthDeploymentMap = new LocalizedNinthDeploymentMap()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return localizedNinthDeploymentMap;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedNinthDeploymentMap createUpdatedEntity(EntityManager em) {
        LocalizedNinthDeploymentMap localizedNinthDeploymentMap = new LocalizedNinthDeploymentMap()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        return localizedNinthDeploymentMap;
    }

    @BeforeEach
    public void initTest() {
        localizedNinthDeploymentMap = createEntity(em);
    }

    @Test
    @Transactional
    public void createLocalizedNinthDeploymentMap() throws Exception {
        int databaseSizeBeforeCreate = localizedNinthDeploymentMapRepository.findAll().size();
        // Create the LocalizedNinthDeploymentMap
        restLocalizedNinthDeploymentMapMockMvc.perform(post("/api/localized-ninth-deployment-maps").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthDeploymentMap)))
            .andExpect(status().isCreated());

        // Validate the LocalizedNinthDeploymentMap in the database
        List<LocalizedNinthDeploymentMap> localizedNinthDeploymentMapList = localizedNinthDeploymentMapRepository.findAll();
        assertThat(localizedNinthDeploymentMapList).hasSize(databaseSizeBeforeCreate + 1);
        LocalizedNinthDeploymentMap testLocalizedNinthDeploymentMap = localizedNinthDeploymentMapList.get(localizedNinthDeploymentMapList.size() - 1);
        assertThat(testLocalizedNinthDeploymentMap.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testLocalizedNinthDeploymentMap.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createLocalizedNinthDeploymentMapWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = localizedNinthDeploymentMapRepository.findAll().size();

        // Create the LocalizedNinthDeploymentMap with an existing ID
        localizedNinthDeploymentMap.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocalizedNinthDeploymentMapMockMvc.perform(post("/api/localized-ninth-deployment-maps").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthDeploymentMap)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedNinthDeploymentMap in the database
        List<LocalizedNinthDeploymentMap> localizedNinthDeploymentMapList = localizedNinthDeploymentMapRepository.findAll();
        assertThat(localizedNinthDeploymentMapList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLocalizedNinthDeploymentMaps() throws Exception {
        // Initialize the database
        localizedNinthDeploymentMapRepository.saveAndFlush(localizedNinthDeploymentMap);

        // Get all the localizedNinthDeploymentMapList
        restLocalizedNinthDeploymentMapMockMvc.perform(get("/api/localized-ninth-deployment-maps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(localizedNinthDeploymentMap.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getLocalizedNinthDeploymentMap() throws Exception {
        // Initialize the database
        localizedNinthDeploymentMapRepository.saveAndFlush(localizedNinthDeploymentMap);

        // Get the localizedNinthDeploymentMap
        restLocalizedNinthDeploymentMapMockMvc.perform(get("/api/localized-ninth-deployment-maps/{id}", localizedNinthDeploymentMap.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(localizedNinthDeploymentMap.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingLocalizedNinthDeploymentMap() throws Exception {
        // Get the localizedNinthDeploymentMap
        restLocalizedNinthDeploymentMapMockMvc.perform(get("/api/localized-ninth-deployment-maps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLocalizedNinthDeploymentMap() throws Exception {
        // Initialize the database
        localizedNinthDeploymentMapRepository.saveAndFlush(localizedNinthDeploymentMap);

        int databaseSizeBeforeUpdate = localizedNinthDeploymentMapRepository.findAll().size();

        // Update the localizedNinthDeploymentMap
        LocalizedNinthDeploymentMap updatedLocalizedNinthDeploymentMap = localizedNinthDeploymentMapRepository.findById(localizedNinthDeploymentMap.getId()).get();
        // Disconnect from session so that the updates on updatedLocalizedNinthDeploymentMap are not directly saved in db
        em.detach(updatedLocalizedNinthDeploymentMap);
        updatedLocalizedNinthDeploymentMap
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restLocalizedNinthDeploymentMapMockMvc.perform(put("/api/localized-ninth-deployment-maps").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLocalizedNinthDeploymentMap)))
            .andExpect(status().isOk());

        // Validate the LocalizedNinthDeploymentMap in the database
        List<LocalizedNinthDeploymentMap> localizedNinthDeploymentMapList = localizedNinthDeploymentMapRepository.findAll();
        assertThat(localizedNinthDeploymentMapList).hasSize(databaseSizeBeforeUpdate);
        LocalizedNinthDeploymentMap testLocalizedNinthDeploymentMap = localizedNinthDeploymentMapList.get(localizedNinthDeploymentMapList.size() - 1);
        assertThat(testLocalizedNinthDeploymentMap.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testLocalizedNinthDeploymentMap.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingLocalizedNinthDeploymentMap() throws Exception {
        int databaseSizeBeforeUpdate = localizedNinthDeploymentMapRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalizedNinthDeploymentMapMockMvc.perform(put("/api/localized-ninth-deployment-maps").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthDeploymentMap)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedNinthDeploymentMap in the database
        List<LocalizedNinthDeploymentMap> localizedNinthDeploymentMapList = localizedNinthDeploymentMapRepository.findAll();
        assertThat(localizedNinthDeploymentMapList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLocalizedNinthDeploymentMap() throws Exception {
        // Initialize the database
        localizedNinthDeploymentMapRepository.saveAndFlush(localizedNinthDeploymentMap);

        int databaseSizeBeforeDelete = localizedNinthDeploymentMapRepository.findAll().size();

        // Delete the localizedNinthDeploymentMap
        restLocalizedNinthDeploymentMapMockMvc.perform(delete("/api/localized-ninth-deployment-maps/{id}", localizedNinthDeploymentMap.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LocalizedNinthDeploymentMap> localizedNinthDeploymentMapList = localizedNinthDeploymentMapRepository.findAll();
        assertThat(localizedNinthDeploymentMapList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
