package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.NinthArmyUnit;
import com.n42c.repository.NinthArmyUnitRepository;

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
 * Integration tests for the {@link NinthArmyUnitResource} REST controller.
 */
@SpringBootTest(classes = { N42CApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class NinthArmyUnitResourceIT {

    private static final String DEFAULT_SELECTABLE_KEYWORDS = "AAAAAAAAAA";
    private static final String UPDATED_SELECTABLE_KEYWORDS = "BBBBBBBBBB";

    @Autowired
    private NinthArmyUnitRepository ninthArmyUnitRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNinthArmyUnitMockMvc;

    private NinthArmyUnit ninthArmyUnit;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthArmyUnit createEntity(EntityManager em) {
        NinthArmyUnit ninthArmyUnit = new NinthArmyUnit()
            .selectableKeywords(DEFAULT_SELECTABLE_KEYWORDS);
        return ninthArmyUnit;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthArmyUnit createUpdatedEntity(EntityManager em) {
        NinthArmyUnit ninthArmyUnit = new NinthArmyUnit()
            .selectableKeywords(UPDATED_SELECTABLE_KEYWORDS);
        return ninthArmyUnit;
    }

    @BeforeEach
    public void initTest() {
        ninthArmyUnit = createEntity(em);
    }

    @Test
    @Transactional
    public void createNinthArmyUnit() throws Exception {
        int databaseSizeBeforeCreate = ninthArmyUnitRepository.findAll().size();
        // Create the NinthArmyUnit
        restNinthArmyUnitMockMvc.perform(post("/api/ninth-army-units").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthArmyUnit)))
            .andExpect(status().isCreated());

        // Validate the NinthArmyUnit in the database
        List<NinthArmyUnit> ninthArmyUnitList = ninthArmyUnitRepository.findAll();
        assertThat(ninthArmyUnitList).hasSize(databaseSizeBeforeCreate + 1);
        NinthArmyUnit testNinthArmyUnit = ninthArmyUnitList.get(ninthArmyUnitList.size() - 1);
        assertThat(testNinthArmyUnit.getSelectableKeywords()).isEqualTo(DEFAULT_SELECTABLE_KEYWORDS);
    }

    @Test
    @Transactional
    public void createNinthArmyUnitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ninthArmyUnitRepository.findAll().size();

        // Create the NinthArmyUnit with an existing ID
        ninthArmyUnit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNinthArmyUnitMockMvc.perform(post("/api/ninth-army-units").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthArmyUnit)))
            .andExpect(status().isBadRequest());

        // Validate the NinthArmyUnit in the database
        List<NinthArmyUnit> ninthArmyUnitList = ninthArmyUnitRepository.findAll();
        assertThat(ninthArmyUnitList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNinthArmyUnits() throws Exception {
        // Initialize the database
        ninthArmyUnitRepository.saveAndFlush(ninthArmyUnit);

        // Get all the ninthArmyUnitList
        restNinthArmyUnitMockMvc.perform(get("/api/ninth-army-units?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ninthArmyUnit.getId().intValue())))
            .andExpect(jsonPath("$.[*].selectableKeywords").value(hasItem(DEFAULT_SELECTABLE_KEYWORDS)));
    }
    
    @Test
    @Transactional
    public void getNinthArmyUnit() throws Exception {
        // Initialize the database
        ninthArmyUnitRepository.saveAndFlush(ninthArmyUnit);

        // Get the ninthArmyUnit
        restNinthArmyUnitMockMvc.perform(get("/api/ninth-army-units/{id}", ninthArmyUnit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ninthArmyUnit.getId().intValue()))
            .andExpect(jsonPath("$.selectableKeywords").value(DEFAULT_SELECTABLE_KEYWORDS));
    }
    @Test
    @Transactional
    public void getNonExistingNinthArmyUnit() throws Exception {
        // Get the ninthArmyUnit
        restNinthArmyUnitMockMvc.perform(get("/api/ninth-army-units/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNinthArmyUnit() throws Exception {
        // Initialize the database
        ninthArmyUnitRepository.saveAndFlush(ninthArmyUnit);

        int databaseSizeBeforeUpdate = ninthArmyUnitRepository.findAll().size();

        // Update the ninthArmyUnit
        NinthArmyUnit updatedNinthArmyUnit = ninthArmyUnitRepository.findById(ninthArmyUnit.getId()).get();
        // Disconnect from session so that the updates on updatedNinthArmyUnit are not directly saved in db
        em.detach(updatedNinthArmyUnit);
        updatedNinthArmyUnit
            .selectableKeywords(UPDATED_SELECTABLE_KEYWORDS);

        restNinthArmyUnitMockMvc.perform(put("/api/ninth-army-units").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNinthArmyUnit)))
            .andExpect(status().isOk());

        // Validate the NinthArmyUnit in the database
        List<NinthArmyUnit> ninthArmyUnitList = ninthArmyUnitRepository.findAll();
        assertThat(ninthArmyUnitList).hasSize(databaseSizeBeforeUpdate);
        NinthArmyUnit testNinthArmyUnit = ninthArmyUnitList.get(ninthArmyUnitList.size() - 1);
        assertThat(testNinthArmyUnit.getSelectableKeywords()).isEqualTo(UPDATED_SELECTABLE_KEYWORDS);
    }

    @Test
    @Transactional
    public void updateNonExistingNinthArmyUnit() throws Exception {
        int databaseSizeBeforeUpdate = ninthArmyUnitRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNinthArmyUnitMockMvc.perform(put("/api/ninth-army-units").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthArmyUnit)))
            .andExpect(status().isBadRequest());

        // Validate the NinthArmyUnit in the database
        List<NinthArmyUnit> ninthArmyUnitList = ninthArmyUnitRepository.findAll();
        assertThat(ninthArmyUnitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNinthArmyUnit() throws Exception {
        // Initialize the database
        ninthArmyUnitRepository.saveAndFlush(ninthArmyUnit);

        int databaseSizeBeforeDelete = ninthArmyUnitRepository.findAll().size();

        // Delete the ninthArmyUnit
        restNinthArmyUnitMockMvc.perform(delete("/api/ninth-army-units/{id}", ninthArmyUnit.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NinthArmyUnit> ninthArmyUnitList = ninthArmyUnitRepository.findAll();
        assertThat(ninthArmyUnitList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
