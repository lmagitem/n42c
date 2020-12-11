package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.NinthMission;
import com.n42c.domain.enumerations.NinthGameSize;
import com.n42c.domain.enumerations.NinthGameType;
import com.n42c.repository.NinthMissionRepository;
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
 * Integration tests for the {@link NinthMissionResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class NinthMissionResourceIT {

    private static final NinthGameType DEFAULT_GAME_TYPE = NinthGameType.OP;
    private static final NinthGameType UPDATED_GAME_TYPE = NinthGameType.MP;

    private static final NinthGameSize DEFAULT_GAME_SIZE = NinthGameSize.CP;
    private static final NinthGameSize UPDATED_GAME_SIZE = NinthGameSize.IN;

    private static final Boolean DEFAULT_SHAREABLE = false;
    private static final Boolean UPDATED_SHAREABLE = true;

    @Autowired
    private NinthMissionRepository ninthMissionRepository;

    @Mock
    private NinthMissionRepository ninthMissionRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNinthMissionMockMvc;

    private NinthMission ninthMission;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthMission createEntity(EntityManager em) {
        NinthMission ninthMission = new NinthMission()
            .gameType(DEFAULT_GAME_TYPE)
            .gameSize(DEFAULT_GAME_SIZE)
            .shareable(DEFAULT_SHAREABLE);
        return ninthMission;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthMission createUpdatedEntity(EntityManager em) {
        NinthMission ninthMission = new NinthMission()
            .gameType(UPDATED_GAME_TYPE)
            .gameSize(UPDATED_GAME_SIZE)
            .shareable(UPDATED_SHAREABLE);
        return ninthMission;
    }

    @BeforeEach
    public void initTest() {
        ninthMission = createEntity(em);
    }

    @Test
    @Transactional
    public void createNinthMission() throws Exception {
        int databaseSizeBeforeCreate = ninthMissionRepository.findAll().size();
        // Create the NinthMission
        restNinthMissionMockMvc.perform(post("/api/ninth-missions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthMission)))
            .andExpect(status().isCreated());

        // Validate the NinthMission in the database
        List<NinthMission> ninthMissionList = ninthMissionRepository.findAll();
        assertThat(ninthMissionList).hasSize(databaseSizeBeforeCreate + 1);
        NinthMission testNinthMission = ninthMissionList.get(ninthMissionList.size() - 1);
        assertThat(testNinthMission.getGameType()).isEqualTo(DEFAULT_GAME_TYPE);
        assertThat(testNinthMission.getGameSize()).isEqualTo(DEFAULT_GAME_SIZE);
        assertThat(testNinthMission.isShareable()).isEqualTo(DEFAULT_SHAREABLE);
    }

    @Test
    @Transactional
    public void createNinthMissionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ninthMissionRepository.findAll().size();

        // Create the NinthMission with an existing ID
        ninthMission.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNinthMissionMockMvc.perform(post("/api/ninth-missions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthMission)))
            .andExpect(status().isBadRequest());

        // Validate the NinthMission in the database
        List<NinthMission> ninthMissionList = ninthMissionRepository.findAll();
        assertThat(ninthMissionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNinthMissions() throws Exception {
        // Initialize the database
        ninthMissionRepository.saveAndFlush(ninthMission);

        // Get all the ninthMissionList
        restNinthMissionMockMvc.perform(get("/api/ninth-missions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ninthMission.getId().intValue())))
            .andExpect(jsonPath("$.[*].gameType").value(hasItem(DEFAULT_GAME_TYPE.toString())))
            .andExpect(jsonPath("$.[*].gameSize").value(hasItem(DEFAULT_GAME_SIZE.toString())))
            .andExpect(jsonPath("$.[*].shareable").value(hasItem(DEFAULT_SHAREABLE.booleanValue())));
    }

    @SuppressWarnings({"unchecked"})
    public void getAllNinthMissionsWithEagerRelationshipsIsEnabled() throws Exception {
        when(ninthMissionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restNinthMissionMockMvc.perform(get("/api/ninth-missions?eagerload=true"))
            .andExpect(status().isOk());

        verify(ninthMissionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllNinthMissionsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(ninthMissionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restNinthMissionMockMvc.perform(get("/api/ninth-missions?eagerload=true"))
            .andExpect(status().isOk());

        verify(ninthMissionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getNinthMission() throws Exception {
        // Initialize the database
        ninthMissionRepository.saveAndFlush(ninthMission);

        // Get the ninthMission
        restNinthMissionMockMvc.perform(get("/api/ninth-missions/{id}", ninthMission.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ninthMission.getId().intValue()))
            .andExpect(jsonPath("$.gameType").value(DEFAULT_GAME_TYPE.toString()))
            .andExpect(jsonPath("$.gameSize").value(DEFAULT_GAME_SIZE.toString()))
            .andExpect(jsonPath("$.shareable").value(DEFAULT_SHAREABLE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingNinthMission() throws Exception {
        // Get the ninthMission
        restNinthMissionMockMvc.perform(get("/api/ninth-missions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNinthMission() throws Exception {
        // Initialize the database
        ninthMissionRepository.saveAndFlush(ninthMission);

        int databaseSizeBeforeUpdate = ninthMissionRepository.findAll().size();

        // Update the ninthMission
        NinthMission updatedNinthMission = ninthMissionRepository.findById(ninthMission.getId()).get();
        // Disconnect from session so that the updates on updatedNinthMission are not directly saved in db
        em.detach(updatedNinthMission);
        updatedNinthMission
            .gameType(UPDATED_GAME_TYPE)
            .gameSize(UPDATED_GAME_SIZE)
            .shareable(UPDATED_SHAREABLE);

        restNinthMissionMockMvc.perform(put("/api/ninth-missions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNinthMission)))
            .andExpect(status().isOk());

        // Validate the NinthMission in the database
        List<NinthMission> ninthMissionList = ninthMissionRepository.findAll();
        assertThat(ninthMissionList).hasSize(databaseSizeBeforeUpdate);
        NinthMission testNinthMission = ninthMissionList.get(ninthMissionList.size() - 1);
        assertThat(testNinthMission.getGameType()).isEqualTo(UPDATED_GAME_TYPE);
        assertThat(testNinthMission.getGameSize()).isEqualTo(UPDATED_GAME_SIZE);
        assertThat(testNinthMission.isShareable()).isEqualTo(UPDATED_SHAREABLE);
    }

    @Test
    @Transactional
    public void updateNonExistingNinthMission() throws Exception {
        int databaseSizeBeforeUpdate = ninthMissionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNinthMissionMockMvc.perform(put("/api/ninth-missions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthMission)))
            .andExpect(status().isBadRequest());

        // Validate the NinthMission in the database
        List<NinthMission> ninthMissionList = ninthMissionRepository.findAll();
        assertThat(ninthMissionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNinthMission() throws Exception {
        // Initialize the database
        ninthMissionRepository.saveAndFlush(ninthMission);

        int databaseSizeBeforeDelete = ninthMissionRepository.findAll().size();

        // Delete the ninthMission
        restNinthMissionMockMvc.perform(delete("/api/ninth-missions/{id}", ninthMission.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NinthMission> ninthMissionList = ninthMissionRepository.findAll();
        assertThat(ninthMissionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
