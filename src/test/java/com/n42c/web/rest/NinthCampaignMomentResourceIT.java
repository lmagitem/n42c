package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.NinthCampaignMoment;
import com.n42c.repository.NinthCampaignMomentRepository;
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
 * Integration tests for the {@link NinthCampaignMomentResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@AutoConfigureMockMvc
@WithMockUser
public class NinthCampaignMomentResourceIT {

    private static final Boolean DEFAULT_CURRENT = false;
    private static final Boolean UPDATED_CURRENT = true;

    private static final Instant DEFAULT_SINCE_INSTANT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SINCE_INSTANT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SUMMARY = "AAAAAAAAAA";
    private static final String UPDATED_SUMMARY = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private NinthCampaignMomentRepository ninthCampaignMomentRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNinthCampaignMomentMockMvc;

    private NinthCampaignMoment ninthCampaignMoment;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthCampaignMoment createEntity(EntityManager em) {
        NinthCampaignMoment ninthCampaignMoment = new NinthCampaignMoment()
            .current(DEFAULT_CURRENT)
            .sinceInstant(DEFAULT_SINCE_INSTANT)
            .name(DEFAULT_NAME)
            .summary(DEFAULT_SUMMARY)
            .description(DEFAULT_DESCRIPTION);
        return ninthCampaignMoment;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthCampaignMoment createUpdatedEntity(EntityManager em) {
        NinthCampaignMoment ninthCampaignMoment = new NinthCampaignMoment()
            .current(UPDATED_CURRENT)
            .sinceInstant(UPDATED_SINCE_INSTANT)
            .name(UPDATED_NAME)
            .summary(UPDATED_SUMMARY)
            .description(UPDATED_DESCRIPTION);
        return ninthCampaignMoment;
    }

    @BeforeEach
    public void initTest() {
        ninthCampaignMoment = createEntity(em);
    }

    @Test
    @Transactional
    public void createNinthCampaignMoment() throws Exception {
        int databaseSizeBeforeCreate = ninthCampaignMomentRepository.findAll().size();
        // Create the NinthCampaignMoment
        restNinthCampaignMomentMockMvc.perform(post("/api/ninth-campaign-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthCampaignMoment)))
            .andExpect(status().isCreated());

        // Validate the NinthCampaignMoment in the database
        List<NinthCampaignMoment> ninthCampaignMomentList = ninthCampaignMomentRepository.findAll();
        assertThat(ninthCampaignMomentList).hasSize(databaseSizeBeforeCreate + 1);
        NinthCampaignMoment testNinthCampaignMoment = ninthCampaignMomentList.get(ninthCampaignMomentList.size() - 1);
        assertThat(testNinthCampaignMoment.isCurrent()).isEqualTo(DEFAULT_CURRENT);
        assertThat(testNinthCampaignMoment.getSinceInstant()).isEqualTo(DEFAULT_SINCE_INSTANT);
        assertThat(testNinthCampaignMoment.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testNinthCampaignMoment.getSummary()).isEqualTo(DEFAULT_SUMMARY);
        assertThat(testNinthCampaignMoment.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createNinthCampaignMomentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ninthCampaignMomentRepository.findAll().size();

        // Create the NinthCampaignMoment with an existing ID
        ninthCampaignMoment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNinthCampaignMomentMockMvc.perform(post("/api/ninth-campaign-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthCampaignMoment)))
            .andExpect(status().isBadRequest());

        // Validate the NinthCampaignMoment in the database
        List<NinthCampaignMoment> ninthCampaignMomentList = ninthCampaignMomentRepository.findAll();
        assertThat(ninthCampaignMomentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCurrentIsRequired() throws Exception {
        int databaseSizeBeforeTest = ninthCampaignMomentRepository.findAll().size();
        // set the field null
        ninthCampaignMoment.setCurrent(null);

        // Create the NinthCampaignMoment, which fails.


        restNinthCampaignMomentMockMvc.perform(post("/api/ninth-campaign-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthCampaignMoment)))
            .andExpect(status().isBadRequest());

        List<NinthCampaignMoment> ninthCampaignMomentList = ninthCampaignMomentRepository.findAll();
        assertThat(ninthCampaignMomentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSinceInstantIsRequired() throws Exception {
        int databaseSizeBeforeTest = ninthCampaignMomentRepository.findAll().size();
        // set the field null
        ninthCampaignMoment.setSinceInstant(null);

        // Create the NinthCampaignMoment, which fails.


        restNinthCampaignMomentMockMvc.perform(post("/api/ninth-campaign-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthCampaignMoment)))
            .andExpect(status().isBadRequest());

        List<NinthCampaignMoment> ninthCampaignMomentList = ninthCampaignMomentRepository.findAll();
        assertThat(ninthCampaignMomentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNinthCampaignMoments() throws Exception {
        // Initialize the database
        ninthCampaignMomentRepository.saveAndFlush(ninthCampaignMoment);

        // Get all the ninthCampaignMomentList
        restNinthCampaignMomentMockMvc.perform(get("/api/ninth-campaign-moments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ninthCampaignMoment.getId().intValue())))
            .andExpect(jsonPath("$.[*].current").value(hasItem(DEFAULT_CURRENT.booleanValue())))
            .andExpect(jsonPath("$.[*].sinceInstant").value(hasItem(DEFAULT_SINCE_INSTANT.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].summary").value(hasItem(DEFAULT_SUMMARY)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    public void getNinthCampaignMoment() throws Exception {
        // Initialize the database
        ninthCampaignMomentRepository.saveAndFlush(ninthCampaignMoment);

        // Get the ninthCampaignMoment
        restNinthCampaignMomentMockMvc.perform(get("/api/ninth-campaign-moments/{id}", ninthCampaignMoment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ninthCampaignMoment.getId().intValue()))
            .andExpect(jsonPath("$.current").value(DEFAULT_CURRENT.booleanValue()))
            .andExpect(jsonPath("$.sinceInstant").value(DEFAULT_SINCE_INSTANT.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.summary").value(DEFAULT_SUMMARY))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingNinthCampaignMoment() throws Exception {
        // Get the ninthCampaignMoment
        restNinthCampaignMomentMockMvc.perform(get("/api/ninth-campaign-moments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNinthCampaignMoment() throws Exception {
        // Initialize the database
        ninthCampaignMomentRepository.saveAndFlush(ninthCampaignMoment);

        int databaseSizeBeforeUpdate = ninthCampaignMomentRepository.findAll().size();

        // Update the ninthCampaignMoment
        NinthCampaignMoment updatedNinthCampaignMoment = ninthCampaignMomentRepository.findById(ninthCampaignMoment.getId()).get();
        // Disconnect from session so that the updates on updatedNinthCampaignMoment are not directly saved in db
        em.detach(updatedNinthCampaignMoment);
        updatedNinthCampaignMoment
            .current(UPDATED_CURRENT)
            .sinceInstant(UPDATED_SINCE_INSTANT)
            .name(UPDATED_NAME)
            .summary(UPDATED_SUMMARY)
            .description(UPDATED_DESCRIPTION);

        restNinthCampaignMomentMockMvc.perform(put("/api/ninth-campaign-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNinthCampaignMoment)))
            .andExpect(status().isOk());

        // Validate the NinthCampaignMoment in the database
        List<NinthCampaignMoment> ninthCampaignMomentList = ninthCampaignMomentRepository.findAll();
        assertThat(ninthCampaignMomentList).hasSize(databaseSizeBeforeUpdate);
        NinthCampaignMoment testNinthCampaignMoment = ninthCampaignMomentList.get(ninthCampaignMomentList.size() - 1);
        assertThat(testNinthCampaignMoment.isCurrent()).isEqualTo(UPDATED_CURRENT);
        assertThat(testNinthCampaignMoment.getSinceInstant()).isEqualTo(UPDATED_SINCE_INSTANT);
        assertThat(testNinthCampaignMoment.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testNinthCampaignMoment.getSummary()).isEqualTo(UPDATED_SUMMARY);
        assertThat(testNinthCampaignMoment.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingNinthCampaignMoment() throws Exception {
        int databaseSizeBeforeUpdate = ninthCampaignMomentRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNinthCampaignMomentMockMvc.perform(put("/api/ninth-campaign-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthCampaignMoment)))
            .andExpect(status().isBadRequest());

        // Validate the NinthCampaignMoment in the database
        List<NinthCampaignMoment> ninthCampaignMomentList = ninthCampaignMomentRepository.findAll();
        assertThat(ninthCampaignMomentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNinthCampaignMoment() throws Exception {
        // Initialize the database
        ninthCampaignMomentRepository.saveAndFlush(ninthCampaignMoment);

        int databaseSizeBeforeDelete = ninthCampaignMomentRepository.findAll().size();

        // Delete the ninthCampaignMoment
        restNinthCampaignMomentMockMvc.perform(delete("/api/ninth-campaign-moments/{id}", ninthCampaignMoment.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NinthCampaignMoment> ninthCampaignMomentList = ninthCampaignMomentRepository.findAll();
        assertThat(ninthCampaignMomentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
