package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.Blog;
import com.n42c.domain.LocalizedBlog;
import com.n42c.domain.enumeration.Language;
import com.n42c.repository.LocalizedBlogRepository;
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
 * Integration tests for the {@link LocalizedBlogResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@AutoConfigureMockMvc
@WithMockUser
public class LocalizedBlogResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Language DEFAULT_LANGUAGE = Language.EN;
    private static final Language UPDATED_LANGUAGE = Language.FR;

    @Autowired
    private LocalizedBlogRepository localizedBlogRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLocalizedBlogMockMvc;

    private LocalizedBlog localizedBlog;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedBlog createEntity(EntityManager em) {
        LocalizedBlog localizedBlog = new LocalizedBlog()
            .name(DEFAULT_NAME)
            .language(DEFAULT_LANGUAGE);
        // Add required entity
        Blog blog;
        if (TestUtil.findAll(em, Blog.class).isEmpty()) {
            blog = BlogResourceIT.createEntity(em);
            em.persist(blog);
            em.flush();
        } else {
            blog = TestUtil.findAll(em, Blog.class).get(0);
        }
        localizedBlog.setBlog(blog);
        return localizedBlog;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedBlog createUpdatedEntity(EntityManager em) {
        LocalizedBlog localizedBlog = new LocalizedBlog()
            .name(UPDATED_NAME)
            .language(UPDATED_LANGUAGE);
        // Add required entity
        Blog blog;
        if (TestUtil.findAll(em, Blog.class).isEmpty()) {
            blog = BlogResourceIT.createUpdatedEntity(em);
            em.persist(blog);
            em.flush();
        } else {
            blog = TestUtil.findAll(em, Blog.class).get(0);
        }
        localizedBlog.setBlog(blog);
        return localizedBlog;
    }

    @BeforeEach
    public void initTest() {
        localizedBlog = createEntity(em);
    }

    @Test
    @Transactional
    public void createLocalizedBlog() throws Exception {
        int databaseSizeBeforeCreate = localizedBlogRepository.findAll().size();
        // Create the LocalizedBlog
        restLocalizedBlogMockMvc.perform(post("/api/localized-blogs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedBlog)))
            .andExpect(status().isCreated());

        // Validate the LocalizedBlog in the database
        List<LocalizedBlog> localizedBlogList = localizedBlogRepository.findAll();
        assertThat(localizedBlogList).hasSize(databaseSizeBeforeCreate + 1);
        LocalizedBlog testLocalizedBlog = localizedBlogList.get(localizedBlogList.size() - 1);
        assertThat(testLocalizedBlog.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testLocalizedBlog.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
    }

    @Test
    @Transactional
    public void createLocalizedBlogWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = localizedBlogRepository.findAll().size();

        // Create the LocalizedBlog with an existing ID
        localizedBlog.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocalizedBlogMockMvc.perform(post("/api/localized-blogs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedBlog)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedBlog in the database
        List<LocalizedBlog> localizedBlogList = localizedBlogRepository.findAll();
        assertThat(localizedBlogList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = localizedBlogRepository.findAll().size();
        // set the field null
        localizedBlog.setName(null);

        // Create the LocalizedBlog, which fails.


        restLocalizedBlogMockMvc.perform(post("/api/localized-blogs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedBlog)))
            .andExpect(status().isBadRequest());

        List<LocalizedBlog> localizedBlogList = localizedBlogRepository.findAll();
        assertThat(localizedBlogList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = localizedBlogRepository.findAll().size();
        // set the field null
        localizedBlog.setLanguage(null);

        // Create the LocalizedBlog, which fails.


        restLocalizedBlogMockMvc.perform(post("/api/localized-blogs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedBlog)))
            .andExpect(status().isBadRequest());

        List<LocalizedBlog> localizedBlogList = localizedBlogRepository.findAll();
        assertThat(localizedBlogList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLocalizedBlogs() throws Exception {
        // Initialize the database
        localizedBlogRepository.saveAndFlush(localizedBlog);

        // Get all the localizedBlogList
        restLocalizedBlogMockMvc.perform(get("/api/localized-blogs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(localizedBlog.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }

    @Test
    @Transactional
    public void getLocalizedBlog() throws Exception {
        // Initialize the database
        localizedBlogRepository.saveAndFlush(localizedBlog);

        // Get the localizedBlog
        restLocalizedBlogMockMvc.perform(get("/api/localized-blogs/{id}", localizedBlog.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(localizedBlog.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLocalizedBlog() throws Exception {
        // Get the localizedBlog
        restLocalizedBlogMockMvc.perform(get("/api/localized-blogs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLocalizedBlog() throws Exception {
        // Initialize the database
        localizedBlogRepository.saveAndFlush(localizedBlog);

        int databaseSizeBeforeUpdate = localizedBlogRepository.findAll().size();

        // Update the localizedBlog
        LocalizedBlog updatedLocalizedBlog = localizedBlogRepository.findById(localizedBlog.getId()).get();
        // Disconnect from session so that the updates on updatedLocalizedBlog are not directly saved in db
        em.detach(updatedLocalizedBlog);
        updatedLocalizedBlog
            .name(UPDATED_NAME)
            .language(UPDATED_LANGUAGE);

        restLocalizedBlogMockMvc.perform(put("/api/localized-blogs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLocalizedBlog)))
            .andExpect(status().isOk());

        // Validate the LocalizedBlog in the database
        List<LocalizedBlog> localizedBlogList = localizedBlogRepository.findAll();
        assertThat(localizedBlogList).hasSize(databaseSizeBeforeUpdate);
        LocalizedBlog testLocalizedBlog = localizedBlogList.get(localizedBlogList.size() - 1);
        assertThat(testLocalizedBlog.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testLocalizedBlog.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingLocalizedBlog() throws Exception {
        int databaseSizeBeforeUpdate = localizedBlogRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalizedBlogMockMvc.perform(put("/api/localized-blogs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedBlog)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedBlog in the database
        List<LocalizedBlog> localizedBlogList = localizedBlogRepository.findAll();
        assertThat(localizedBlogList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLocalizedBlog() throws Exception {
        // Initialize the database
        localizedBlogRepository.saveAndFlush(localizedBlog);

        int databaseSizeBeforeDelete = localizedBlogRepository.findAll().size();

        // Delete the localizedBlog
        restLocalizedBlogMockMvc.perform(delete("/api/localized-blogs/{id}", localizedBlog.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LocalizedBlog> localizedBlogList = localizedBlogRepository.findAll();
        assertThat(localizedBlogList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
