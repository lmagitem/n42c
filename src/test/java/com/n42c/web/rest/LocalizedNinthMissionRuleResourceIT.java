package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.LocalizedNinthMissionRule;
import com.n42c.domain.NinthMissionRule;
import com.n42c.domain.enumerations.Language;
import com.n42c.repository.LocalizedNinthMissionRuleRepository;
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
 * Integration tests for the {@link LocalizedNinthMissionRuleResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@AutoConfigureMockMvc
@WithMockUser
public class LocalizedNinthMissionRuleResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Language DEFAULT_LANGUAGE = Language.EN;
    private static final Language UPDATED_LANGUAGE = Language.FR;

    @Autowired
    private LocalizedNinthMissionRuleRepository localizedNinthMissionRuleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLocalizedNinthMissionRuleMockMvc;

    private LocalizedNinthMissionRule localizedNinthMissionRule;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedNinthMissionRule createEntity(EntityManager em) {
        LocalizedNinthMissionRule localizedNinthMissionRule = new LocalizedNinthMissionRule()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .language(DEFAULT_LANGUAGE);
        // Add required entity
        NinthMissionRule ninthMissionRule;
        if (TestUtil.findAll(em, NinthMissionRule.class).isEmpty()) {
            ninthMissionRule = NinthMissionRuleResourceIT.createEntity(em);
            em.persist(ninthMissionRule);
            em.flush();
        } else {
            ninthMissionRule = TestUtil.findAll(em, NinthMissionRule.class).get(0);
        }
        localizedNinthMissionRule.setRule(ninthMissionRule);
        return localizedNinthMissionRule;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedNinthMissionRule createUpdatedEntity(EntityManager em) {
        LocalizedNinthMissionRule localizedNinthMissionRule = new LocalizedNinthMissionRule()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .language(UPDATED_LANGUAGE);
        // Add required entity
        NinthMissionRule ninthMissionRule;
        if (TestUtil.findAll(em, NinthMissionRule.class).isEmpty()) {
            ninthMissionRule = NinthMissionRuleResourceIT.createUpdatedEntity(em);
            em.persist(ninthMissionRule);
            em.flush();
        } else {
            ninthMissionRule = TestUtil.findAll(em, NinthMissionRule.class).get(0);
        }
        localizedNinthMissionRule.setRule(ninthMissionRule);
        return localizedNinthMissionRule;
    }

    @BeforeEach
    public void initTest() {
        localizedNinthMissionRule = createEntity(em);
    }

    @Test
    @Transactional
    public void createLocalizedNinthMissionRule() throws Exception {
        int databaseSizeBeforeCreate = localizedNinthMissionRuleRepository.findAll().size();
        // Create the LocalizedNinthMissionRule
        restLocalizedNinthMissionRuleMockMvc.perform(post("/api/localized-ninth-mission-rules").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthMissionRule)))
            .andExpect(status().isCreated());

        // Validate the LocalizedNinthMissionRule in the database
        List<LocalizedNinthMissionRule> localizedNinthMissionRuleList = localizedNinthMissionRuleRepository.findAll();
        assertThat(localizedNinthMissionRuleList).hasSize(databaseSizeBeforeCreate + 1);
        LocalizedNinthMissionRule testLocalizedNinthMissionRule = localizedNinthMissionRuleList.get(localizedNinthMissionRuleList.size() - 1);
        assertThat(testLocalizedNinthMissionRule.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testLocalizedNinthMissionRule.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testLocalizedNinthMissionRule.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
    }

    @Test
    @Transactional
    public void createLocalizedNinthMissionRuleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = localizedNinthMissionRuleRepository.findAll().size();

        // Create the LocalizedNinthMissionRule with an existing ID
        localizedNinthMissionRule.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocalizedNinthMissionRuleMockMvc.perform(post("/api/localized-ninth-mission-rules").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthMissionRule)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedNinthMissionRule in the database
        List<LocalizedNinthMissionRule> localizedNinthMissionRuleList = localizedNinthMissionRuleRepository.findAll();
        assertThat(localizedNinthMissionRuleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = localizedNinthMissionRuleRepository.findAll().size();
        // set the field null
        localizedNinthMissionRule.setLanguage(null);

        // Create the LocalizedNinthMissionRule, which fails.


        restLocalizedNinthMissionRuleMockMvc.perform(post("/api/localized-ninth-mission-rules").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthMissionRule)))
            .andExpect(status().isBadRequest());

        List<LocalizedNinthMissionRule> localizedNinthMissionRuleList = localizedNinthMissionRuleRepository.findAll();
        assertThat(localizedNinthMissionRuleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLocalizedNinthMissionRules() throws Exception {
        // Initialize the database
        localizedNinthMissionRuleRepository.saveAndFlush(localizedNinthMissionRule);

        // Get all the localizedNinthMissionRuleList
        restLocalizedNinthMissionRuleMockMvc.perform(get("/api/localized-ninth-mission-rules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(localizedNinthMissionRule.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }

    @Test
    @Transactional
    public void getLocalizedNinthMissionRule() throws Exception {
        // Initialize the database
        localizedNinthMissionRuleRepository.saveAndFlush(localizedNinthMissionRule);

        // Get the localizedNinthMissionRule
        restLocalizedNinthMissionRuleMockMvc.perform(get("/api/localized-ninth-mission-rules/{id}", localizedNinthMissionRule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(localizedNinthMissionRule.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLocalizedNinthMissionRule() throws Exception {
        // Get the localizedNinthMissionRule
        restLocalizedNinthMissionRuleMockMvc.perform(get("/api/localized-ninth-mission-rules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLocalizedNinthMissionRule() throws Exception {
        // Initialize the database
        localizedNinthMissionRuleRepository.saveAndFlush(localizedNinthMissionRule);

        int databaseSizeBeforeUpdate = localizedNinthMissionRuleRepository.findAll().size();

        // Update the localizedNinthMissionRule
        LocalizedNinthMissionRule updatedLocalizedNinthMissionRule = localizedNinthMissionRuleRepository.findById(localizedNinthMissionRule.getId()).get();
        // Disconnect from session so that the updates on updatedLocalizedNinthMissionRule are not directly saved in db
        em.detach(updatedLocalizedNinthMissionRule);
        updatedLocalizedNinthMissionRule
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .language(UPDATED_LANGUAGE);

        restLocalizedNinthMissionRuleMockMvc.perform(put("/api/localized-ninth-mission-rules").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLocalizedNinthMissionRule)))
            .andExpect(status().isOk());

        // Validate the LocalizedNinthMissionRule in the database
        List<LocalizedNinthMissionRule> localizedNinthMissionRuleList = localizedNinthMissionRuleRepository.findAll();
        assertThat(localizedNinthMissionRuleList).hasSize(databaseSizeBeforeUpdate);
        LocalizedNinthMissionRule testLocalizedNinthMissionRule = localizedNinthMissionRuleList.get(localizedNinthMissionRuleList.size() - 1);
        assertThat(testLocalizedNinthMissionRule.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testLocalizedNinthMissionRule.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testLocalizedNinthMissionRule.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingLocalizedNinthMissionRule() throws Exception {
        int databaseSizeBeforeUpdate = localizedNinthMissionRuleRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalizedNinthMissionRuleMockMvc.perform(put("/api/localized-ninth-mission-rules").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedNinthMissionRule)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedNinthMissionRule in the database
        List<LocalizedNinthMissionRule> localizedNinthMissionRuleList = localizedNinthMissionRuleRepository.findAll();
        assertThat(localizedNinthMissionRuleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLocalizedNinthMissionRule() throws Exception {
        // Initialize the database
        localizedNinthMissionRuleRepository.saveAndFlush(localizedNinthMissionRule);

        int databaseSizeBeforeDelete = localizedNinthMissionRuleRepository.findAll().size();

        // Delete the localizedNinthMissionRule
        restLocalizedNinthMissionRuleMockMvc.perform(delete("/api/localized-ninth-mission-rules/{id}", localizedNinthMissionRule.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LocalizedNinthMissionRule> localizedNinthMissionRuleList = localizedNinthMissionRuleRepository.findAll();
        assertThat(localizedNinthMissionRuleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
