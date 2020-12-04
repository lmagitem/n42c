package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.NinthObjective;
import com.n42c.domain.enumeration.NinthObjectiveType;
import com.n42c.repository.NinthObjectiveRepository;
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
 * Integration tests for the {@link NinthObjectiveResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@AutoConfigureMockMvc
@WithMockUser
public class NinthObjectiveResourceIT {

    private static final Boolean DEFAULT_SHAREABLE = false;
    private static final Boolean UPDATED_SHAREABLE = true;

    private static final NinthObjectiveType DEFAULT_TYPE = NinthObjectiveType.PR;
    private static final NinthObjectiveType UPDATED_TYPE = NinthObjectiveType.EN;

    @Autowired
    private NinthObjectiveRepository ninthObjectiveRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNinthObjectiveMockMvc;

    private NinthObjective ninthObjective;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthObjective createEntity(EntityManager em) {
        NinthObjective ninthObjective = new NinthObjective()
            .shareable(DEFAULT_SHAREABLE)
            .type(DEFAULT_TYPE);
        return ninthObjective;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthObjective createUpdatedEntity(EntityManager em) {
        NinthObjective ninthObjective = new NinthObjective()
            .shareable(UPDATED_SHAREABLE)
            .type(UPDATED_TYPE);
        return ninthObjective;
    }

    @BeforeEach
    public void initTest() {
        ninthObjective = createEntity(em);
    }

    @Test
    @Transactional
    public void createNinthObjective() throws Exception {
        int databaseSizeBeforeCreate = ninthObjectiveRepository.findAll().size();
        // Create the NinthObjective
        restNinthObjectiveMockMvc.perform(post("/api/ninth-objectives").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthObjective)))
            .andExpect(status().isCreated());

        // Validate the NinthObjective in the database
        List<NinthObjective> ninthObjectiveList = ninthObjectiveRepository.findAll();
        assertThat(ninthObjectiveList).hasSize(databaseSizeBeforeCreate + 1);
        NinthObjective testNinthObjective = ninthObjectiveList.get(ninthObjectiveList.size() - 1);
        assertThat(testNinthObjective.isShareable()).isEqualTo(DEFAULT_SHAREABLE);
        assertThat(testNinthObjective.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createNinthObjectiveWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ninthObjectiveRepository.findAll().size();

        // Create the NinthObjective with an existing ID
        ninthObjective.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNinthObjectiveMockMvc.perform(post("/api/ninth-objectives").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthObjective)))
            .andExpect(status().isBadRequest());

        // Validate the NinthObjective in the database
        List<NinthObjective> ninthObjectiveList = ninthObjectiveRepository.findAll();
        assertThat(ninthObjectiveList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNinthObjectives() throws Exception {
        // Initialize the database
        ninthObjectiveRepository.saveAndFlush(ninthObjective);

        // Get all the ninthObjectiveList
        restNinthObjectiveMockMvc.perform(get("/api/ninth-objectives?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ninthObjective.getId().intValue())))
            .andExpect(jsonPath("$.[*].shareable").value(hasItem(DEFAULT_SHAREABLE.booleanValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getNinthObjective() throws Exception {
        // Initialize the database
        ninthObjectiveRepository.saveAndFlush(ninthObjective);

        // Get the ninthObjective
        restNinthObjectiveMockMvc.perform(get("/api/ninth-objectives/{id}", ninthObjective.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ninthObjective.getId().intValue()))
            .andExpect(jsonPath("$.shareable").value(DEFAULT_SHAREABLE.booleanValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNinthObjective() throws Exception {
        // Get the ninthObjective
        restNinthObjectiveMockMvc.perform(get("/api/ninth-objectives/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNinthObjective() throws Exception {
        // Initialize the database
        ninthObjectiveRepository.saveAndFlush(ninthObjective);

        int databaseSizeBeforeUpdate = ninthObjectiveRepository.findAll().size();

        // Update the ninthObjective
        NinthObjective updatedNinthObjective = ninthObjectiveRepository.findById(ninthObjective.getId()).get();
        // Disconnect from session so that the updates on updatedNinthObjective are not directly saved in db
        em.detach(updatedNinthObjective);
        updatedNinthObjective
            .shareable(UPDATED_SHAREABLE)
            .type(UPDATED_TYPE);

        restNinthObjectiveMockMvc.perform(put("/api/ninth-objectives").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNinthObjective)))
            .andExpect(status().isOk());

        // Validate the NinthObjective in the database
        List<NinthObjective> ninthObjectiveList = ninthObjectiveRepository.findAll();
        assertThat(ninthObjectiveList).hasSize(databaseSizeBeforeUpdate);
        NinthObjective testNinthObjective = ninthObjectiveList.get(ninthObjectiveList.size() - 1);
        assertThat(testNinthObjective.isShareable()).isEqualTo(UPDATED_SHAREABLE);
        assertThat(testNinthObjective.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingNinthObjective() throws Exception {
        int databaseSizeBeforeUpdate = ninthObjectiveRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNinthObjectiveMockMvc.perform(put("/api/ninth-objectives").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthObjective)))
            .andExpect(status().isBadRequest());

        // Validate the NinthObjective in the database
        List<NinthObjective> ninthObjectiveList = ninthObjectiveRepository.findAll();
        assertThat(ninthObjectiveList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNinthObjective() throws Exception {
        // Initialize the database
        ninthObjectiveRepository.saveAndFlush(ninthObjective);

        int databaseSizeBeforeDelete = ninthObjectiveRepository.findAll().size();

        // Delete the ninthObjective
        restNinthObjectiveMockMvc.perform(delete("/api/ninth-objectives/{id}", ninthObjective.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NinthObjective> ninthObjectiveList = ninthObjectiveRepository.findAll();
        assertThat(ninthObjectiveList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
