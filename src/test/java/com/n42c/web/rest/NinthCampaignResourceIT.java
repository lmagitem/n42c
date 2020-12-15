package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.NinthCampaign;
import com.n42c.domain.enumerations.NinthGameType;
import com.n42c.repository.NinthCampaignRepository;
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
 * Integration tests for the {@link NinthCampaignResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class NinthCampaignResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final NinthGameType DEFAULT_GAME_TYPE = NinthGameType.OP;
    private static final NinthGameType UPDATED_GAME_TYPE = NinthGameType.MP;

    private static final Boolean DEFAULT_USE_POWER_RATING = false;
    private static final Boolean UPDATED_USE_POWER_RATING = true;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private NinthCampaignRepository ninthCampaignRepository;

    @Mock
    private NinthCampaignRepository ninthCampaignRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNinthCampaignMockMvc;

    private NinthCampaign ninthCampaign;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthCampaign createEntity(EntityManager em) {
        NinthCampaign ninthCampaign = new NinthCampaign()
            .name(DEFAULT_NAME)
            .gameType(DEFAULT_GAME_TYPE)
            .usePowerRating(DEFAULT_USE_POWER_RATING)
            .description(DEFAULT_DESCRIPTION);
        return ninthCampaign;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthCampaign createUpdatedEntity(EntityManager em) {
        NinthCampaign ninthCampaign = new NinthCampaign()
            .name(UPDATED_NAME)
            .gameType(UPDATED_GAME_TYPE)
            .usePowerRating(UPDATED_USE_POWER_RATING)
            .description(UPDATED_DESCRIPTION);
        return ninthCampaign;
    }

    @BeforeEach
    public void initTest() {
        ninthCampaign = createEntity(em);
    }

    @Test
    @Transactional
    public void createNinthCampaign() throws Exception {
        int databaseSizeBeforeCreate = ninthCampaignRepository.findAll().size();
        // Create the NinthCampaign
        restNinthCampaignMockMvc.perform(post("/api/ninth-campaigns").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthCampaign)))
            .andExpect(status().isCreated());

        // Validate the NinthCampaign in the database
        List<NinthCampaign> ninthCampaignList = ninthCampaignRepository.findAll();
        assertThat(ninthCampaignList).hasSize(databaseSizeBeforeCreate + 1);
        NinthCampaign testNinthCampaign = ninthCampaignList.get(ninthCampaignList.size() - 1);
        assertThat(testNinthCampaign.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testNinthCampaign.getGameType()).isEqualTo(DEFAULT_GAME_TYPE);
        assertThat(testNinthCampaign.isUsePowerRating()).isEqualTo(DEFAULT_USE_POWER_RATING);
        assertThat(testNinthCampaign.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createNinthCampaignWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ninthCampaignRepository.findAll().size();

        // Create the NinthCampaign with an existing ID
        ninthCampaign.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNinthCampaignMockMvc.perform(post("/api/ninth-campaigns").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthCampaign)))
            .andExpect(status().isBadRequest());

        // Validate the NinthCampaign in the database
        List<NinthCampaign> ninthCampaignList = ninthCampaignRepository.findAll();
        assertThat(ninthCampaignList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = ninthCampaignRepository.findAll().size();
        // set the field null
        ninthCampaign.setName(null);

        // Create the NinthCampaign, which fails.


        restNinthCampaignMockMvc.perform(post("/api/ninth-campaigns").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthCampaign)))
            .andExpect(status().isBadRequest());

        List<NinthCampaign> ninthCampaignList = ninthCampaignRepository.findAll();
        assertThat(ninthCampaignList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGameTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = ninthCampaignRepository.findAll().size();
        // set the field null
        ninthCampaign.setGameType(null);

        // Create the NinthCampaign, which fails.


        restNinthCampaignMockMvc.perform(post("/api/ninth-campaigns").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthCampaign)))
            .andExpect(status().isBadRequest());

        List<NinthCampaign> ninthCampaignList = ninthCampaignRepository.findAll();
        assertThat(ninthCampaignList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUsePowerRatingIsRequired() throws Exception {
        int databaseSizeBeforeTest = ninthCampaignRepository.findAll().size();
        // set the field null
        ninthCampaign.setUsePowerRating(null);

        // Create the NinthCampaign, which fails.


        restNinthCampaignMockMvc.perform(post("/api/ninth-campaigns").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthCampaign)))
            .andExpect(status().isBadRequest());

        List<NinthCampaign> ninthCampaignList = ninthCampaignRepository.findAll();
        assertThat(ninthCampaignList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNinthCampaigns() throws Exception {
        // Initialize the database
        ninthCampaignRepository.saveAndFlush(ninthCampaign);

        // Get all the ninthCampaignList
        restNinthCampaignMockMvc.perform(get("/api/ninth-campaigns?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ninthCampaign.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].gameType").value(hasItem(DEFAULT_GAME_TYPE.toString())))
            .andExpect(jsonPath("$.[*].usePowerRating").value(hasItem(DEFAULT_USE_POWER_RATING.booleanValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @SuppressWarnings({"unchecked"})
    public void getAllNinthCampaignsWithEagerRelationshipsIsEnabled() throws Exception {
        when(ninthCampaignRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restNinthCampaignMockMvc.perform(get("/api/ninth-campaigns?eagerload=true"))
            .andExpect(status().isOk());

        verify(ninthCampaignRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllNinthCampaignsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(ninthCampaignRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restNinthCampaignMockMvc.perform(get("/api/ninth-campaigns?eagerload=true"))
            .andExpect(status().isOk());

        verify(ninthCampaignRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getNinthCampaign() throws Exception {
        // Initialize the database
        ninthCampaignRepository.saveAndFlush(ninthCampaign);

        // Get the ninthCampaign
        restNinthCampaignMockMvc.perform(get("/api/ninth-campaigns/{id}", ninthCampaign.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ninthCampaign.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.gameType").value(DEFAULT_GAME_TYPE.toString()))
            .andExpect(jsonPath("$.usePowerRating").value(DEFAULT_USE_POWER_RATING.booleanValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingNinthCampaign() throws Exception {
        // Get the ninthCampaign
        restNinthCampaignMockMvc.perform(get("/api/ninth-campaigns/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNinthCampaign() throws Exception {
        // Initialize the database
        ninthCampaignRepository.saveAndFlush(ninthCampaign);

        int databaseSizeBeforeUpdate = ninthCampaignRepository.findAll().size();

        // Update the ninthCampaign
        NinthCampaign updatedNinthCampaign = ninthCampaignRepository.findById(ninthCampaign.getId()).get();
        // Disconnect from session so that the updates on updatedNinthCampaign are not directly saved in db
        em.detach(updatedNinthCampaign);
        updatedNinthCampaign
            .name(UPDATED_NAME)
            .gameType(UPDATED_GAME_TYPE)
            .usePowerRating(UPDATED_USE_POWER_RATING)
            .description(UPDATED_DESCRIPTION);

        restNinthCampaignMockMvc.perform(put("/api/ninth-campaigns").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNinthCampaign)))
            .andExpect(status().isOk());

        // Validate the NinthCampaign in the database
        List<NinthCampaign> ninthCampaignList = ninthCampaignRepository.findAll();
        assertThat(ninthCampaignList).hasSize(databaseSizeBeforeUpdate);
        NinthCampaign testNinthCampaign = ninthCampaignList.get(ninthCampaignList.size() - 1);
        assertThat(testNinthCampaign.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testNinthCampaign.getGameType()).isEqualTo(UPDATED_GAME_TYPE);
        assertThat(testNinthCampaign.isUsePowerRating()).isEqualTo(UPDATED_USE_POWER_RATING);
        assertThat(testNinthCampaign.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingNinthCampaign() throws Exception {
        int databaseSizeBeforeUpdate = ninthCampaignRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNinthCampaignMockMvc.perform(put("/api/ninth-campaigns").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthCampaign)))
            .andExpect(status().isBadRequest());

        // Validate the NinthCampaign in the database
        List<NinthCampaign> ninthCampaignList = ninthCampaignRepository.findAll();
        assertThat(ninthCampaignList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNinthCampaign() throws Exception {
        // Initialize the database
        ninthCampaignRepository.saveAndFlush(ninthCampaign);

        int databaseSizeBeforeDelete = ninthCampaignRepository.findAll().size();

        // Delete the ninthCampaign
        restNinthCampaignMockMvc.perform(delete("/api/ninth-campaigns/{id}", ninthCampaign.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NinthCampaign> ninthCampaignList = ninthCampaignRepository.findAll();
        assertThat(ninthCampaignList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
