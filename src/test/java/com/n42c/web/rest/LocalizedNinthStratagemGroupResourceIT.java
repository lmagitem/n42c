package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.LocalizedNinthStratagemGroup;
import com.n42c.domain.NinthStratagemGroup;
import com.n42c.domain.enumeration.Language;
import com.n42c.repository.LocalizedNinthStratagemGroupRepository;
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
 * Integration tests for the {@link LocalizedNinthStratagemGroupResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@AutoConfigureMockMvc
@WithMockUser
public class LocalizedNinthStratagemGroupResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Language DEFAULT_LANGUAGE = Language.EN;
    private static final Language UPDATED_LANGUAGE = Language.FR;

    @Autowired
    private LocalizedNinthStratagemGroupRepository localizedNinthStratagemGroupRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLocalizedNinthStratagemGroupMockMvc;

    private LocalizedNinthStratagemGroup localizedNinthStratagemGroup;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedNinthStratagemGroup createEntity(EntityManager em) {
        LocalizedNinthStratagemGroup localizedNinthStratagemGroup = new LocalizedNinthStratagemGroup()
            .name(DEFAULT_NAME)
            .language(DEFAULT_LANGUAGE);
        // Add required entity
        NinthStratagemGroup ninthStratagemGroup;
        if (TestUtil.findAll(em, NinthStratagemGroup.class).isEmpty()) {
            ninthStratagemGroup = NinthStratagemGroupResourceIT.createEntity(em);
            em.persist(ninthStratagemGroup);
            em.flush();
        } else {
            ninthStratagemGroup = TestUtil.findAll(em, NinthStratagemGroup.class).get(0);
        }
        localizedNinthStratagemGroup.setStratagemGroup(ninthStratagemGroup);
        return localizedNinthStratagemGroup;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedNinthStratagemGroup createUpdatedEntity(EntityManager em) {
        LocalizedNinthStratagemGroup localizedNinthStratagemGroup = new LocalizedNinthStratagemGroup()
            .name(UPDATED_NAME)
            .language(UPDATED_LANGUAGE);
        // Add required entity
        NinthStratagemGroup ninthStratagemGroup;
        if (TestUtil.findAll(em, NinthStratagemGroup.class).isEmpty()) {
            ninthStratagemGroup = NinthStratagemGroupResourceIT.createUpdatedEntity(em);
            em.persist(ninthStratagemGroup);
            em.flush();
        } else {
            ninthStratagemGroup = TestUtil.findAll(em, NinthStratagemGroup.class).get(0);
        }
        localizedNinthStratagemGroup.setStratagemGroup(ninthStratagemGroup);
        return localizedNinthStratagemGroup;
    }

    @BeforeEach
    public void initTest() {
        localizedNinthStratagemGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createLocalizedNinthStratagemGroup() throws Exception {
        int databaseSizeBeforeCreate = localizedNinthStratagemGroupRepository.findAll().size();
        // Create the LocalizedNinthStratagemGroup
        restLocalizedNinthStratagemGroupMockMvc.perform(post("/api/localized-ninth-stratagem-groups").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthStratagemGroup)))
            .andExpect(status().isCreated());

        // Validate the LocalizedNinthStratagemGroup in the database
        List<LocalizedNinthStratagemGroup> localizedNinthStratagemGroupList = localizedNinthStratagemGroupRepository.findAll();
        assertThat(localizedNinthStratagemGroupList).hasSize(databaseSizeBeforeCreate + 1);
        LocalizedNinthStratagemGroup testLocalizedNinthStratagemGroup = localizedNinthStratagemGroupList.get(localizedNinthStratagemGroupList.size() - 1);
        assertThat(testLocalizedNinthStratagemGroup.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testLocalizedNinthStratagemGroup.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
    }

    @Test
    @Transactional
    public void createLocalizedNinthStratagemGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = localizedNinthStratagemGroupRepository.findAll().size();

        // Create the LocalizedNinthStratagemGroup with an existing ID
        localizedNinthStratagemGroup.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocalizedNinthStratagemGroupMockMvc.perform(post("/api/localized-ninth-stratagem-groups").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthStratagemGroup)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedNinthStratagemGroup in the database
        List<LocalizedNinthStratagemGroup> localizedNinthStratagemGroupList = localizedNinthStratagemGroupRepository.findAll();
        assertThat(localizedNinthStratagemGroupList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = localizedNinthStratagemGroupRepository.findAll().size();
        // set the field null
        localizedNinthStratagemGroup.setLanguage(null);

        // Create the LocalizedNinthStratagemGroup, which fails.


        restLocalizedNinthStratagemGroupMockMvc.perform(post("/api/localized-ninth-stratagem-groups").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthStratagemGroup)))
            .andExpect(status().isBadRequest());

        List<LocalizedNinthStratagemGroup> localizedNinthStratagemGroupList = localizedNinthStratagemGroupRepository.findAll();
        assertThat(localizedNinthStratagemGroupList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLocalizedNinthStratagemGroups() throws Exception {
        // Initialize the database
        localizedNinthStratagemGroupRepository.saveAndFlush(localizedNinthStratagemGroup);

        // Get all the localizedNinthStratagemGroupList
        restLocalizedNinthStratagemGroupMockMvc.perform(get("/api/localized-ninth-stratagem-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(localizedNinthStratagemGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }

    @Test
    @Transactional
    public void getLocalizedNinthStratagemGroup() throws Exception {
        // Initialize the database
        localizedNinthStratagemGroupRepository.saveAndFlush(localizedNinthStratagemGroup);

        // Get the localizedNinthStratagemGroup
        restLocalizedNinthStratagemGroupMockMvc.perform(get("/api/localized-ninth-stratagem-groups/{id}", localizedNinthStratagemGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(localizedNinthStratagemGroup.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLocalizedNinthStratagemGroup() throws Exception {
        // Get the localizedNinthStratagemGroup
        restLocalizedNinthStratagemGroupMockMvc.perform(get("/api/localized-ninth-stratagem-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLocalizedNinthStratagemGroup() throws Exception {
        // Initialize the database
        localizedNinthStratagemGroupRepository.saveAndFlush(localizedNinthStratagemGroup);

        int databaseSizeBeforeUpdate = localizedNinthStratagemGroupRepository.findAll().size();

        // Update the localizedNinthStratagemGroup
        LocalizedNinthStratagemGroup updatedLocalizedNinthStratagemGroup = localizedNinthStratagemGroupRepository.findById(localizedNinthStratagemGroup.getId()).get();
        // Disconnect from session so that the updates on updatedLocalizedNinthStratagemGroup are not directly saved in db
        em.detach(updatedLocalizedNinthStratagemGroup);
        updatedLocalizedNinthStratagemGroup
            .name(UPDATED_NAME)
            .language(UPDATED_LANGUAGE);

        restLocalizedNinthStratagemGroupMockMvc.perform(put("/api/localized-ninth-stratagem-groups").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLocalizedNinthStratagemGroup)))
            .andExpect(status().isOk());

        // Validate the LocalizedNinthStratagemGroup in the database
        List<LocalizedNinthStratagemGroup> localizedNinthStratagemGroupList = localizedNinthStratagemGroupRepository.findAll();
        assertThat(localizedNinthStratagemGroupList).hasSize(databaseSizeBeforeUpdate);
        LocalizedNinthStratagemGroup testLocalizedNinthStratagemGroup = localizedNinthStratagemGroupList.get(localizedNinthStratagemGroupList.size() - 1);
        assertThat(testLocalizedNinthStratagemGroup.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testLocalizedNinthStratagemGroup.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingLocalizedNinthStratagemGroup() throws Exception {
        int databaseSizeBeforeUpdate = localizedNinthStratagemGroupRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalizedNinthStratagemGroupMockMvc.perform(put("/api/localized-ninth-stratagem-groups").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthStratagemGroup)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedNinthStratagemGroup in the database
        List<LocalizedNinthStratagemGroup> localizedNinthStratagemGroupList = localizedNinthStratagemGroupRepository.findAll();
        assertThat(localizedNinthStratagemGroupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLocalizedNinthStratagemGroup() throws Exception {
        // Initialize the database
        localizedNinthStratagemGroupRepository.saveAndFlush(localizedNinthStratagemGroup);

        int databaseSizeBeforeDelete = localizedNinthStratagemGroupRepository.findAll().size();

        // Delete the localizedNinthStratagemGroup
        restLocalizedNinthStratagemGroupMockMvc.perform(delete("/api/localized-ninth-stratagem-groups/{id}", localizedNinthStratagemGroup.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LocalizedNinthStratagemGroup> localizedNinthStratagemGroupList = localizedNinthStratagemGroupRepository.findAll();
        assertThat(localizedNinthStratagemGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
