package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.NinthArmy;
import com.n42c.domain.Player;
import com.n42c.domain.enumeration.Faction;
import com.n42c.domain.enumeration.SubFaction;
import com.n42c.repository.NinthArmyRepository;
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
 * Integration tests for the {@link NinthArmyResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@AutoConfigureMockMvc
@WithMockUser
public class NinthArmyResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_CRUSADE = false;
    private static final Boolean UPDATED_CRUSADE = true;

    private static final Faction DEFAULT_FACTION = Faction.IM;
    private static final Faction UPDATED_FACTION = Faction.CH;

    private static final SubFaction DEFAULT_SUBFACTION = SubFaction.SM;
    private static final SubFaction UPDATED_SUBFACTION = SubFaction.BA;

    @Autowired
    private NinthArmyRepository ninthArmyRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNinthArmyMockMvc;

    private NinthArmy ninthArmy;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthArmy createEntity(EntityManager em) {
        NinthArmy ninthArmy = new NinthArmy()
            .name(DEFAULT_NAME)
            .crusade(DEFAULT_CRUSADE)
            .faction(DEFAULT_FACTION)
            .subfaction(DEFAULT_SUBFACTION);
        // Add required entity
        Player player;
        if (TestUtil.findAll(em, Player.class).isEmpty()) {
            player = PlayerResourceIT.createEntity(em);
            em.persist(player);
            em.flush();
        } else {
            player = TestUtil.findAll(em, Player.class).get(0);
        }
        ninthArmy.setAuthor(player);
        return ninthArmy;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthArmy createUpdatedEntity(EntityManager em) {
        NinthArmy ninthArmy = new NinthArmy()
            .name(UPDATED_NAME)
            .crusade(UPDATED_CRUSADE)
            .faction(UPDATED_FACTION)
            .subfaction(UPDATED_SUBFACTION);
        // Add required entity
        Player player;
        if (TestUtil.findAll(em, Player.class).isEmpty()) {
            player = PlayerResourceIT.createUpdatedEntity(em);
            em.persist(player);
            em.flush();
        } else {
            player = TestUtil.findAll(em, Player.class).get(0);
        }
        ninthArmy.setAuthor(player);
        return ninthArmy;
    }

    @BeforeEach
    public void initTest() {
        ninthArmy = createEntity(em);
    }

    @Test
    @Transactional
    public void createNinthArmy() throws Exception {
        int databaseSizeBeforeCreate = ninthArmyRepository.findAll().size();
        // Create the NinthArmy
        restNinthArmyMockMvc.perform(post("/api/ninth-armies").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthArmy)))
            .andExpect(status().isCreated());

        // Validate the NinthArmy in the database
        List<NinthArmy> ninthArmyList = ninthArmyRepository.findAll();
        assertThat(ninthArmyList).hasSize(databaseSizeBeforeCreate + 1);
        NinthArmy testNinthArmy = ninthArmyList.get(ninthArmyList.size() - 1);
        assertThat(testNinthArmy.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testNinthArmy.isCrusade()).isEqualTo(DEFAULT_CRUSADE);
        assertThat(testNinthArmy.getFaction()).isEqualTo(DEFAULT_FACTION);
        assertThat(testNinthArmy.getSubfaction()).isEqualTo(DEFAULT_SUBFACTION);
    }

    @Test
    @Transactional
    public void createNinthArmyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ninthArmyRepository.findAll().size();

        // Create the NinthArmy with an existing ID
        ninthArmy.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNinthArmyMockMvc.perform(post("/api/ninth-armies").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthArmy)))
            .andExpect(status().isBadRequest());

        // Validate the NinthArmy in the database
        List<NinthArmy> ninthArmyList = ninthArmyRepository.findAll();
        assertThat(ninthArmyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = ninthArmyRepository.findAll().size();
        // set the field null
        ninthArmy.setName(null);

        // Create the NinthArmy, which fails.


        restNinthArmyMockMvc.perform(post("/api/ninth-armies").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthArmy)))
            .andExpect(status().isBadRequest());

        List<NinthArmy> ninthArmyList = ninthArmyRepository.findAll();
        assertThat(ninthArmyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCrusadeIsRequired() throws Exception {
        int databaseSizeBeforeTest = ninthArmyRepository.findAll().size();
        // set the field null
        ninthArmy.setCrusade(null);

        // Create the NinthArmy, which fails.


        restNinthArmyMockMvc.perform(post("/api/ninth-armies").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthArmy)))
            .andExpect(status().isBadRequest());

        List<NinthArmy> ninthArmyList = ninthArmyRepository.findAll();
        assertThat(ninthArmyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNinthArmies() throws Exception {
        // Initialize the database
        ninthArmyRepository.saveAndFlush(ninthArmy);

        // Get all the ninthArmyList
        restNinthArmyMockMvc.perform(get("/api/ninth-armies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ninthArmy.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].crusade").value(hasItem(DEFAULT_CRUSADE.booleanValue())))
            .andExpect(jsonPath("$.[*].faction").value(hasItem(DEFAULT_FACTION.toString())))
            .andExpect(jsonPath("$.[*].subfaction").value(hasItem(DEFAULT_SUBFACTION.toString())));
    }

    @Test
    @Transactional
    public void getNinthArmy() throws Exception {
        // Initialize the database
        ninthArmyRepository.saveAndFlush(ninthArmy);

        // Get the ninthArmy
        restNinthArmyMockMvc.perform(get("/api/ninth-armies/{id}", ninthArmy.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ninthArmy.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.crusade").value(DEFAULT_CRUSADE.booleanValue()))
            .andExpect(jsonPath("$.faction").value(DEFAULT_FACTION.toString()))
            .andExpect(jsonPath("$.subfaction").value(DEFAULT_SUBFACTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNinthArmy() throws Exception {
        // Get the ninthArmy
        restNinthArmyMockMvc.perform(get("/api/ninth-armies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNinthArmy() throws Exception {
        // Initialize the database
        ninthArmyRepository.saveAndFlush(ninthArmy);

        int databaseSizeBeforeUpdate = ninthArmyRepository.findAll().size();

        // Update the ninthArmy
        NinthArmy updatedNinthArmy = ninthArmyRepository.findById(ninthArmy.getId()).get();
        // Disconnect from session so that the updates on updatedNinthArmy are not directly saved in db
        em.detach(updatedNinthArmy);
        updatedNinthArmy
            .name(UPDATED_NAME)
            .crusade(UPDATED_CRUSADE)
            .faction(UPDATED_FACTION)
            .subfaction(UPDATED_SUBFACTION);

        restNinthArmyMockMvc.perform(put("/api/ninth-armies").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNinthArmy)))
            .andExpect(status().isOk());

        // Validate the NinthArmy in the database
        List<NinthArmy> ninthArmyList = ninthArmyRepository.findAll();
        assertThat(ninthArmyList).hasSize(databaseSizeBeforeUpdate);
        NinthArmy testNinthArmy = ninthArmyList.get(ninthArmyList.size() - 1);
        assertThat(testNinthArmy.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testNinthArmy.isCrusade()).isEqualTo(UPDATED_CRUSADE);
        assertThat(testNinthArmy.getFaction()).isEqualTo(UPDATED_FACTION);
        assertThat(testNinthArmy.getSubfaction()).isEqualTo(UPDATED_SUBFACTION);
    }

    @Test
    @Transactional
    public void updateNonExistingNinthArmy() throws Exception {
        int databaseSizeBeforeUpdate = ninthArmyRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNinthArmyMockMvc.perform(put("/api/ninth-armies").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthArmy)))
            .andExpect(status().isBadRequest());

        // Validate the NinthArmy in the database
        List<NinthArmy> ninthArmyList = ninthArmyRepository.findAll();
        assertThat(ninthArmyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNinthArmy() throws Exception {
        // Initialize the database
        ninthArmyRepository.saveAndFlush(ninthArmy);

        int databaseSizeBeforeDelete = ninthArmyRepository.findAll().size();

        // Delete the ninthArmy
        restNinthArmyMockMvc.perform(delete("/api/ninth-armies/{id}", ninthArmy.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NinthArmy> ninthArmyList = ninthArmyRepository.findAll();
        assertThat(ninthArmyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
