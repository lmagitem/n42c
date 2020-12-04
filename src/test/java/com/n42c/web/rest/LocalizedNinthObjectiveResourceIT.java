package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.LocalizedNinthObjective;
import com.n42c.domain.NinthObjective;
import com.n42c.domain.enumeration.Language;
import com.n42c.repository.LocalizedNinthObjectiveRepository;
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
 * Integration tests for the {@link LocalizedNinthObjectiveResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@AutoConfigureMockMvc
@WithMockUser
public class LocalizedNinthObjectiveResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Language DEFAULT_LANGUAGE = Language.EN;
    private static final Language UPDATED_LANGUAGE = Language.FR;

    @Autowired
    private LocalizedNinthObjectiveRepository localizedNinthObjectiveRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLocalizedNinthObjectiveMockMvc;

    private LocalizedNinthObjective localizedNinthObjective;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedNinthObjective createEntity(EntityManager em) {
        LocalizedNinthObjective localizedNinthObjective = new LocalizedNinthObjective()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .language(DEFAULT_LANGUAGE);
        // Add required entity
        NinthObjective ninthObjective;
        if (TestUtil.findAll(em, NinthObjective.class).isEmpty()) {
            ninthObjective = NinthObjectiveResourceIT.createEntity(em);
            em.persist(ninthObjective);
            em.flush();
        } else {
            ninthObjective = TestUtil.findAll(em, NinthObjective.class).get(0);
        }
        localizedNinthObjective.setObjective(ninthObjective);
        return localizedNinthObjective;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedNinthObjective createUpdatedEntity(EntityManager em) {
        LocalizedNinthObjective localizedNinthObjective = new LocalizedNinthObjective()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .language(UPDATED_LANGUAGE);
        // Add required entity
        NinthObjective ninthObjective;
        if (TestUtil.findAll(em, NinthObjective.class).isEmpty()) {
            ninthObjective = NinthObjectiveResourceIT.createUpdatedEntity(em);
            em.persist(ninthObjective);
            em.flush();
        } else {
            ninthObjective = TestUtil.findAll(em, NinthObjective.class).get(0);
        }
        localizedNinthObjective.setObjective(ninthObjective);
        return localizedNinthObjective;
    }

    @BeforeEach
    public void initTest() {
        localizedNinthObjective = createEntity(em);
    }

    @Test
    @Transactional
    public void createLocalizedNinthObjective() throws Exception {
        int databaseSizeBeforeCreate = localizedNinthObjectiveRepository.findAll().size();
        // Create the LocalizedNinthObjective
        restLocalizedNinthObjectiveMockMvc.perform(post("/api/localized-ninth-objectives").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthObjective)))
            .andExpect(status().isCreated());

        // Validate the LocalizedNinthObjective in the database
        List<LocalizedNinthObjective> localizedNinthObjectiveList = localizedNinthObjectiveRepository.findAll();
        assertThat(localizedNinthObjectiveList).hasSize(databaseSizeBeforeCreate + 1);
        LocalizedNinthObjective testLocalizedNinthObjective = localizedNinthObjectiveList.get(localizedNinthObjectiveList.size() - 1);
        assertThat(testLocalizedNinthObjective.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testLocalizedNinthObjective.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testLocalizedNinthObjective.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
    }

    @Test
    @Transactional
    public void createLocalizedNinthObjectiveWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = localizedNinthObjectiveRepository.findAll().size();

        // Create the LocalizedNinthObjective with an existing ID
        localizedNinthObjective.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocalizedNinthObjectiveMockMvc.perform(post("/api/localized-ninth-objectives").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthObjective)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedNinthObjective in the database
        List<LocalizedNinthObjective> localizedNinthObjectiveList = localizedNinthObjectiveRepository.findAll();
        assertThat(localizedNinthObjectiveList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = localizedNinthObjectiveRepository.findAll().size();
        // set the field null
        localizedNinthObjective.setLanguage(null);

        // Create the LocalizedNinthObjective, which fails.


        restLocalizedNinthObjectiveMockMvc.perform(post("/api/localized-ninth-objectives").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthObjective)))
            .andExpect(status().isBadRequest());

        List<LocalizedNinthObjective> localizedNinthObjectiveList = localizedNinthObjectiveRepository.findAll();
        assertThat(localizedNinthObjectiveList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLocalizedNinthObjectives() throws Exception {
        // Initialize the database
        localizedNinthObjectiveRepository.saveAndFlush(localizedNinthObjective);

        // Get all the localizedNinthObjectiveList
        restLocalizedNinthObjectiveMockMvc.perform(get("/api/localized-ninth-objectives?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(localizedNinthObjective.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }

    @Test
    @Transactional
    public void getLocalizedNinthObjective() throws Exception {
        // Initialize the database
        localizedNinthObjectiveRepository.saveAndFlush(localizedNinthObjective);

        // Get the localizedNinthObjective
        restLocalizedNinthObjectiveMockMvc.perform(get("/api/localized-ninth-objectives/{id}", localizedNinthObjective.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(localizedNinthObjective.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLocalizedNinthObjective() throws Exception {
        // Get the localizedNinthObjective
        restLocalizedNinthObjectiveMockMvc.perform(get("/api/localized-ninth-objectives/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLocalizedNinthObjective() throws Exception {
        // Initialize the database
        localizedNinthObjectiveRepository.saveAndFlush(localizedNinthObjective);

        int databaseSizeBeforeUpdate = localizedNinthObjectiveRepository.findAll().size();

        // Update the localizedNinthObjective
        LocalizedNinthObjective updatedLocalizedNinthObjective = localizedNinthObjectiveRepository.findById(localizedNinthObjective.getId()).get();
        // Disconnect from session so that the updates on updatedLocalizedNinthObjective are not directly saved in db
        em.detach(updatedLocalizedNinthObjective);
        updatedLocalizedNinthObjective
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .language(UPDATED_LANGUAGE);

        restLocalizedNinthObjectiveMockMvc.perform(put("/api/localized-ninth-objectives").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLocalizedNinthObjective)))
            .andExpect(status().isOk());

        // Validate the LocalizedNinthObjective in the database
        List<LocalizedNinthObjective> localizedNinthObjectiveList = localizedNinthObjectiveRepository.findAll();
        assertThat(localizedNinthObjectiveList).hasSize(databaseSizeBeforeUpdate);
        LocalizedNinthObjective testLocalizedNinthObjective = localizedNinthObjectiveList.get(localizedNinthObjectiveList.size() - 1);
        assertThat(testLocalizedNinthObjective.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testLocalizedNinthObjective.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testLocalizedNinthObjective.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingLocalizedNinthObjective() throws Exception {
        int databaseSizeBeforeUpdate = localizedNinthObjectiveRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalizedNinthObjectiveMockMvc.perform(put("/api/localized-ninth-objectives").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthObjective)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedNinthObjective in the database
        List<LocalizedNinthObjective> localizedNinthObjectiveList = localizedNinthObjectiveRepository.findAll();
        assertThat(localizedNinthObjectiveList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLocalizedNinthObjective() throws Exception {
        // Initialize the database
        localizedNinthObjectiveRepository.saveAndFlush(localizedNinthObjective);

        int databaseSizeBeforeDelete = localizedNinthObjectiveRepository.findAll().size();

        // Delete the localizedNinthObjective
        restLocalizedNinthObjectiveMockMvc.perform(delete("/api/localized-ninth-objectives/{id}", localizedNinthObjective.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LocalizedNinthObjective> localizedNinthObjectiveList = localizedNinthObjectiveRepository.findAll();
        assertThat(localizedNinthObjectiveList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
