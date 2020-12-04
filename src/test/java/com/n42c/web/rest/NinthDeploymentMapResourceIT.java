package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.NinthDeploymentMap;
import com.n42c.repository.NinthDeploymentMapRepository;
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
 * Integration tests for the {@link NinthDeploymentMapResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class NinthDeploymentMapResourceIT {

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_SHAREABLE = false;
    private static final Boolean UPDATED_SHAREABLE = true;

    @Autowired
    private NinthDeploymentMapRepository ninthDeploymentMapRepository;

    @Mock
    private NinthDeploymentMapRepository ninthDeploymentMapRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNinthDeploymentMapMockMvc;

    private NinthDeploymentMap ninthDeploymentMap;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthDeploymentMap createEntity(EntityManager em) {
        NinthDeploymentMap ninthDeploymentMap = new NinthDeploymentMap()
            .url(DEFAULT_URL)
            .shareable(DEFAULT_SHAREABLE);
        return ninthDeploymentMap;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthDeploymentMap createUpdatedEntity(EntityManager em) {
        NinthDeploymentMap ninthDeploymentMap = new NinthDeploymentMap()
            .url(UPDATED_URL)
            .shareable(UPDATED_SHAREABLE);
        return ninthDeploymentMap;
    }

    @BeforeEach
    public void initTest() {
        ninthDeploymentMap = createEntity(em);
    }

    @Test
    @Transactional
    public void createNinthDeploymentMap() throws Exception {
        int databaseSizeBeforeCreate = ninthDeploymentMapRepository.findAll().size();
        // Create the NinthDeploymentMap
        restNinthDeploymentMapMockMvc.perform(post("/api/ninth-deployment-maps").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthDeploymentMap)))
            .andExpect(status().isCreated());

        // Validate the NinthDeploymentMap in the database
        List<NinthDeploymentMap> ninthDeploymentMapList = ninthDeploymentMapRepository.findAll();
        assertThat(ninthDeploymentMapList).hasSize(databaseSizeBeforeCreate + 1);
        NinthDeploymentMap testNinthDeploymentMap = ninthDeploymentMapList.get(ninthDeploymentMapList.size() - 1);
        assertThat(testNinthDeploymentMap.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testNinthDeploymentMap.isShareable()).isEqualTo(DEFAULT_SHAREABLE);
    }

    @Test
    @Transactional
    public void createNinthDeploymentMapWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ninthDeploymentMapRepository.findAll().size();

        // Create the NinthDeploymentMap with an existing ID
        ninthDeploymentMap.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNinthDeploymentMapMockMvc.perform(post("/api/ninth-deployment-maps").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthDeploymentMap)))
            .andExpect(status().isBadRequest());

        // Validate the NinthDeploymentMap in the database
        List<NinthDeploymentMap> ninthDeploymentMapList = ninthDeploymentMapRepository.findAll();
        assertThat(ninthDeploymentMapList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNinthDeploymentMaps() throws Exception {
        // Initialize the database
        ninthDeploymentMapRepository.saveAndFlush(ninthDeploymentMap);

        // Get all the ninthDeploymentMapList
        restNinthDeploymentMapMockMvc.perform(get("/api/ninth-deployment-maps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ninthDeploymentMap.getId().intValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].shareable").value(hasItem(DEFAULT_SHAREABLE.booleanValue())));
    }

    @SuppressWarnings({"unchecked"})
    public void getAllNinthDeploymentMapsWithEagerRelationshipsIsEnabled() throws Exception {
        when(ninthDeploymentMapRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restNinthDeploymentMapMockMvc.perform(get("/api/ninth-deployment-maps?eagerload=true"))
            .andExpect(status().isOk());

        verify(ninthDeploymentMapRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllNinthDeploymentMapsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(ninthDeploymentMapRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restNinthDeploymentMapMockMvc.perform(get("/api/ninth-deployment-maps?eagerload=true"))
            .andExpect(status().isOk());

        verify(ninthDeploymentMapRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getNinthDeploymentMap() throws Exception {
        // Initialize the database
        ninthDeploymentMapRepository.saveAndFlush(ninthDeploymentMap);

        // Get the ninthDeploymentMap
        restNinthDeploymentMapMockMvc.perform(get("/api/ninth-deployment-maps/{id}", ninthDeploymentMap.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ninthDeploymentMap.getId().intValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.shareable").value(DEFAULT_SHAREABLE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingNinthDeploymentMap() throws Exception {
        // Get the ninthDeploymentMap
        restNinthDeploymentMapMockMvc.perform(get("/api/ninth-deployment-maps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNinthDeploymentMap() throws Exception {
        // Initialize the database
        ninthDeploymentMapRepository.saveAndFlush(ninthDeploymentMap);

        int databaseSizeBeforeUpdate = ninthDeploymentMapRepository.findAll().size();

        // Update the ninthDeploymentMap
        NinthDeploymentMap updatedNinthDeploymentMap = ninthDeploymentMapRepository.findById(ninthDeploymentMap.getId()).get();
        // Disconnect from session so that the updates on updatedNinthDeploymentMap are not directly saved in db
        em.detach(updatedNinthDeploymentMap);
        updatedNinthDeploymentMap
            .url(UPDATED_URL)
            .shareable(UPDATED_SHAREABLE);

        restNinthDeploymentMapMockMvc.perform(put("/api/ninth-deployment-maps").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNinthDeploymentMap)))
            .andExpect(status().isOk());

        // Validate the NinthDeploymentMap in the database
        List<NinthDeploymentMap> ninthDeploymentMapList = ninthDeploymentMapRepository.findAll();
        assertThat(ninthDeploymentMapList).hasSize(databaseSizeBeforeUpdate);
        NinthDeploymentMap testNinthDeploymentMap = ninthDeploymentMapList.get(ninthDeploymentMapList.size() - 1);
        assertThat(testNinthDeploymentMap.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testNinthDeploymentMap.isShareable()).isEqualTo(UPDATED_SHAREABLE);
    }

    @Test
    @Transactional
    public void updateNonExistingNinthDeploymentMap() throws Exception {
        int databaseSizeBeforeUpdate = ninthDeploymentMapRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNinthDeploymentMapMockMvc.perform(put("/api/ninth-deployment-maps").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthDeploymentMap)))
            .andExpect(status().isBadRequest());

        // Validate the NinthDeploymentMap in the database
        List<NinthDeploymentMap> ninthDeploymentMapList = ninthDeploymentMapRepository.findAll();
        assertThat(ninthDeploymentMapList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNinthDeploymentMap() throws Exception {
        // Initialize the database
        ninthDeploymentMapRepository.saveAndFlush(ninthDeploymentMap);

        int databaseSizeBeforeDelete = ninthDeploymentMapRepository.findAll().size();

        // Delete the ninthDeploymentMap
        restNinthDeploymentMapMockMvc.perform(delete("/api/ninth-deployment-maps/{id}", ninthDeploymentMap.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NinthDeploymentMap> ninthDeploymentMapList = ninthDeploymentMapRepository.findAll();
        assertThat(ninthDeploymentMapList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
