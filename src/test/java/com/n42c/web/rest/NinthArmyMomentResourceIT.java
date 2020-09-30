package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.NinthArmyMoment;
import com.n42c.repository.NinthArmyMomentRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link NinthArmyMomentResource} REST controller.
 */
@SpringBootTest(classes = { N42CApp.class, TestSecurityConfiguration.class })
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class NinthArmyMomentResourceIT {

    private static final Boolean DEFAULT_CURRENT = false;
    private static final Boolean UPDATED_CURRENT = true;

    private static final Instant DEFAULT_SINCE_INSTANT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SINCE_INSTANT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_MAJOR_VICTORIES = 1;
    private static final Integer UPDATED_MAJOR_VICTORIES = 2;

    private static final Integer DEFAULT_MINOR_VICTORIES = 1;
    private static final Integer UPDATED_MINOR_VICTORIES = 2;

    private static final Integer DEFAULT_DRAWS = 1;
    private static final Integer UPDATED_DRAWS = 2;

    private static final Integer DEFAULT_MINOR_DEFEATS = 1;
    private static final Integer UPDATED_MINOR_DEFEATS = 2;

    private static final Integer DEFAULT_MAJOR_DEFEATS = 1;
    private static final Integer UPDATED_MAJOR_DEFEATS = 2;

    private static final Integer DEFAULT_REQUISITION = 1;
    private static final Integer UPDATED_REQUISITION = 2;

    private static final Integer DEFAULT_SUPPLY_LIMIT = 1;
    private static final Integer UPDATED_SUPPLY_LIMIT = 2;

    private static final Integer DEFAULT_SUPPLY_USED = 1;
    private static final Integer UPDATED_SUPPLY_USED = 2;

    private static final String DEFAULT_OBJECTIVES = "AAAAAAAAAA";
    private static final String UPDATED_OBJECTIVES = "BBBBBBBBBB";

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    @Autowired
    private NinthArmyMomentRepository ninthArmyMomentRepository;

    @Mock
    private NinthArmyMomentRepository ninthArmyMomentRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNinthArmyMomentMockMvc;

    private NinthArmyMoment ninthArmyMoment;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthArmyMoment createEntity(EntityManager em) {
        NinthArmyMoment ninthArmyMoment = new NinthArmyMoment()
            .current(DEFAULT_CURRENT)
            .sinceInstant(DEFAULT_SINCE_INSTANT)
            .majorVictories(DEFAULT_MAJOR_VICTORIES)
            .minorVictories(DEFAULT_MINOR_VICTORIES)
            .draws(DEFAULT_DRAWS)
            .minorDefeats(DEFAULT_MINOR_DEFEATS)
            .majorDefeats(DEFAULT_MAJOR_DEFEATS)
            .requisition(DEFAULT_REQUISITION)
            .supplyLimit(DEFAULT_SUPPLY_LIMIT)
            .supplyUsed(DEFAULT_SUPPLY_USED)
            .objectives(DEFAULT_OBJECTIVES)
            .notes(DEFAULT_NOTES);
        return ninthArmyMoment;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthArmyMoment createUpdatedEntity(EntityManager em) {
        NinthArmyMoment ninthArmyMoment = new NinthArmyMoment()
            .current(UPDATED_CURRENT)
            .sinceInstant(UPDATED_SINCE_INSTANT)
            .majorVictories(UPDATED_MAJOR_VICTORIES)
            .minorVictories(UPDATED_MINOR_VICTORIES)
            .draws(UPDATED_DRAWS)
            .minorDefeats(UPDATED_MINOR_DEFEATS)
            .majorDefeats(UPDATED_MAJOR_DEFEATS)
            .requisition(UPDATED_REQUISITION)
            .supplyLimit(UPDATED_SUPPLY_LIMIT)
            .supplyUsed(UPDATED_SUPPLY_USED)
            .objectives(UPDATED_OBJECTIVES)
            .notes(UPDATED_NOTES);
        return ninthArmyMoment;
    }

    @BeforeEach
    public void initTest() {
        ninthArmyMoment = createEntity(em);
    }

    @Test
    @Transactional
    public void createNinthArmyMoment() throws Exception {
        int databaseSizeBeforeCreate = ninthArmyMomentRepository.findAll().size();
        // Create the NinthArmyMoment
        restNinthArmyMomentMockMvc.perform(post("/api/ninth-army-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthArmyMoment)))
            .andExpect(status().isCreated());

        // Validate the NinthArmyMoment in the database
        List<NinthArmyMoment> ninthArmyMomentList = ninthArmyMomentRepository.findAll();
        assertThat(ninthArmyMomentList).hasSize(databaseSizeBeforeCreate + 1);
        NinthArmyMoment testNinthArmyMoment = ninthArmyMomentList.get(ninthArmyMomentList.size() - 1);
        assertThat(testNinthArmyMoment.isCurrent()).isEqualTo(DEFAULT_CURRENT);
        assertThat(testNinthArmyMoment.getSinceInstant()).isEqualTo(DEFAULT_SINCE_INSTANT);
        assertThat(testNinthArmyMoment.getMajorVictories()).isEqualTo(DEFAULT_MAJOR_VICTORIES);
        assertThat(testNinthArmyMoment.getMinorVictories()).isEqualTo(DEFAULT_MINOR_VICTORIES);
        assertThat(testNinthArmyMoment.getDraws()).isEqualTo(DEFAULT_DRAWS);
        assertThat(testNinthArmyMoment.getMinorDefeats()).isEqualTo(DEFAULT_MINOR_DEFEATS);
        assertThat(testNinthArmyMoment.getMajorDefeats()).isEqualTo(DEFAULT_MAJOR_DEFEATS);
        assertThat(testNinthArmyMoment.getRequisition()).isEqualTo(DEFAULT_REQUISITION);
        assertThat(testNinthArmyMoment.getSupplyLimit()).isEqualTo(DEFAULT_SUPPLY_LIMIT);
        assertThat(testNinthArmyMoment.getSupplyUsed()).isEqualTo(DEFAULT_SUPPLY_USED);
        assertThat(testNinthArmyMoment.getObjectives()).isEqualTo(DEFAULT_OBJECTIVES);
        assertThat(testNinthArmyMoment.getNotes()).isEqualTo(DEFAULT_NOTES);
    }

    @Test
    @Transactional
    public void createNinthArmyMomentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ninthArmyMomentRepository.findAll().size();

        // Create the NinthArmyMoment with an existing ID
        ninthArmyMoment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNinthArmyMomentMockMvc.perform(post("/api/ninth-army-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthArmyMoment)))
            .andExpect(status().isBadRequest());

        // Validate the NinthArmyMoment in the database
        List<NinthArmyMoment> ninthArmyMomentList = ninthArmyMomentRepository.findAll();
        assertThat(ninthArmyMomentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCurrentIsRequired() throws Exception {
        int databaseSizeBeforeTest = ninthArmyMomentRepository.findAll().size();
        // set the field null
        ninthArmyMoment.setCurrent(null);

        // Create the NinthArmyMoment, which fails.


        restNinthArmyMomentMockMvc.perform(post("/api/ninth-army-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthArmyMoment)))
            .andExpect(status().isBadRequest());

        List<NinthArmyMoment> ninthArmyMomentList = ninthArmyMomentRepository.findAll();
        assertThat(ninthArmyMomentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSinceInstantIsRequired() throws Exception {
        int databaseSizeBeforeTest = ninthArmyMomentRepository.findAll().size();
        // set the field null
        ninthArmyMoment.setSinceInstant(null);

        // Create the NinthArmyMoment, which fails.


        restNinthArmyMomentMockMvc.perform(post("/api/ninth-army-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthArmyMoment)))
            .andExpect(status().isBadRequest());

        List<NinthArmyMoment> ninthArmyMomentList = ninthArmyMomentRepository.findAll();
        assertThat(ninthArmyMomentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNinthArmyMoments() throws Exception {
        // Initialize the database
        ninthArmyMomentRepository.saveAndFlush(ninthArmyMoment);

        // Get all the ninthArmyMomentList
        restNinthArmyMomentMockMvc.perform(get("/api/ninth-army-moments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ninthArmyMoment.getId().intValue())))
            .andExpect(jsonPath("$.[*].current").value(hasItem(DEFAULT_CURRENT.booleanValue())))
            .andExpect(jsonPath("$.[*].sinceInstant").value(hasItem(DEFAULT_SINCE_INSTANT.toString())))
            .andExpect(jsonPath("$.[*].majorVictories").value(hasItem(DEFAULT_MAJOR_VICTORIES)))
            .andExpect(jsonPath("$.[*].minorVictories").value(hasItem(DEFAULT_MINOR_VICTORIES)))
            .andExpect(jsonPath("$.[*].draws").value(hasItem(DEFAULT_DRAWS)))
            .andExpect(jsonPath("$.[*].minorDefeats").value(hasItem(DEFAULT_MINOR_DEFEATS)))
            .andExpect(jsonPath("$.[*].majorDefeats").value(hasItem(DEFAULT_MAJOR_DEFEATS)))
            .andExpect(jsonPath("$.[*].requisition").value(hasItem(DEFAULT_REQUISITION)))
            .andExpect(jsonPath("$.[*].supplyLimit").value(hasItem(DEFAULT_SUPPLY_LIMIT)))
            .andExpect(jsonPath("$.[*].supplyUsed").value(hasItem(DEFAULT_SUPPLY_USED)))
            .andExpect(jsonPath("$.[*].objectives").value(hasItem(DEFAULT_OBJECTIVES.toString())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllNinthArmyMomentsWithEagerRelationshipsIsEnabled() throws Exception {
        when(ninthArmyMomentRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restNinthArmyMomentMockMvc.perform(get("/api/ninth-army-moments?eagerload=true"))
            .andExpect(status().isOk());

        verify(ninthArmyMomentRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllNinthArmyMomentsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(ninthArmyMomentRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restNinthArmyMomentMockMvc.perform(get("/api/ninth-army-moments?eagerload=true"))
            .andExpect(status().isOk());

        verify(ninthArmyMomentRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getNinthArmyMoment() throws Exception {
        // Initialize the database
        ninthArmyMomentRepository.saveAndFlush(ninthArmyMoment);

        // Get the ninthArmyMoment
        restNinthArmyMomentMockMvc.perform(get("/api/ninth-army-moments/{id}", ninthArmyMoment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ninthArmyMoment.getId().intValue()))
            .andExpect(jsonPath("$.current").value(DEFAULT_CURRENT.booleanValue()))
            .andExpect(jsonPath("$.sinceInstant").value(DEFAULT_SINCE_INSTANT.toString()))
            .andExpect(jsonPath("$.majorVictories").value(DEFAULT_MAJOR_VICTORIES))
            .andExpect(jsonPath("$.minorVictories").value(DEFAULT_MINOR_VICTORIES))
            .andExpect(jsonPath("$.draws").value(DEFAULT_DRAWS))
            .andExpect(jsonPath("$.minorDefeats").value(DEFAULT_MINOR_DEFEATS))
            .andExpect(jsonPath("$.majorDefeats").value(DEFAULT_MAJOR_DEFEATS))
            .andExpect(jsonPath("$.requisition").value(DEFAULT_REQUISITION))
            .andExpect(jsonPath("$.supplyLimit").value(DEFAULT_SUPPLY_LIMIT))
            .andExpect(jsonPath("$.supplyUsed").value(DEFAULT_SUPPLY_USED))
            .andExpect(jsonPath("$.objectives").value(DEFAULT_OBJECTIVES.toString()))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingNinthArmyMoment() throws Exception {
        // Get the ninthArmyMoment
        restNinthArmyMomentMockMvc.perform(get("/api/ninth-army-moments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNinthArmyMoment() throws Exception {
        // Initialize the database
        ninthArmyMomentRepository.saveAndFlush(ninthArmyMoment);

        int databaseSizeBeforeUpdate = ninthArmyMomentRepository.findAll().size();

        // Update the ninthArmyMoment
        NinthArmyMoment updatedNinthArmyMoment = ninthArmyMomentRepository.findById(ninthArmyMoment.getId()).get();
        // Disconnect from session so that the updates on updatedNinthArmyMoment are not directly saved in db
        em.detach(updatedNinthArmyMoment);
        updatedNinthArmyMoment
            .current(UPDATED_CURRENT)
            .sinceInstant(UPDATED_SINCE_INSTANT)
            .majorVictories(UPDATED_MAJOR_VICTORIES)
            .minorVictories(UPDATED_MINOR_VICTORIES)
            .draws(UPDATED_DRAWS)
            .minorDefeats(UPDATED_MINOR_DEFEATS)
            .majorDefeats(UPDATED_MAJOR_DEFEATS)
            .requisition(UPDATED_REQUISITION)
            .supplyLimit(UPDATED_SUPPLY_LIMIT)
            .supplyUsed(UPDATED_SUPPLY_USED)
            .objectives(UPDATED_OBJECTIVES)
            .notes(UPDATED_NOTES);

        restNinthArmyMomentMockMvc.perform(put("/api/ninth-army-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNinthArmyMoment)))
            .andExpect(status().isOk());

        // Validate the NinthArmyMoment in the database
        List<NinthArmyMoment> ninthArmyMomentList = ninthArmyMomentRepository.findAll();
        assertThat(ninthArmyMomentList).hasSize(databaseSizeBeforeUpdate);
        NinthArmyMoment testNinthArmyMoment = ninthArmyMomentList.get(ninthArmyMomentList.size() - 1);
        assertThat(testNinthArmyMoment.isCurrent()).isEqualTo(UPDATED_CURRENT);
        assertThat(testNinthArmyMoment.getSinceInstant()).isEqualTo(UPDATED_SINCE_INSTANT);
        assertThat(testNinthArmyMoment.getMajorVictories()).isEqualTo(UPDATED_MAJOR_VICTORIES);
        assertThat(testNinthArmyMoment.getMinorVictories()).isEqualTo(UPDATED_MINOR_VICTORIES);
        assertThat(testNinthArmyMoment.getDraws()).isEqualTo(UPDATED_DRAWS);
        assertThat(testNinthArmyMoment.getMinorDefeats()).isEqualTo(UPDATED_MINOR_DEFEATS);
        assertThat(testNinthArmyMoment.getMajorDefeats()).isEqualTo(UPDATED_MAJOR_DEFEATS);
        assertThat(testNinthArmyMoment.getRequisition()).isEqualTo(UPDATED_REQUISITION);
        assertThat(testNinthArmyMoment.getSupplyLimit()).isEqualTo(UPDATED_SUPPLY_LIMIT);
        assertThat(testNinthArmyMoment.getSupplyUsed()).isEqualTo(UPDATED_SUPPLY_USED);
        assertThat(testNinthArmyMoment.getObjectives()).isEqualTo(UPDATED_OBJECTIVES);
        assertThat(testNinthArmyMoment.getNotes()).isEqualTo(UPDATED_NOTES);
    }

    @Test
    @Transactional
    public void updateNonExistingNinthArmyMoment() throws Exception {
        int databaseSizeBeforeUpdate = ninthArmyMomentRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNinthArmyMomentMockMvc.perform(put("/api/ninth-army-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthArmyMoment)))
            .andExpect(status().isBadRequest());

        // Validate the NinthArmyMoment in the database
        List<NinthArmyMoment> ninthArmyMomentList = ninthArmyMomentRepository.findAll();
        assertThat(ninthArmyMomentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNinthArmyMoment() throws Exception {
        // Initialize the database
        ninthArmyMomentRepository.saveAndFlush(ninthArmyMoment);

        int databaseSizeBeforeDelete = ninthArmyMomentRepository.findAll().size();

        // Delete the ninthArmyMoment
        restNinthArmyMomentMockMvc.perform(delete("/api/ninth-army-moments/{id}", ninthArmyMoment.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NinthArmyMoment> ninthArmyMomentList = ninthArmyMomentRepository.findAll();
        assertThat(ninthArmyMomentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
