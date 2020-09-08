package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.LocalizedPostContent;
import com.n42c.repository.LocalizedPostContentRepository;

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

import com.n42c.domain.enumeration.Language;
/**
 * Integration tests for the {@link LocalizedPostContentResource} REST controller.
 */
@SpringBootTest(classes = { N42CApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class LocalizedPostContentResourceIT {

    private static final String DEFAULT_EXCERPT = "AAAAAAAAAA";
    private static final String UPDATED_EXCERPT = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Language DEFAULT_LANGUAGE = Language.EN;
    private static final Language UPDATED_LANGUAGE = Language.FR;

    @Autowired
    private LocalizedPostContentRepository localizedPostContentRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLocalizedPostContentMockMvc;

    private LocalizedPostContent localizedPostContent;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedPostContent createEntity(EntityManager em) {
        LocalizedPostContent localizedPostContent = new LocalizedPostContent()
            .excerpt(DEFAULT_EXCERPT)
            .content(DEFAULT_CONTENT)
            .language(DEFAULT_LANGUAGE);
        return localizedPostContent;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedPostContent createUpdatedEntity(EntityManager em) {
        LocalizedPostContent localizedPostContent = new LocalizedPostContent()
            .excerpt(UPDATED_EXCERPT)
            .content(UPDATED_CONTENT)
            .language(UPDATED_LANGUAGE);
        return localizedPostContent;
    }

    @BeforeEach
    public void initTest() {
        localizedPostContent = createEntity(em);
    }

    @Test
    @Transactional
    public void createLocalizedPostContent() throws Exception {
        int databaseSizeBeforeCreate = localizedPostContentRepository.findAll().size();
        // Create the LocalizedPostContent
        restLocalizedPostContentMockMvc.perform(post("/api/localized-post-contents").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedPostContent)))
            .andExpect(status().isCreated());

        // Validate the LocalizedPostContent in the database
        List<LocalizedPostContent> localizedPostContentList = localizedPostContentRepository.findAll();
        assertThat(localizedPostContentList).hasSize(databaseSizeBeforeCreate + 1);
        LocalizedPostContent testLocalizedPostContent = localizedPostContentList.get(localizedPostContentList.size() - 1);
        assertThat(testLocalizedPostContent.getExcerpt()).isEqualTo(DEFAULT_EXCERPT);
        assertThat(testLocalizedPostContent.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testLocalizedPostContent.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
    }

    @Test
    @Transactional
    public void createLocalizedPostContentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = localizedPostContentRepository.findAll().size();

        // Create the LocalizedPostContent with an existing ID
        localizedPostContent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocalizedPostContentMockMvc.perform(post("/api/localized-post-contents").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedPostContent)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedPostContent in the database
        List<LocalizedPostContent> localizedPostContentList = localizedPostContentRepository.findAll();
        assertThat(localizedPostContentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkContentIsRequired() throws Exception {
        int databaseSizeBeforeTest = localizedPostContentRepository.findAll().size();
        // set the field null
        localizedPostContent.setContent(null);

        // Create the LocalizedPostContent, which fails.


        restLocalizedPostContentMockMvc.perform(post("/api/localized-post-contents").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedPostContent)))
            .andExpect(status().isBadRequest());

        List<LocalizedPostContent> localizedPostContentList = localizedPostContentRepository.findAll();
        assertThat(localizedPostContentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = localizedPostContentRepository.findAll().size();
        // set the field null
        localizedPostContent.setLanguage(null);

        // Create the LocalizedPostContent, which fails.


        restLocalizedPostContentMockMvc.perform(post("/api/localized-post-contents").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedPostContent)))
            .andExpect(status().isBadRequest());

        List<LocalizedPostContent> localizedPostContentList = localizedPostContentRepository.findAll();
        assertThat(localizedPostContentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLocalizedPostContents() throws Exception {
        // Initialize the database
        localizedPostContentRepository.saveAndFlush(localizedPostContent);

        // Get all the localizedPostContentList
        restLocalizedPostContentMockMvc.perform(get("/api/localized-post-contents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(localizedPostContent.getId().intValue())))
            .andExpect(jsonPath("$.[*].excerpt").value(hasItem(DEFAULT_EXCERPT)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getLocalizedPostContent() throws Exception {
        // Initialize the database
        localizedPostContentRepository.saveAndFlush(localizedPostContent);

        // Get the localizedPostContent
        restLocalizedPostContentMockMvc.perform(get("/api/localized-post-contents/{id}", localizedPostContent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(localizedPostContent.getId().intValue()))
            .andExpect(jsonPath("$.excerpt").value(DEFAULT_EXCERPT))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingLocalizedPostContent() throws Exception {
        // Get the localizedPostContent
        restLocalizedPostContentMockMvc.perform(get("/api/localized-post-contents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLocalizedPostContent() throws Exception {
        // Initialize the database
        localizedPostContentRepository.saveAndFlush(localizedPostContent);

        int databaseSizeBeforeUpdate = localizedPostContentRepository.findAll().size();

        // Update the localizedPostContent
        LocalizedPostContent updatedLocalizedPostContent = localizedPostContentRepository.findById(localizedPostContent.getId()).get();
        // Disconnect from session so that the updates on updatedLocalizedPostContent are not directly saved in db
        em.detach(updatedLocalizedPostContent);
        updatedLocalizedPostContent
            .excerpt(UPDATED_EXCERPT)
            .content(UPDATED_CONTENT)
            .language(UPDATED_LANGUAGE);

        restLocalizedPostContentMockMvc.perform(put("/api/localized-post-contents").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLocalizedPostContent)))
            .andExpect(status().isOk());

        // Validate the LocalizedPostContent in the database
        List<LocalizedPostContent> localizedPostContentList = localizedPostContentRepository.findAll();
        assertThat(localizedPostContentList).hasSize(databaseSizeBeforeUpdate);
        LocalizedPostContent testLocalizedPostContent = localizedPostContentList.get(localizedPostContentList.size() - 1);
        assertThat(testLocalizedPostContent.getExcerpt()).isEqualTo(UPDATED_EXCERPT);
        assertThat(testLocalizedPostContent.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testLocalizedPostContent.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingLocalizedPostContent() throws Exception {
        int databaseSizeBeforeUpdate = localizedPostContentRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalizedPostContentMockMvc.perform(put("/api/localized-post-contents").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedPostContent)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedPostContent in the database
        List<LocalizedPostContent> localizedPostContentList = localizedPostContentRepository.findAll();
        assertThat(localizedPostContentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLocalizedPostContent() throws Exception {
        // Initialize the database
        localizedPostContentRepository.saveAndFlush(localizedPostContent);

        int databaseSizeBeforeDelete = localizedPostContentRepository.findAll().size();

        // Delete the localizedPostContent
        restLocalizedPostContentMockMvc.perform(delete("/api/localized-post-contents/{id}", localizedPostContent.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LocalizedPostContent> localizedPostContentList = localizedPostContentRepository.findAll();
        assertThat(localizedPostContentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
