package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.NinthUnitMoment;
import com.n42c.repository.NinthUnitMomentRepository;

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
 * Integration tests for the {@link NinthUnitMomentResource} REST controller.
 */
@SpringBootTest(classes = { N42CApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class NinthUnitMomentResourceIT {

    private static final Boolean DEFAULT_CURRENT = false;
    private static final Boolean UPDATED_CURRENT = true;

    private static final Instant DEFAULT_SINCE_INSTANT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SINCE_INSTANT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_PICTURE_URL = "AAAAAAAAAA";
    private static final String UPDATED_PICTURE_URL = "BBBBBBBBBB";

    @Autowired
    private NinthUnitMomentRepository ninthUnitMomentRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNinthUnitMomentMockMvc;

    private NinthUnitMoment ninthUnitMoment;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthUnitMoment createEntity(EntityManager em) {
        NinthUnitMoment ninthUnitMoment = new NinthUnitMoment()
            .current(DEFAULT_CURRENT)
            .sinceInstant(DEFAULT_SINCE_INSTANT)
            .pictureUrl(DEFAULT_PICTURE_URL);
        return ninthUnitMoment;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthUnitMoment createUpdatedEntity(EntityManager em) {
        NinthUnitMoment ninthUnitMoment = new NinthUnitMoment()
            .current(UPDATED_CURRENT)
            .sinceInstant(UPDATED_SINCE_INSTANT)
            .pictureUrl(UPDATED_PICTURE_URL);
        return ninthUnitMoment;
    }

    @BeforeEach
    public void initTest() {
        ninthUnitMoment = createEntity(em);
    }

    @Test
    @Transactional
    public void createNinthUnitMoment() throws Exception {
        int databaseSizeBeforeCreate = ninthUnitMomentRepository.findAll().size();
        // Create the NinthUnitMoment
        restNinthUnitMomentMockMvc.perform(post("/api/ninth-unit-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthUnitMoment)))
            .andExpect(status().isCreated());

        // Validate the NinthUnitMoment in the database
        List<NinthUnitMoment> ninthUnitMomentList = ninthUnitMomentRepository.findAll();
        assertThat(ninthUnitMomentList).hasSize(databaseSizeBeforeCreate + 1);
        NinthUnitMoment testNinthUnitMoment = ninthUnitMomentList.get(ninthUnitMomentList.size() - 1);
        assertThat(testNinthUnitMoment.isCurrent()).isEqualTo(DEFAULT_CURRENT);
        assertThat(testNinthUnitMoment.getSinceInstant()).isEqualTo(DEFAULT_SINCE_INSTANT);
        assertThat(testNinthUnitMoment.getPictureUrl()).isEqualTo(DEFAULT_PICTURE_URL);
    }

    @Test
    @Transactional
    public void createNinthUnitMomentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ninthUnitMomentRepository.findAll().size();

        // Create the NinthUnitMoment with an existing ID
        ninthUnitMoment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNinthUnitMomentMockMvc.perform(post("/api/ninth-unit-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthUnitMoment)))
            .andExpect(status().isBadRequest());

        // Validate the NinthUnitMoment in the database
        List<NinthUnitMoment> ninthUnitMomentList = ninthUnitMomentRepository.findAll();
        assertThat(ninthUnitMomentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCurrentIsRequired() throws Exception {
        int databaseSizeBeforeTest = ninthUnitMomentRepository.findAll().size();
        // set the field null
        ninthUnitMoment.setCurrent(null);

        // Create the NinthUnitMoment, which fails.


        restNinthUnitMomentMockMvc.perform(post("/api/ninth-unit-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthUnitMoment)))
            .andExpect(status().isBadRequest());

        List<NinthUnitMoment> ninthUnitMomentList = ninthUnitMomentRepository.findAll();
        assertThat(ninthUnitMomentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSinceInstantIsRequired() throws Exception {
        int databaseSizeBeforeTest = ninthUnitMomentRepository.findAll().size();
        // set the field null
        ninthUnitMoment.setSinceInstant(null);

        // Create the NinthUnitMoment, which fails.


        restNinthUnitMomentMockMvc.perform(post("/api/ninth-unit-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthUnitMoment)))
            .andExpect(status().isBadRequest());

        List<NinthUnitMoment> ninthUnitMomentList = ninthUnitMomentRepository.findAll();
        assertThat(ninthUnitMomentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNinthUnitMoments() throws Exception {
        // Initialize the database
        ninthUnitMomentRepository.saveAndFlush(ninthUnitMoment);

        // Get all the ninthUnitMomentList
        restNinthUnitMomentMockMvc.perform(get("/api/ninth-unit-moments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ninthUnitMoment.getId().intValue())))
            .andExpect(jsonPath("$.[*].current").value(hasItem(DEFAULT_CURRENT.booleanValue())))
            .andExpect(jsonPath("$.[*].sinceInstant").value(hasItem(DEFAULT_SINCE_INSTANT.toString())))
            .andExpect(jsonPath("$.[*].pictureUrl").value(hasItem(DEFAULT_PICTURE_URL)));
    }
    
    @Test
    @Transactional
    public void getNinthUnitMoment() throws Exception {
        // Initialize the database
        ninthUnitMomentRepository.saveAndFlush(ninthUnitMoment);

        // Get the ninthUnitMoment
        restNinthUnitMomentMockMvc.perform(get("/api/ninth-unit-moments/{id}", ninthUnitMoment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ninthUnitMoment.getId().intValue()))
            .andExpect(jsonPath("$.current").value(DEFAULT_CURRENT.booleanValue()))
            .andExpect(jsonPath("$.sinceInstant").value(DEFAULT_SINCE_INSTANT.toString()))
            .andExpect(jsonPath("$.pictureUrl").value(DEFAULT_PICTURE_URL));
    }
    @Test
    @Transactional
    public void getNonExistingNinthUnitMoment() throws Exception {
        // Get the ninthUnitMoment
        restNinthUnitMomentMockMvc.perform(get("/api/ninth-unit-moments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNinthUnitMoment() throws Exception {
        // Initialize the database
        ninthUnitMomentRepository.saveAndFlush(ninthUnitMoment);

        int databaseSizeBeforeUpdate = ninthUnitMomentRepository.findAll().size();

        // Update the ninthUnitMoment
        NinthUnitMoment updatedNinthUnitMoment = ninthUnitMomentRepository.findById(ninthUnitMoment.getId()).get();
        // Disconnect from session so that the updates on updatedNinthUnitMoment are not directly saved in db
        em.detach(updatedNinthUnitMoment);
        updatedNinthUnitMoment
            .current(UPDATED_CURRENT)
            .sinceInstant(UPDATED_SINCE_INSTANT)
            .pictureUrl(UPDATED_PICTURE_URL);

        restNinthUnitMomentMockMvc.perform(put("/api/ninth-unit-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNinthUnitMoment)))
            .andExpect(status().isOk());

        // Validate the NinthUnitMoment in the database
        List<NinthUnitMoment> ninthUnitMomentList = ninthUnitMomentRepository.findAll();
        assertThat(ninthUnitMomentList).hasSize(databaseSizeBeforeUpdate);
        NinthUnitMoment testNinthUnitMoment = ninthUnitMomentList.get(ninthUnitMomentList.size() - 1);
        assertThat(testNinthUnitMoment.isCurrent()).isEqualTo(UPDATED_CURRENT);
        assertThat(testNinthUnitMoment.getSinceInstant()).isEqualTo(UPDATED_SINCE_INSTANT);
        assertThat(testNinthUnitMoment.getPictureUrl()).isEqualTo(UPDATED_PICTURE_URL);
    }

    @Test
    @Transactional
    public void updateNonExistingNinthUnitMoment() throws Exception {
        int databaseSizeBeforeUpdate = ninthUnitMomentRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNinthUnitMomentMockMvc.perform(put("/api/ninth-unit-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthUnitMoment)))
            .andExpect(status().isBadRequest());

        // Validate the NinthUnitMoment in the database
        List<NinthUnitMoment> ninthUnitMomentList = ninthUnitMomentRepository.findAll();
        assertThat(ninthUnitMomentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNinthUnitMoment() throws Exception {
        // Initialize the database
        ninthUnitMomentRepository.saveAndFlush(ninthUnitMoment);

        int databaseSizeBeforeDelete = ninthUnitMomentRepository.findAll().size();

        // Delete the ninthUnitMoment
        restNinthUnitMomentMockMvc.perform(delete("/api/ninth-unit-moments/{id}", ninthUnitMoment.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NinthUnitMoment> ninthUnitMomentList = ninthUnitMomentRepository.findAll();
        assertThat(ninthUnitMomentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
