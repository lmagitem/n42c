package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.NinthStratagem;
import com.n42c.domain.enumerations.Faction;
import com.n42c.domain.enumerations.NinthGamePhase;
import com.n42c.domain.enumerations.NinthGameTurn;
import com.n42c.domain.enumerations.SubFaction;
import com.n42c.repository.NinthStratagemRepository;
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
 * Integration tests for the {@link NinthStratagemResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@AutoConfigureMockMvc
@WithMockUser
public class NinthStratagemResourceIT {

    private static final Integer DEFAULT_COST = 1;
    private static final Integer UPDATED_COST = 2;

    private static final Faction DEFAULT_FACTION = Faction.IM;
    private static final Faction UPDATED_FACTION = Faction.CH;

    private static final SubFaction DEFAULT_SUBFACTION = SubFaction.SM;
    private static final SubFaction UPDATED_SUBFACTION = SubFaction.BA;

    private static final NinthGameTurn DEFAULT_TURN = NinthGameTurn.US;
    private static final NinthGameTurn UPDATED_TURN = NinthGameTurn.OP;

    private static final NinthGamePhase DEFAULT_PHASE = NinthGamePhase.PG;
    private static final NinthGamePhase UPDATED_PHASE = NinthGamePhase.CP;

    @Autowired
    private NinthStratagemRepository ninthStratagemRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNinthStratagemMockMvc;

    private NinthStratagem ninthStratagem;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthStratagem createEntity(EntityManager em) {
        NinthStratagem ninthStratagem = new NinthStratagem()
            .cost(DEFAULT_COST)
            .faction(DEFAULT_FACTION)
            .subfaction(DEFAULT_SUBFACTION)
            .turn(DEFAULT_TURN)
            .phase(DEFAULT_PHASE);
        return ninthStratagem;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthStratagem createUpdatedEntity(EntityManager em) {
        NinthStratagem ninthStratagem = new NinthStratagem()
            .cost(UPDATED_COST)
            .faction(UPDATED_FACTION)
            .subfaction(UPDATED_SUBFACTION)
            .turn(UPDATED_TURN)
            .phase(UPDATED_PHASE);
        return ninthStratagem;
    }

    @BeforeEach
    public void initTest() {
        ninthStratagem = createEntity(em);
    }

    @Test
    @Transactional
    public void createNinthStratagem() throws Exception {
        int databaseSizeBeforeCreate = ninthStratagemRepository.findAll().size();
        // Create the NinthStratagem
        restNinthStratagemMockMvc.perform(post("/api/ninth-stratagems").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthStratagem)))
            .andExpect(status().isCreated());

        // Validate the NinthStratagem in the database
        List<NinthStratagem> ninthStratagemList = ninthStratagemRepository.findAll();
        assertThat(ninthStratagemList).hasSize(databaseSizeBeforeCreate + 1);
        NinthStratagem testNinthStratagem = ninthStratagemList.get(ninthStratagemList.size() - 1);
        assertThat(testNinthStratagem.getCost()).isEqualTo(DEFAULT_COST);
        assertThat(testNinthStratagem.getFaction()).isEqualTo(DEFAULT_FACTION);
        assertThat(testNinthStratagem.getSubfaction()).isEqualTo(DEFAULT_SUBFACTION);
        assertThat(testNinthStratagem.getTurn()).isEqualTo(DEFAULT_TURN);
        assertThat(testNinthStratagem.getPhase()).isEqualTo(DEFAULT_PHASE);
    }

    @Test
    @Transactional
    public void createNinthStratagemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ninthStratagemRepository.findAll().size();

        // Create the NinthStratagem with an existing ID
        ninthStratagem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNinthStratagemMockMvc.perform(post("/api/ninth-stratagems").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthStratagem)))
            .andExpect(status().isBadRequest());

        // Validate the NinthStratagem in the database
        List<NinthStratagem> ninthStratagemList = ninthStratagemRepository.findAll();
        assertThat(ninthStratagemList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNinthStratagems() throws Exception {
        // Initialize the database
        ninthStratagemRepository.saveAndFlush(ninthStratagem);

        // Get all the ninthStratagemList
        restNinthStratagemMockMvc.perform(get("/api/ninth-stratagems?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ninthStratagem.getId().intValue())))
            .andExpect(jsonPath("$.[*].cost").value(hasItem(DEFAULT_COST)))
            .andExpect(jsonPath("$.[*].faction").value(hasItem(DEFAULT_FACTION.toString())))
            .andExpect(jsonPath("$.[*].subfaction").value(hasItem(DEFAULT_SUBFACTION.toString())))
            .andExpect(jsonPath("$.[*].turn").value(hasItem(DEFAULT_TURN.toString())))
            .andExpect(jsonPath("$.[*].phase").value(hasItem(DEFAULT_PHASE.toString())));
    }

    @Test
    @Transactional
    public void getNinthStratagem() throws Exception {
        // Initialize the database
        ninthStratagemRepository.saveAndFlush(ninthStratagem);

        // Get the ninthStratagem
        restNinthStratagemMockMvc.perform(get("/api/ninth-stratagems/{id}", ninthStratagem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ninthStratagem.getId().intValue()))
            .andExpect(jsonPath("$.cost").value(DEFAULT_COST))
            .andExpect(jsonPath("$.faction").value(DEFAULT_FACTION.toString()))
            .andExpect(jsonPath("$.subfaction").value(DEFAULT_SUBFACTION.toString()))
            .andExpect(jsonPath("$.turn").value(DEFAULT_TURN.toString()))
            .andExpect(jsonPath("$.phase").value(DEFAULT_PHASE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNinthStratagem() throws Exception {
        // Get the ninthStratagem
        restNinthStratagemMockMvc.perform(get("/api/ninth-stratagems/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNinthStratagem() throws Exception {
        // Initialize the database
        ninthStratagemRepository.saveAndFlush(ninthStratagem);

        int databaseSizeBeforeUpdate = ninthStratagemRepository.findAll().size();

        // Update the ninthStratagem
        NinthStratagem updatedNinthStratagem = ninthStratagemRepository.findById(ninthStratagem.getId()).get();
        // Disconnect from session so that the updates on updatedNinthStratagem are not directly saved in db
        em.detach(updatedNinthStratagem);
        updatedNinthStratagem
            .cost(UPDATED_COST)
            .faction(UPDATED_FACTION)
            .subfaction(UPDATED_SUBFACTION)
            .turn(UPDATED_TURN)
            .phase(UPDATED_PHASE);

        restNinthStratagemMockMvc.perform(put("/api/ninth-stratagems").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNinthStratagem)))
            .andExpect(status().isOk());

        // Validate the NinthStratagem in the database
        List<NinthStratagem> ninthStratagemList = ninthStratagemRepository.findAll();
        assertThat(ninthStratagemList).hasSize(databaseSizeBeforeUpdate);
        NinthStratagem testNinthStratagem = ninthStratagemList.get(ninthStratagemList.size() - 1);
        assertThat(testNinthStratagem.getCost()).isEqualTo(UPDATED_COST);
        assertThat(testNinthStratagem.getFaction()).isEqualTo(UPDATED_FACTION);
        assertThat(testNinthStratagem.getSubfaction()).isEqualTo(UPDATED_SUBFACTION);
        assertThat(testNinthStratagem.getTurn()).isEqualTo(UPDATED_TURN);
        assertThat(testNinthStratagem.getPhase()).isEqualTo(UPDATED_PHASE);
    }

    @Test
    @Transactional
    public void updateNonExistingNinthStratagem() throws Exception {
        int databaseSizeBeforeUpdate = ninthStratagemRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNinthStratagemMockMvc.perform(put("/api/ninth-stratagems").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthStratagem)))
            .andExpect(status().isBadRequest());

        // Validate the NinthStratagem in the database
        List<NinthStratagem> ninthStratagemList = ninthStratagemRepository.findAll();
        assertThat(ninthStratagemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNinthStratagem() throws Exception {
        // Initialize the database
        ninthStratagemRepository.saveAndFlush(ninthStratagem);

        int databaseSizeBeforeDelete = ninthStratagemRepository.findAll().size();

        // Delete the ninthStratagem
        restNinthStratagemMockMvc.perform(delete("/api/ninth-stratagems/{id}", ninthStratagem.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NinthStratagem> ninthStratagemList = ninthStratagemRepository.findAll();
        assertThat(ninthStratagemList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
