package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.BlogCategory;
import com.n42c.repository.BlogCategoryRepository;
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
 * Integration tests for the {@link BlogCategoryResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@AutoConfigureMockMvc
@WithMockUser
public class BlogCategoryResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private BlogCategoryRepository blogCategoryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBlogCategoryMockMvc;

    private BlogCategory blogCategory;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BlogCategory createEntity(EntityManager em) {
        BlogCategory blogCategory = new BlogCategory()
            .name(DEFAULT_NAME);
        return blogCategory;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BlogCategory createUpdatedEntity(EntityManager em) {
        BlogCategory blogCategory = new BlogCategory()
            .name(UPDATED_NAME);
        return blogCategory;
    }

    @BeforeEach
    public void initTest() {
        blogCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createBlogCategory() throws Exception {
        int databaseSizeBeforeCreate = blogCategoryRepository.findAll().size();
        // Create the BlogCategory
        restBlogCategoryMockMvc.perform(post("/api/blog-categories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(blogCategory)))
            .andExpect(status().isCreated());

        // Validate the BlogCategory in the database
        List<BlogCategory> blogCategoryList = blogCategoryRepository.findAll();
        assertThat(blogCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        BlogCategory testBlogCategory = blogCategoryList.get(blogCategoryList.size() - 1);
        assertThat(testBlogCategory.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createBlogCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = blogCategoryRepository.findAll().size();

        // Create the BlogCategory with an existing ID
        blogCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBlogCategoryMockMvc.perform(post("/api/blog-categories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(blogCategory)))
            .andExpect(status().isBadRequest());

        // Validate the BlogCategory in the database
        List<BlogCategory> blogCategoryList = blogCategoryRepository.findAll();
        assertThat(blogCategoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = blogCategoryRepository.findAll().size();
        // set the field null
        blogCategory.setName(null);

        // Create the BlogCategory, which fails.


        restBlogCategoryMockMvc.perform(post("/api/blog-categories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(blogCategory)))
            .andExpect(status().isBadRequest());

        List<BlogCategory> blogCategoryList = blogCategoryRepository.findAll();
        assertThat(blogCategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBlogCategories() throws Exception {
        // Initialize the database
        blogCategoryRepository.saveAndFlush(blogCategory);

        // Get all the blogCategoryList
        restBlogCategoryMockMvc.perform(get("/api/blog-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(blogCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    public void getBlogCategory() throws Exception {
        // Initialize the database
        blogCategoryRepository.saveAndFlush(blogCategory);

        // Get the blogCategory
        restBlogCategoryMockMvc.perform(get("/api/blog-categories/{id}", blogCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(blogCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingBlogCategory() throws Exception {
        // Get the blogCategory
        restBlogCategoryMockMvc.perform(get("/api/blog-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBlogCategory() throws Exception {
        // Initialize the database
        blogCategoryRepository.saveAndFlush(blogCategory);

        int databaseSizeBeforeUpdate = blogCategoryRepository.findAll().size();

        // Update the blogCategory
        BlogCategory updatedBlogCategory = blogCategoryRepository.findById(blogCategory.getId()).get();
        // Disconnect from session so that the updates on updatedBlogCategory are not directly saved in db
        em.detach(updatedBlogCategory);
        updatedBlogCategory
            .name(UPDATED_NAME);

        restBlogCategoryMockMvc.perform(put("/api/blog-categories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBlogCategory)))
            .andExpect(status().isOk());

        // Validate the BlogCategory in the database
        List<BlogCategory> blogCategoryList = blogCategoryRepository.findAll();
        assertThat(blogCategoryList).hasSize(databaseSizeBeforeUpdate);
        BlogCategory testBlogCategory = blogCategoryList.get(blogCategoryList.size() - 1);
        assertThat(testBlogCategory.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingBlogCategory() throws Exception {
        int databaseSizeBeforeUpdate = blogCategoryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBlogCategoryMockMvc.perform(put("/api/blog-categories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(blogCategory)))
            .andExpect(status().isBadRequest());

        // Validate the BlogCategory in the database
        List<BlogCategory> blogCategoryList = blogCategoryRepository.findAll();
        assertThat(blogCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBlogCategory() throws Exception {
        // Initialize the database
        blogCategoryRepository.saveAndFlush(blogCategory);

        int databaseSizeBeforeDelete = blogCategoryRepository.findAll().size();

        // Delete the blogCategory
        restBlogCategoryMockMvc.perform(delete("/api/blog-categories/{id}", blogCategory.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BlogCategory> blogCategoryList = blogCategoryRepository.findAll();
        assertThat(blogCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
