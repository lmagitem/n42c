package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.LocalizedProduct;
import com.n42c.repository.LocalizedProductRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.n42c.domain.enumeration.Language;
/**
 * Integration tests for the {@link LocalizedProductResource} REST controller.
 */
@SpringBootTest(classes = { N42CApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class LocalizedProductResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EXCERPT = "AAAAAAAAAA";
    private static final String UPDATED_EXCERPT = "BBBBBBBBBB";

    private static final String DEFAULT_PICTURE_URL = "AAAAAAAAAA";
    private static final String UPDATED_PICTURE_URL = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Language DEFAULT_LANGUAGE = Language.EN;
    private static final Language UPDATED_LANGUAGE = Language.FR;

    @Autowired
    private LocalizedProductRepository localizedProductRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLocalizedProductMockMvc;

    private LocalizedProduct localizedProduct;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedProduct createEntity(EntityManager em) {
        LocalizedProduct localizedProduct = new LocalizedProduct()
            .name(DEFAULT_NAME)
            .excerpt(DEFAULT_EXCERPT)
            .pictureUrl(DEFAULT_PICTURE_URL)
            .content(DEFAULT_CONTENT)
            .language(DEFAULT_LANGUAGE);
        return localizedProduct;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalizedProduct createUpdatedEntity(EntityManager em) {
        LocalizedProduct localizedProduct = new LocalizedProduct()
            .name(UPDATED_NAME)
            .excerpt(UPDATED_EXCERPT)
            .pictureUrl(UPDATED_PICTURE_URL)
            .content(UPDATED_CONTENT)
            .language(UPDATED_LANGUAGE);
        return localizedProduct;
    }

    @BeforeEach
    public void initTest() {
        localizedProduct = createEntity(em);
    }

    @Test
    @Transactional
    public void createLocalizedProduct() throws Exception {
        int databaseSizeBeforeCreate = localizedProductRepository.findAll().size();
        // Create the LocalizedProduct
        restLocalizedProductMockMvc.perform(post("/api/localized-products").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedProduct)))
            .andExpect(status().isCreated());

        // Validate the LocalizedProduct in the database
        List<LocalizedProduct> localizedProductList = localizedProductRepository.findAll();
        assertThat(localizedProductList).hasSize(databaseSizeBeforeCreate + 1);
        LocalizedProduct testLocalizedProduct = localizedProductList.get(localizedProductList.size() - 1);
        assertThat(testLocalizedProduct.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testLocalizedProduct.getExcerpt()).isEqualTo(DEFAULT_EXCERPT);
        assertThat(testLocalizedProduct.getPictureUrl()).isEqualTo(DEFAULT_PICTURE_URL);
        assertThat(testLocalizedProduct.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testLocalizedProduct.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
    }

    @Test
    @Transactional
    public void createLocalizedProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = localizedProductRepository.findAll().size();

        // Create the LocalizedProduct with an existing ID
        localizedProduct.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocalizedProductMockMvc.perform(post("/api/localized-products").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedProduct)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedProduct in the database
        List<LocalizedProduct> localizedProductList = localizedProductRepository.findAll();
        assertThat(localizedProductList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = localizedProductRepository.findAll().size();
        // set the field null
        localizedProduct.setName(null);

        // Create the LocalizedProduct, which fails.


        restLocalizedProductMockMvc.perform(post("/api/localized-products").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedProduct)))
            .andExpect(status().isBadRequest());

        List<LocalizedProduct> localizedProductList = localizedProductRepository.findAll();
        assertThat(localizedProductList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = localizedProductRepository.findAll().size();
        // set the field null
        localizedProduct.setLanguage(null);

        // Create the LocalizedProduct, which fails.


        restLocalizedProductMockMvc.perform(post("/api/localized-products").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedProduct)))
            .andExpect(status().isBadRequest());

        List<LocalizedProduct> localizedProductList = localizedProductRepository.findAll();
        assertThat(localizedProductList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLocalizedProducts() throws Exception {
        // Initialize the database
        localizedProductRepository.saveAndFlush(localizedProduct);

        // Get all the localizedProductList
        restLocalizedProductMockMvc.perform(get("/api/localized-products?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(localizedProduct.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].excerpt").value(hasItem(DEFAULT_EXCERPT)))
            .andExpect(jsonPath("$.[*].pictureUrl").value(hasItem(DEFAULT_PICTURE_URL)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getLocalizedProduct() throws Exception {
        // Initialize the database
        localizedProductRepository.saveAndFlush(localizedProduct);

        // Get the localizedProduct
        restLocalizedProductMockMvc.perform(get("/api/localized-products/{id}", localizedProduct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(localizedProduct.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.excerpt").value(DEFAULT_EXCERPT))
            .andExpect(jsonPath("$.pictureUrl").value(DEFAULT_PICTURE_URL))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingLocalizedProduct() throws Exception {
        // Get the localizedProduct
        restLocalizedProductMockMvc.perform(get("/api/localized-products/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLocalizedProduct() throws Exception {
        // Initialize the database
        localizedProductRepository.saveAndFlush(localizedProduct);

        int databaseSizeBeforeUpdate = localizedProductRepository.findAll().size();

        // Update the localizedProduct
        LocalizedProduct updatedLocalizedProduct = localizedProductRepository.findById(localizedProduct.getId()).get();
        // Disconnect from session so that the updates on updatedLocalizedProduct are not directly saved in db
        em.detach(updatedLocalizedProduct);
        updatedLocalizedProduct
            .name(UPDATED_NAME)
            .excerpt(UPDATED_EXCERPT)
            .pictureUrl(UPDATED_PICTURE_URL)
            .content(UPDATED_CONTENT)
            .language(UPDATED_LANGUAGE);

        restLocalizedProductMockMvc.perform(put("/api/localized-products").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLocalizedProduct)))
            .andExpect(status().isOk());

        // Validate the LocalizedProduct in the database
        List<LocalizedProduct> localizedProductList = localizedProductRepository.findAll();
        assertThat(localizedProductList).hasSize(databaseSizeBeforeUpdate);
        LocalizedProduct testLocalizedProduct = localizedProductList.get(localizedProductList.size() - 1);
        assertThat(testLocalizedProduct.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testLocalizedProduct.getExcerpt()).isEqualTo(UPDATED_EXCERPT);
        assertThat(testLocalizedProduct.getPictureUrl()).isEqualTo(UPDATED_PICTURE_URL);
        assertThat(testLocalizedProduct.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testLocalizedProduct.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingLocalizedProduct() throws Exception {
        int databaseSizeBeforeUpdate = localizedProductRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalizedProductMockMvc.perform(put("/api/localized-products").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localizedProduct)))
            .andExpect(status().isBadRequest());

        // Validate the LocalizedProduct in the database
        List<LocalizedProduct> localizedProductList = localizedProductRepository.findAll();
        assertThat(localizedProductList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLocalizedProduct() throws Exception {
        // Initialize the database
        localizedProductRepository.saveAndFlush(localizedProduct);

        int databaseSizeBeforeDelete = localizedProductRepository.findAll().size();

        // Delete the localizedProduct
        restLocalizedProductMockMvc.perform(delete("/api/localized-products/{id}", localizedProduct.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LocalizedProduct> localizedProductList = localizedProductRepository.findAll();
        assertThat(localizedProductList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
