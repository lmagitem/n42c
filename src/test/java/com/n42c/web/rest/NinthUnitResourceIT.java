package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.NinthUnit;
import com.n42c.domain.Player;
import com.n42c.repository.NinthUnitRepository;

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

import com.n42c.domain.enumeration.Faction;
import com.n42c.domain.enumeration.SubFaction;
import com.n42c.domain.enumeration.NinthBattlefieldRole;
/**
 * Integration tests for the {@link NinthUnitResource} REST controller.
 */
@SpringBootTest(classes = { N42CApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class NinthUnitResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DATASHEET = "AAAAAAAAAA";
    private static final String UPDATED_DATASHEET = "BBBBBBBBBB";

    private static final Faction DEFAULT_FACTION = Faction.IM;
    private static final Faction UPDATED_FACTION = Faction.CH;

    private static final SubFaction DEFAULT_SUBFACTION = SubFaction.SM;
    private static final SubFaction UPDATED_SUBFACTION = SubFaction.BA;

    private static final NinthBattlefieldRole DEFAULT_BATTLEFIELD_ROLE = NinthBattlefieldRole.HQ;
    private static final NinthBattlefieldRole UPDATED_BATTLEFIELD_ROLE = NinthBattlefieldRole.TR;

    private static final String DEFAULT_KEYWORDS = "AAAAAAAAAA";
    private static final String UPDATED_KEYWORDS = "BBBBBBBBBB";

    @Autowired
    private NinthUnitRepository ninthUnitRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNinthUnitMockMvc;

    private NinthUnit ninthUnit;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthUnit createEntity(EntityManager em) {
        NinthUnit ninthUnit = new NinthUnit()
            .name(DEFAULT_NAME)
            .datasheet(DEFAULT_DATASHEET)
            .faction(DEFAULT_FACTION)
            .subfaction(DEFAULT_SUBFACTION)
            .battlefieldRole(DEFAULT_BATTLEFIELD_ROLE)
            .keywords(DEFAULT_KEYWORDS);
        // Add required entity
        Player player;
        if (TestUtil.findAll(em, Player.class).isEmpty()) {
            player = PlayerResourceIT.createEntity(em);
            em.persist(player);
            em.flush();
        } else {
            player = TestUtil.findAll(em, Player.class).get(0);
        }
        ninthUnit.setOwner(player);
        return ninthUnit;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthUnit createUpdatedEntity(EntityManager em) {
        NinthUnit ninthUnit = new NinthUnit()
            .name(UPDATED_NAME)
            .datasheet(UPDATED_DATASHEET)
            .faction(UPDATED_FACTION)
            .subfaction(UPDATED_SUBFACTION)
            .battlefieldRole(UPDATED_BATTLEFIELD_ROLE)
            .keywords(UPDATED_KEYWORDS);
        // Add required entity
        Player player;
        if (TestUtil.findAll(em, Player.class).isEmpty()) {
            player = PlayerResourceIT.createUpdatedEntity(em);
            em.persist(player);
            em.flush();
        } else {
            player = TestUtil.findAll(em, Player.class).get(0);
        }
        ninthUnit.setOwner(player);
        return ninthUnit;
    }

    @BeforeEach
    public void initTest() {
        ninthUnit = createEntity(em);
    }

    @Test
    @Transactional
    public void createNinthUnit() throws Exception {
        int databaseSizeBeforeCreate = ninthUnitRepository.findAll().size();
        // Create the NinthUnit
        restNinthUnitMockMvc.perform(post("/api/ninth-units").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthUnit)))
            .andExpect(status().isCreated());

        // Validate the NinthUnit in the database
        List<NinthUnit> ninthUnitList = ninthUnitRepository.findAll();
        assertThat(ninthUnitList).hasSize(databaseSizeBeforeCreate + 1);
        NinthUnit testNinthUnit = ninthUnitList.get(ninthUnitList.size() - 1);
        assertThat(testNinthUnit.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testNinthUnit.getDatasheet()).isEqualTo(DEFAULT_DATASHEET);
        assertThat(testNinthUnit.getFaction()).isEqualTo(DEFAULT_FACTION);
        assertThat(testNinthUnit.getSubfaction()).isEqualTo(DEFAULT_SUBFACTION);
        assertThat(testNinthUnit.getBattlefieldRole()).isEqualTo(DEFAULT_BATTLEFIELD_ROLE);
        assertThat(testNinthUnit.getKeywords()).isEqualTo(DEFAULT_KEYWORDS);
    }

    @Test
    @Transactional
    public void createNinthUnitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ninthUnitRepository.findAll().size();

        // Create the NinthUnit with an existing ID
        ninthUnit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNinthUnitMockMvc.perform(post("/api/ninth-units").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthUnit)))
            .andExpect(status().isBadRequest());

        // Validate the NinthUnit in the database
        List<NinthUnit> ninthUnitList = ninthUnitRepository.findAll();
        assertThat(ninthUnitList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = ninthUnitRepository.findAll().size();
        // set the field null
        ninthUnit.setName(null);

        // Create the NinthUnit, which fails.


        restNinthUnitMockMvc.perform(post("/api/ninth-units").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthUnit)))
            .andExpect(status().isBadRequest());

        List<NinthUnit> ninthUnitList = ninthUnitRepository.findAll();
        assertThat(ninthUnitList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNinthUnits() throws Exception {
        // Initialize the database
        ninthUnitRepository.saveAndFlush(ninthUnit);

        // Get all the ninthUnitList
        restNinthUnitMockMvc.perform(get("/api/ninth-units?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ninthUnit.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].datasheet").value(hasItem(DEFAULT_DATASHEET)))
            .andExpect(jsonPath("$.[*].faction").value(hasItem(DEFAULT_FACTION.toString())))
            .andExpect(jsonPath("$.[*].subfaction").value(hasItem(DEFAULT_SUBFACTION.toString())))
            .andExpect(jsonPath("$.[*].battlefieldRole").value(hasItem(DEFAULT_BATTLEFIELD_ROLE.toString())))
            .andExpect(jsonPath("$.[*].keywords").value(hasItem(DEFAULT_KEYWORDS)));
    }
    
    @Test
    @Transactional
    public void getNinthUnit() throws Exception {
        // Initialize the database
        ninthUnitRepository.saveAndFlush(ninthUnit);

        // Get the ninthUnit
        restNinthUnitMockMvc.perform(get("/api/ninth-units/{id}", ninthUnit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ninthUnit.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.datasheet").value(DEFAULT_DATASHEET))
            .andExpect(jsonPath("$.faction").value(DEFAULT_FACTION.toString()))
            .andExpect(jsonPath("$.subfaction").value(DEFAULT_SUBFACTION.toString()))
            .andExpect(jsonPath("$.battlefieldRole").value(DEFAULT_BATTLEFIELD_ROLE.toString()))
            .andExpect(jsonPath("$.keywords").value(DEFAULT_KEYWORDS));
    }
    @Test
    @Transactional
    public void getNonExistingNinthUnit() throws Exception {
        // Get the ninthUnit
        restNinthUnitMockMvc.perform(get("/api/ninth-units/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNinthUnit() throws Exception {
        // Initialize the database
        ninthUnitRepository.saveAndFlush(ninthUnit);

        int databaseSizeBeforeUpdate = ninthUnitRepository.findAll().size();

        // Update the ninthUnit
        NinthUnit updatedNinthUnit = ninthUnitRepository.findById(ninthUnit.getId()).get();
        // Disconnect from session so that the updates on updatedNinthUnit are not directly saved in db
        em.detach(updatedNinthUnit);
        updatedNinthUnit
            .name(UPDATED_NAME)
            .datasheet(UPDATED_DATASHEET)
            .faction(UPDATED_FACTION)
            .subfaction(UPDATED_SUBFACTION)
            .battlefieldRole(UPDATED_BATTLEFIELD_ROLE)
            .keywords(UPDATED_KEYWORDS);

        restNinthUnitMockMvc.perform(put("/api/ninth-units").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNinthUnit)))
            .andExpect(status().isOk());

        // Validate the NinthUnit in the database
        List<NinthUnit> ninthUnitList = ninthUnitRepository.findAll();
        assertThat(ninthUnitList).hasSize(databaseSizeBeforeUpdate);
        NinthUnit testNinthUnit = ninthUnitList.get(ninthUnitList.size() - 1);
        assertThat(testNinthUnit.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testNinthUnit.getDatasheet()).isEqualTo(UPDATED_DATASHEET);
        assertThat(testNinthUnit.getFaction()).isEqualTo(UPDATED_FACTION);
        assertThat(testNinthUnit.getSubfaction()).isEqualTo(UPDATED_SUBFACTION);
        assertThat(testNinthUnit.getBattlefieldRole()).isEqualTo(UPDATED_BATTLEFIELD_ROLE);
        assertThat(testNinthUnit.getKeywords()).isEqualTo(UPDATED_KEYWORDS);
    }

    @Test
    @Transactional
    public void updateNonExistingNinthUnit() throws Exception {
        int databaseSizeBeforeUpdate = ninthUnitRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNinthUnitMockMvc.perform(put("/api/ninth-units").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthUnit)))
            .andExpect(status().isBadRequest());

        // Validate the NinthUnit in the database
        List<NinthUnit> ninthUnitList = ninthUnitRepository.findAll();
        assertThat(ninthUnitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNinthUnit() throws Exception {
        // Initialize the database
        ninthUnitRepository.saveAndFlush(ninthUnit);

        int databaseSizeBeforeDelete = ninthUnitRepository.findAll().size();

        // Delete the ninthUnit
        restNinthUnitMockMvc.perform(delete("/api/ninth-units/{id}", ninthUnit.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NinthUnit> ninthUnitList = ninthUnitRepository.findAll();
        assertThat(ninthUnitList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
