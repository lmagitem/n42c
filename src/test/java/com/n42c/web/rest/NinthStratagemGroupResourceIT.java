package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.NinthStratagemGroup;
import com.n42c.domain.Player;
import com.n42c.repository.NinthStratagemGroupRepository;
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
 * Integration tests for the {@link NinthStratagemGroupResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@AutoConfigureMockMvc
@WithMockUser
public class NinthStratagemGroupResourceIT {

    private static final Boolean DEFAULT_SHAREABLE = false;
    private static final Boolean UPDATED_SHAREABLE = true;

    @Autowired
    private NinthStratagemGroupRepository ninthStratagemGroupRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNinthStratagemGroupMockMvc;

    private NinthStratagemGroup ninthStratagemGroup;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthStratagemGroup createEntity(EntityManager em) {
        NinthStratagemGroup ninthStratagemGroup = new NinthStratagemGroup()
            .shareable(DEFAULT_SHAREABLE);
        // Add required entity
        Player player;
        if (TestUtil.findAll(em, Player.class).isEmpty()) {
            player = PlayerResourceIT.createEntity(em);
            em.persist(player);
            em.flush();
        } else {
            player = TestUtil.findAll(em, Player.class).get(0);
        }
        ninthStratagemGroup.setAuthor(player);
        return ninthStratagemGroup;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthStratagemGroup createUpdatedEntity(EntityManager em) {
        NinthStratagemGroup ninthStratagemGroup = new NinthStratagemGroup()
            .shareable(UPDATED_SHAREABLE);
        // Add required entity
        Player player;
        if (TestUtil.findAll(em, Player.class).isEmpty()) {
            player = PlayerResourceIT.createUpdatedEntity(em);
            em.persist(player);
            em.flush();
        } else {
            player = TestUtil.findAll(em, Player.class).get(0);
        }
        ninthStratagemGroup.setAuthor(player);
        return ninthStratagemGroup;
    }

    @BeforeEach
    public void initTest() {
        ninthStratagemGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createNinthStratagemGroup() throws Exception {
        int databaseSizeBeforeCreate = ninthStratagemGroupRepository.findAll().size();
        // Create the NinthStratagemGroup
        restNinthStratagemGroupMockMvc.perform(post("/api/ninth-stratagem-groups").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthStratagemGroup)))
            .andExpect(status().isCreated());

        // Validate the NinthStratagemGroup in the database
        List<NinthStratagemGroup> ninthStratagemGroupList = ninthStratagemGroupRepository.findAll();
        assertThat(ninthStratagemGroupList).hasSize(databaseSizeBeforeCreate + 1);
        NinthStratagemGroup testNinthStratagemGroup = ninthStratagemGroupList.get(ninthStratagemGroupList.size() - 1);
        assertThat(testNinthStratagemGroup.isShareable()).isEqualTo(DEFAULT_SHAREABLE);
    }

    @Test
    @Transactional
    public void createNinthStratagemGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ninthStratagemGroupRepository.findAll().size();

        // Create the NinthStratagemGroup with an existing ID
        ninthStratagemGroup.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNinthStratagemGroupMockMvc.perform(post("/api/ninth-stratagem-groups").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthStratagemGroup)))
            .andExpect(status().isBadRequest());

        // Validate the NinthStratagemGroup in the database
        List<NinthStratagemGroup> ninthStratagemGroupList = ninthStratagemGroupRepository.findAll();
        assertThat(ninthStratagemGroupList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNinthStratagemGroups() throws Exception {
        // Initialize the database
        ninthStratagemGroupRepository.saveAndFlush(ninthStratagemGroup);

        // Get all the ninthStratagemGroupList
        restNinthStratagemGroupMockMvc.perform(get("/api/ninth-stratagem-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ninthStratagemGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].shareable").value(hasItem(DEFAULT_SHAREABLE.booleanValue())));
    }

    @Test
    @Transactional
    public void getNinthStratagemGroup() throws Exception {
        // Initialize the database
        ninthStratagemGroupRepository.saveAndFlush(ninthStratagemGroup);

        // Get the ninthStratagemGroup
        restNinthStratagemGroupMockMvc.perform(get("/api/ninth-stratagem-groups/{id}", ninthStratagemGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ninthStratagemGroup.getId().intValue()))
            .andExpect(jsonPath("$.shareable").value(DEFAULT_SHAREABLE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingNinthStratagemGroup() throws Exception {
        // Get the ninthStratagemGroup
        restNinthStratagemGroupMockMvc.perform(get("/api/ninth-stratagem-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNinthStratagemGroup() throws Exception {
        // Initialize the database
        ninthStratagemGroupRepository.saveAndFlush(ninthStratagemGroup);

        int databaseSizeBeforeUpdate = ninthStratagemGroupRepository.findAll().size();

        // Update the ninthStratagemGroup
        NinthStratagemGroup updatedNinthStratagemGroup = ninthStratagemGroupRepository.findById(ninthStratagemGroup.getId()).get();
        // Disconnect from session so that the updates on updatedNinthStratagemGroup are not directly saved in db
        em.detach(updatedNinthStratagemGroup);
        updatedNinthStratagemGroup
            .shareable(UPDATED_SHAREABLE);

        restNinthStratagemGroupMockMvc.perform(put("/api/ninth-stratagem-groups").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNinthStratagemGroup)))
            .andExpect(status().isOk());

        // Validate the NinthStratagemGroup in the database
        List<NinthStratagemGroup> ninthStratagemGroupList = ninthStratagemGroupRepository.findAll();
        assertThat(ninthStratagemGroupList).hasSize(databaseSizeBeforeUpdate);
        NinthStratagemGroup testNinthStratagemGroup = ninthStratagemGroupList.get(ninthStratagemGroupList.size() - 1);
        assertThat(testNinthStratagemGroup.isShareable()).isEqualTo(UPDATED_SHAREABLE);
    }

    @Test
    @Transactional
    public void updateNonExistingNinthStratagemGroup() throws Exception {
        int databaseSizeBeforeUpdate = ninthStratagemGroupRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNinthStratagemGroupMockMvc.perform(put("/api/ninth-stratagem-groups").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthStratagemGroup)))
            .andExpect(status().isBadRequest());

        // Validate the NinthStratagemGroup in the database
        List<NinthStratagemGroup> ninthStratagemGroupList = ninthStratagemGroupRepository.findAll();
        assertThat(ninthStratagemGroupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNinthStratagemGroup() throws Exception {
        // Initialize the database
        ninthStratagemGroupRepository.saveAndFlush(ninthStratagemGroup);

        int databaseSizeBeforeDelete = ninthStratagemGroupRepository.findAll().size();

        // Delete the ninthStratagemGroup
        restNinthStratagemGroupMockMvc.perform(delete("/api/ninth-stratagem-groups/{id}", ninthStratagemGroup.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NinthStratagemGroup> ninthStratagemGroupList = ninthStratagemGroupRepository.findAll();
        assertThat(ninthStratagemGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
