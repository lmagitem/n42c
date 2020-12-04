package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.LocalizedNinthStratagem;
import com.n42c.domain.NinthStratagem;
import com.n42c.domain.enumeration.Language;
import com.n42c.repository.LocalizedNinthStratagemRepository;
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
 * Integration tests for the {@link LocalizedNinthStratagemResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@AutoConfigureMockMvc
@WithMockUser
public class LocalizedNinthStratagemResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SUMMARY = "AAAAAAAAAA";
    private static final String UPDATED_SUMMARY = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_KEYWORDS = "AAAAAAAAAA";
    private static final String UPDATED_KEYWORDS = "BBBBBBBBBB";

    private static final Language DEFAULT_LANGUAGE = Language.EN;
    private static final Language UPDATED_LANGUAGE = Language.FR;

    @Autowired
    private LocalizedNinthStratagemRepository localizedNinthStratagemRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLocalizedNinthStratagemMockMvc;

    private LocalizedNinthStratagem localizedNinthStratagem;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedNinthStratagem createEntity(EntityManager em) {
        LocalizedNinthStratagem localizedNinthStratagem = new LocalizedNinthStratagem()
            .name(DEFAULT_NAME)
            .summary(DEFAULT_SUMMARY)
            .description(DEFAULT_DESCRIPTION)
            .keywords(DEFAULT_KEYWORDS)
            .language(DEFAULT_LANGUAGE);
        // Add required entity
        NinthStratagem ninthStratagem;
        if (TestUtil.findAll(em, NinthStratagem.class).isEmpty()) {
            ninthStratagem = NinthStratagemResourceIT.createEntity(em);
            em.persist(ninthStratagem);
            em.flush();
        } else {
            ninthStratagem = TestUtil.findAll(em, NinthStratagem.class).get(0);
        }
        localizedNinthStratagem.setStratagem(ninthStratagem);
        return localizedNinthStratagem;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedNinthStratagem createUpdatedEntity(EntityManager em) {
        LocalizedNinthStratagem localizedNinthStratagem = new LocalizedNinthStratagem()
            .name(UPDATED_NAME)
            .summary(UPDATED_SUMMARY)
            .description(UPDATED_DESCRIPTION)
            .keywords(UPDATED_KEYWORDS)
            .language(UPDATED_LANGUAGE);
        // Add required entity
        NinthStratagem ninthStratagem;
        if (TestUtil.findAll(em, NinthStratagem.class).isEmpty()) {
            ninthStratagem = NinthStratagemResourceIT.createUpdatedEntity(em);
            em.persist(ninthStratagem);
            em.flush();
        } else {
            ninthStratagem = TestUtil.findAll(em, NinthStratagem.class).get(0);
        }
        localizedNinthStratagem.setStratagem(ninthStratagem);
        return localizedNinthStratagem;
    }

    @BeforeEach
    public void initTest() {
        localizedNinthStratagem = createEntity(em);
    }

    @Test
    @Transactional
    public void createLocalizedNinthStratagem() throws Exception {
        int databaseSizeBeforeCreate = localizedNinthStratagemRepository.findAll().size();
        // Create the LocalizedNinthStratagem
        restLocalizedNinthStratagemMockMvc.perform(post("/api/localized-ninth-stratagems").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthStratagem)))
            .andExpect(status().isCreated());

        // Validate the LocalizedNinthStratagem in the database
        List<LocalizedNinthStratagem> localizedNinthStratagemList = localizedNinthStratagemRepository.findAll();
        assertThat(localizedNinthStratagemList).hasSize(databaseSizeBeforeCreate + 1);
        LocalizedNinthStratagem testLocalizedNinthStratagem = localizedNinthStratagemList.get(localizedNinthStratagemList.size() - 1);
        assertThat(testLocalizedNinthStratagem.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testLocalizedNinthStratagem.getSummary()).isEqualTo(DEFAULT_SUMMARY);
        assertThat(testLocalizedNinthStratagem.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testLocalizedNinthStratagem.getKeywords()).isEqualTo(DEFAULT_KEYWORDS);
        assertThat(testLocalizedNinthStratagem.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
    }

    @Test
    @Transactional
    public void createLocalizedNinthStratagemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = localizedNinthStratagemRepository.findAll().size();

        // Create the LocalizedNinthStratagem with an existing ID
        localizedNinthStratagem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocalizedNinthStratagemMockMvc.perform(post("/api/localized-ninth-stratagems").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthStratagem)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedNinthStratagem in the database
        List<LocalizedNinthStratagem> localizedNinthStratagemList = localizedNinthStratagemRepository.findAll();
        assertThat(localizedNinthStratagemList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = localizedNinthStratagemRepository.findAll().size();
        // set the field null
        localizedNinthStratagem.setLanguage(null);

        // Create the LocalizedNinthStratagem, which fails.


        restLocalizedNinthStratagemMockMvc.perform(post("/api/localized-ninth-stratagems").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthStratagem)))
            .andExpect(status().isBadRequest());

        List<LocalizedNinthStratagem> localizedNinthStratagemList = localizedNinthStratagemRepository.findAll();
        assertThat(localizedNinthStratagemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLocalizedNinthStratagems() throws Exception {
        // Initialize the database
        localizedNinthStratagemRepository.saveAndFlush(localizedNinthStratagem);

        // Get all the localizedNinthStratagemList
        restLocalizedNinthStratagemMockMvc.perform(get("/api/localized-ninth-stratagems?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(localizedNinthStratagem.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].summary").value(hasItem(DEFAULT_SUMMARY)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].keywords").value(hasItem(DEFAULT_KEYWORDS)))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }

    @Test
    @Transactional
    public void getLocalizedNinthStratagem() throws Exception {
        // Initialize the database
        localizedNinthStratagemRepository.saveAndFlush(localizedNinthStratagem);

        // Get the localizedNinthStratagem
        restLocalizedNinthStratagemMockMvc.perform(get("/api/localized-ninth-stratagems/{id}", localizedNinthStratagem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(localizedNinthStratagem.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.summary").value(DEFAULT_SUMMARY))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.keywords").value(DEFAULT_KEYWORDS))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLocalizedNinthStratagem() throws Exception {
        // Get the localizedNinthStratagem
        restLocalizedNinthStratagemMockMvc.perform(get("/api/localized-ninth-stratagems/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLocalizedNinthStratagem() throws Exception {
        // Initialize the database
        localizedNinthStratagemRepository.saveAndFlush(localizedNinthStratagem);

        int databaseSizeBeforeUpdate = localizedNinthStratagemRepository.findAll().size();

        // Update the localizedNinthStratagem
        LocalizedNinthStratagem updatedLocalizedNinthStratagem = localizedNinthStratagemRepository.findById(localizedNinthStratagem.getId()).get();
        // Disconnect from session so that the updates on updatedLocalizedNinthStratagem are not directly saved in db
        em.detach(updatedLocalizedNinthStratagem);
        updatedLocalizedNinthStratagem
            .name(UPDATED_NAME)
            .summary(UPDATED_SUMMARY)
            .description(UPDATED_DESCRIPTION)
            .keywords(UPDATED_KEYWORDS)
            .language(UPDATED_LANGUAGE);

        restLocalizedNinthStratagemMockMvc.perform(put("/api/localized-ninth-stratagems").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLocalizedNinthStratagem)))
            .andExpect(status().isOk());

        // Validate the LocalizedNinthStratagem in the database
        List<LocalizedNinthStratagem> localizedNinthStratagemList = localizedNinthStratagemRepository.findAll();
        assertThat(localizedNinthStratagemList).hasSize(databaseSizeBeforeUpdate);
        LocalizedNinthStratagem testLocalizedNinthStratagem = localizedNinthStratagemList.get(localizedNinthStratagemList.size() - 1);
        assertThat(testLocalizedNinthStratagem.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testLocalizedNinthStratagem.getSummary()).isEqualTo(UPDATED_SUMMARY);
        assertThat(testLocalizedNinthStratagem.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testLocalizedNinthStratagem.getKeywords()).isEqualTo(UPDATED_KEYWORDS);
        assertThat(testLocalizedNinthStratagem.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingLocalizedNinthStratagem() throws Exception {
        int databaseSizeBeforeUpdate = localizedNinthStratagemRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalizedNinthStratagemMockMvc.perform(put("/api/localized-ninth-stratagems").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthStratagem)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedNinthStratagem in the database
        List<LocalizedNinthStratagem> localizedNinthStratagemList = localizedNinthStratagemRepository.findAll();
        assertThat(localizedNinthStratagemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLocalizedNinthStratagem() throws Exception {
        // Initialize the database
        localizedNinthStratagemRepository.saveAndFlush(localizedNinthStratagem);

        int databaseSizeBeforeDelete = localizedNinthStratagemRepository.findAll().size();

        // Delete the localizedNinthStratagem
        restLocalizedNinthStratagemMockMvc.perform(delete("/api/localized-ninth-stratagems/{id}", localizedNinthStratagem.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LocalizedNinthStratagem> localizedNinthStratagemList = localizedNinthStratagemRepository.findAll();
        assertThat(localizedNinthStratagemList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
