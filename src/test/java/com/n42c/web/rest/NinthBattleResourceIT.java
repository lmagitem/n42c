package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.NinthBattle;
import com.n42c.repository.NinthBattleRepository;

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
 * Integration tests for the {@link NinthBattleResource} REST controller.
 */
@SpringBootTest(classes = { N42CApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class NinthBattleResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private NinthBattleRepository ninthBattleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNinthBattleMockMvc;

    private NinthBattle ninthBattle;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthBattle createEntity(EntityManager em) {
        NinthBattle ninthBattle = new NinthBattle()
            .name(DEFAULT_NAME);
        return ninthBattle;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthBattle createUpdatedEntity(EntityManager em) {
        NinthBattle ninthBattle = new NinthBattle()
            .name(UPDATED_NAME);
        return ninthBattle;
    }

    @BeforeEach
    public void initTest() {
        ninthBattle = createEntity(em);
    }

    @Test
    @Transactional
    public void createNinthBattle() throws Exception {
        int databaseSizeBeforeCreate = ninthBattleRepository.findAll().size();
        // Create the NinthBattle
        restNinthBattleMockMvc.perform(post("/api/ninth-battles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthBattle)))
            .andExpect(status().isCreated());

        // Validate the NinthBattle in the database
        List<NinthBattle> ninthBattleList = ninthBattleRepository.findAll();
        assertThat(ninthBattleList).hasSize(databaseSizeBeforeCreate + 1);
        NinthBattle testNinthBattle = ninthBattleList.get(ninthBattleList.size() - 1);
        assertThat(testNinthBattle.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createNinthBattleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ninthBattleRepository.findAll().size();

        // Create the NinthBattle with an existing ID
        ninthBattle.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNinthBattleMockMvc.perform(post("/api/ninth-battles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthBattle)))
            .andExpect(status().isBadRequest());

        // Validate the NinthBattle in the database
        List<NinthBattle> ninthBattleList = ninthBattleRepository.findAll();
        assertThat(ninthBattleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNinthBattles() throws Exception {
        // Initialize the database
        ninthBattleRepository.saveAndFlush(ninthBattle);

        // Get all the ninthBattleList
        restNinthBattleMockMvc.perform(get("/api/ninth-battles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ninthBattle.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getNinthBattle() throws Exception {
        // Initialize the database
        ninthBattleRepository.saveAndFlush(ninthBattle);

        // Get the ninthBattle
        restNinthBattleMockMvc.perform(get("/api/ninth-battles/{id}", ninthBattle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ninthBattle.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingNinthBattle() throws Exception {
        // Get the ninthBattle
        restNinthBattleMockMvc.perform(get("/api/ninth-battles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNinthBattle() throws Exception {
        // Initialize the database
        ninthBattleRepository.saveAndFlush(ninthBattle);

        int databaseSizeBeforeUpdate = ninthBattleRepository.findAll().size();

        // Update the ninthBattle
        NinthBattle updatedNinthBattle = ninthBattleRepository.findById(ninthBattle.getId()).get();
        // Disconnect from session so that the updates on updatedNinthBattle are not directly saved in db
        em.detach(updatedNinthBattle);
        updatedNinthBattle
            .name(UPDATED_NAME);

        restNinthBattleMockMvc.perform(put("/api/ninth-battles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNinthBattle)))
            .andExpect(status().isOk());

        // Validate the NinthBattle in the database
        List<NinthBattle> ninthBattleList = ninthBattleRepository.findAll();
        assertThat(ninthBattleList).hasSize(databaseSizeBeforeUpdate);
        NinthBattle testNinthBattle = ninthBattleList.get(ninthBattleList.size() - 1);
        assertThat(testNinthBattle.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingNinthBattle() throws Exception {
        int databaseSizeBeforeUpdate = ninthBattleRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNinthBattleMockMvc.perform(put("/api/ninth-battles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthBattle)))
            .andExpect(status().isBadRequest());

        // Validate the NinthBattle in the database
        List<NinthBattle> ninthBattleList = ninthBattleRepository.findAll();
        assertThat(ninthBattleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNinthBattle() throws Exception {
        // Initialize the database
        ninthBattleRepository.saveAndFlush(ninthBattle);

        int databaseSizeBeforeDelete = ninthBattleRepository.findAll().size();

        // Delete the ninthBattle
        restNinthBattleMockMvc.perform(delete("/api/ninth-battles/{id}", ninthBattle.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NinthBattle> ninthBattleList = ninthBattleRepository.findAll();
        assertThat(ninthBattleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
