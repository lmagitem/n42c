package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.NinthMissionRule;
import com.n42c.repository.NinthMissionRuleRepository;
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
 * Integration tests for the {@link NinthMissionRuleResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@AutoConfigureMockMvc
@WithMockUser
public class NinthMissionRuleResourceIT {

    @Autowired
    private NinthMissionRuleRepository ninthMissionRuleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNinthMissionRuleMockMvc;

    private NinthMissionRule ninthMissionRule;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthMissionRule createEntity(EntityManager em) {
        NinthMissionRule ninthMissionRule = new NinthMissionRule();
        return ninthMissionRule;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthMissionRule createUpdatedEntity(EntityManager em) {
        NinthMissionRule ninthMissionRule = new NinthMissionRule();
        return ninthMissionRule;
    }

    @BeforeEach
    public void initTest() {
        ninthMissionRule = createEntity(em);
    }

    @Test
    @Transactional
    public void createNinthMissionRule() throws Exception {
        int databaseSizeBeforeCreate = ninthMissionRuleRepository.findAll().size();
        // Create the NinthMissionRule
        restNinthMissionRuleMockMvc.perform(post("/api/ninth-mission-rules").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthMissionRule)))
            .andExpect(status().isCreated());

        // Validate the NinthMissionRule in the database
        List<NinthMissionRule> ninthMissionRuleList = ninthMissionRuleRepository.findAll();
        assertThat(ninthMissionRuleList).hasSize(databaseSizeBeforeCreate + 1);
        NinthMissionRule testNinthMissionRule = ninthMissionRuleList.get(ninthMissionRuleList.size() - 1);
    }

    @Test
    @Transactional
    public void createNinthMissionRuleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ninthMissionRuleRepository.findAll().size();

        // Create the NinthMissionRule with an existing ID
        ninthMissionRule.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNinthMissionRuleMockMvc.perform(post("/api/ninth-mission-rules").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthMissionRule)))
            .andExpect(status().isBadRequest());

        // Validate the NinthMissionRule in the database
        List<NinthMissionRule> ninthMissionRuleList = ninthMissionRuleRepository.findAll();
        assertThat(ninthMissionRuleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNinthMissionRules() throws Exception {
        // Initialize the database
        ninthMissionRuleRepository.saveAndFlush(ninthMissionRule);

        // Get all the ninthMissionRuleList
        restNinthMissionRuleMockMvc.perform(get("/api/ninth-mission-rules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ninthMissionRule.getId().intValue())));
    }

    @Test
    @Transactional
    public void getNinthMissionRule() throws Exception {
        // Initialize the database
        ninthMissionRuleRepository.saveAndFlush(ninthMissionRule);

        // Get the ninthMissionRule
        restNinthMissionRuleMockMvc.perform(get("/api/ninth-mission-rules/{id}", ninthMissionRule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ninthMissionRule.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingNinthMissionRule() throws Exception {
        // Get the ninthMissionRule
        restNinthMissionRuleMockMvc.perform(get("/api/ninth-mission-rules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNinthMissionRule() throws Exception {
        // Initialize the database
        ninthMissionRuleRepository.saveAndFlush(ninthMissionRule);

        int databaseSizeBeforeUpdate = ninthMissionRuleRepository.findAll().size();

        // Update the ninthMissionRule
        NinthMissionRule updatedNinthMissionRule = ninthMissionRuleRepository.findById(ninthMissionRule.getId()).get();
        // Disconnect from session so that the updates on updatedNinthMissionRule are not directly saved in db
        em.detach(updatedNinthMissionRule);

        restNinthMissionRuleMockMvc.perform(put("/api/ninth-mission-rules").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNinthMissionRule)))
            .andExpect(status().isOk());

        // Validate the NinthMissionRule in the database
        List<NinthMissionRule> ninthMissionRuleList = ninthMissionRuleRepository.findAll();
        assertThat(ninthMissionRuleList).hasSize(databaseSizeBeforeUpdate);
        NinthMissionRule testNinthMissionRule = ninthMissionRuleList.get(ninthMissionRuleList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingNinthMissionRule() throws Exception {
        int databaseSizeBeforeUpdate = ninthMissionRuleRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNinthMissionRuleMockMvc.perform(put("/api/ninth-mission-rules").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthMissionRule)))
            .andExpect(status().isBadRequest());

        // Validate the NinthMissionRule in the database
        List<NinthMissionRule> ninthMissionRuleList = ninthMissionRuleRepository.findAll();
        assertThat(ninthMissionRuleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNinthMissionRule() throws Exception {
        // Initialize the database
        ninthMissionRuleRepository.saveAndFlush(ninthMissionRule);

        int databaseSizeBeforeDelete = ninthMissionRuleRepository.findAll().size();

        // Delete the ninthMissionRule
        restNinthMissionRuleMockMvc.perform(delete("/api/ninth-mission-rules/{id}", ninthMissionRule.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NinthMissionRule> ninthMissionRuleList = ninthMissionRuleRepository.findAll();
        assertThat(ninthMissionRuleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
