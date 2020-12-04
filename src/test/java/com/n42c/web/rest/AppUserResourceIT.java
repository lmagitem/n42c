package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.AppUser;
import com.n42c.domain.User;
import com.n42c.domain.enumeration.AppUserRights;
import com.n42c.repository.AppUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AppUserResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class AppUserResourceIT {

    private static final String DEFAULT_USER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_USER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DISPLAYED_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DISPLAYED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ADMIN = false;
    private static final Boolean UPDATED_ADMIN = true;

    private static final AppUserRights DEFAULT_SHOP_RIGHTS = AppUserRights.MOD;
    private static final AppUserRights UPDATED_SHOP_RIGHTS = AppUserRights.WRI;

    private static final AppUserRights DEFAULT_BLOG_RIGHTS = AppUserRights.MOD;
    private static final AppUserRights UPDATED_BLOG_RIGHTS = AppUserRights.WRI;

    private static final AppUserRights DEFAULT_PROFILE_RIGHTS = AppUserRights.MOD;
    private static final AppUserRights UPDATED_PROFILE_RIGHTS = AppUserRights.WRI;

    private static final AppUserRights DEFAULT_SCRIPTORIUM_RIGHTS = AppUserRights.MOD;
    private static final AppUserRights UPDATED_SCRIPTORIUM_RIGHTS = AppUserRights.WRI;

    @Autowired
    private AppUserRepository appUserRepository;

    @Mock
    private AppUserRepository appUserRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAppUserMockMvc;

    private AppUser appUser;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AppUser createEntity(EntityManager em) {
        AppUser appUser = new AppUser()
            .userName(DEFAULT_USER_NAME)
            .displayedName(DEFAULT_DISPLAYED_NAME)
            .admin(DEFAULT_ADMIN)
            .shopRights(DEFAULT_SHOP_RIGHTS)
            .blogRights(DEFAULT_BLOG_RIGHTS)
            .profileRights(DEFAULT_PROFILE_RIGHTS)
            .scriptoriumRights(DEFAULT_SCRIPTORIUM_RIGHTS);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        appUser.setUser(user);
        return appUser;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AppUser createUpdatedEntity(EntityManager em) {
        AppUser appUser = new AppUser()
            .userName(UPDATED_USER_NAME)
            .displayedName(UPDATED_DISPLAYED_NAME)
            .admin(UPDATED_ADMIN)
            .shopRights(UPDATED_SHOP_RIGHTS)
            .blogRights(UPDATED_BLOG_RIGHTS)
            .profileRights(UPDATED_PROFILE_RIGHTS)
            .scriptoriumRights(UPDATED_SCRIPTORIUM_RIGHTS);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        appUser.setUser(user);
        return appUser;
    }

    @BeforeEach
    public void initTest() {
        appUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createAppUser() throws Exception {
        int databaseSizeBeforeCreate = appUserRepository.findAll().size();
        // Create the AppUser
        restAppUserMockMvc.perform(post("/api/app-users").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(appUser)))
            .andExpect(status().isCreated());

        // Validate the AppUser in the database
        List<AppUser> appUserList = appUserRepository.findAll();
        assertThat(appUserList).hasSize(databaseSizeBeforeCreate + 1);
        AppUser testAppUser = appUserList.get(appUserList.size() - 1);
        assertThat(testAppUser.getUserName()).isEqualTo(DEFAULT_USER_NAME);
        assertThat(testAppUser.getDisplayedName()).isEqualTo(DEFAULT_DISPLAYED_NAME);
        assertThat(testAppUser.isAdmin()).isEqualTo(DEFAULT_ADMIN);
        assertThat(testAppUser.getShopRights()).isEqualTo(DEFAULT_SHOP_RIGHTS);
        assertThat(testAppUser.getBlogRights()).isEqualTo(DEFAULT_BLOG_RIGHTS);
        assertThat(testAppUser.getProfileRights()).isEqualTo(DEFAULT_PROFILE_RIGHTS);
        assertThat(testAppUser.getScriptoriumRights()).isEqualTo(DEFAULT_SCRIPTORIUM_RIGHTS);
    }

    @Test
    @Transactional
    public void createAppUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = appUserRepository.findAll().size();

        // Create the AppUser with an existing ID
        appUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAppUserMockMvc.perform(post("/api/app-users").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(appUser)))
            .andExpect(status().isBadRequest());

        // Validate the AppUser in the database
        List<AppUser> appUserList = appUserRepository.findAll();
        assertThat(appUserList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkUserNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = appUserRepository.findAll().size();
        // set the field null
        appUser.setUserName(null);

        // Create the AppUser, which fails.


        restAppUserMockMvc.perform(post("/api/app-users").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(appUser)))
            .andExpect(status().isBadRequest());

        List<AppUser> appUserList = appUserRepository.findAll();
        assertThat(appUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAdminIsRequired() throws Exception {
        int databaseSizeBeforeTest = appUserRepository.findAll().size();
        // set the field null
        appUser.setAdmin(null);

        // Create the AppUser, which fails.


        restAppUserMockMvc.perform(post("/api/app-users").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(appUser)))
            .andExpect(status().isBadRequest());

        List<AppUser> appUserList = appUserRepository.findAll();
        assertThat(appUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkShopRightsIsRequired() throws Exception {
        int databaseSizeBeforeTest = appUserRepository.findAll().size();
        // set the field null
        appUser.setShopRights(null);

        // Create the AppUser, which fails.


        restAppUserMockMvc.perform(post("/api/app-users").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(appUser)))
            .andExpect(status().isBadRequest());

        List<AppUser> appUserList = appUserRepository.findAll();
        assertThat(appUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBlogRightsIsRequired() throws Exception {
        int databaseSizeBeforeTest = appUserRepository.findAll().size();
        // set the field null
        appUser.setBlogRights(null);

        // Create the AppUser, which fails.


        restAppUserMockMvc.perform(post("/api/app-users").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(appUser)))
            .andExpect(status().isBadRequest());

        List<AppUser> appUserList = appUserRepository.findAll();
        assertThat(appUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProfileRightsIsRequired() throws Exception {
        int databaseSizeBeforeTest = appUserRepository.findAll().size();
        // set the field null
        appUser.setProfileRights(null);

        // Create the AppUser, which fails.


        restAppUserMockMvc.perform(post("/api/app-users").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(appUser)))
            .andExpect(status().isBadRequest());

        List<AppUser> appUserList = appUserRepository.findAll();
        assertThat(appUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkScriptoriumRightsIsRequired() throws Exception {
        int databaseSizeBeforeTest = appUserRepository.findAll().size();
        // set the field null
        appUser.setScriptoriumRights(null);

        // Create the AppUser, which fails.


        restAppUserMockMvc.perform(post("/api/app-users").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(appUser)))
            .andExpect(status().isBadRequest());

        List<AppUser> appUserList = appUserRepository.findAll();
        assertThat(appUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAppUsers() throws Exception {
        // Initialize the database
        appUserRepository.saveAndFlush(appUser);

        // Get all the appUserList
        restAppUserMockMvc.perform(get("/api/app-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(appUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].userName").value(hasItem(DEFAULT_USER_NAME)))
            .andExpect(jsonPath("$.[*].displayedName").value(hasItem(DEFAULT_DISPLAYED_NAME)))
            .andExpect(jsonPath("$.[*].admin").value(hasItem(DEFAULT_ADMIN.booleanValue())))
            .andExpect(jsonPath("$.[*].shopRights").value(hasItem(DEFAULT_SHOP_RIGHTS.toString())))
            .andExpect(jsonPath("$.[*].blogRights").value(hasItem(DEFAULT_BLOG_RIGHTS.toString())))
            .andExpect(jsonPath("$.[*].profileRights").value(hasItem(DEFAULT_PROFILE_RIGHTS.toString())))
            .andExpect(jsonPath("$.[*].scriptoriumRights").value(hasItem(DEFAULT_SCRIPTORIUM_RIGHTS.toString())));
    }

    @SuppressWarnings({"unchecked"})
    public void getAllAppUsersWithEagerRelationshipsIsEnabled() throws Exception {
        when(appUserRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restAppUserMockMvc.perform(get("/api/app-users?eagerload=true"))
            .andExpect(status().isOk());

        verify(appUserRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllAppUsersWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(appUserRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restAppUserMockMvc.perform(get("/api/app-users?eagerload=true"))
            .andExpect(status().isOk());

        verify(appUserRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getAppUser() throws Exception {
        // Initialize the database
        appUserRepository.saveAndFlush(appUser);

        // Get the appUser
        restAppUserMockMvc.perform(get("/api/app-users/{id}", appUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(appUser.getId().intValue()))
            .andExpect(jsonPath("$.userName").value(DEFAULT_USER_NAME))
            .andExpect(jsonPath("$.displayedName").value(DEFAULT_DISPLAYED_NAME))
            .andExpect(jsonPath("$.admin").value(DEFAULT_ADMIN.booleanValue()))
            .andExpect(jsonPath("$.shopRights").value(DEFAULT_SHOP_RIGHTS.toString()))
            .andExpect(jsonPath("$.blogRights").value(DEFAULT_BLOG_RIGHTS.toString()))
            .andExpect(jsonPath("$.profileRights").value(DEFAULT_PROFILE_RIGHTS.toString()))
            .andExpect(jsonPath("$.scriptoriumRights").value(DEFAULT_SCRIPTORIUM_RIGHTS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAppUser() throws Exception {
        // Get the appUser
        restAppUserMockMvc.perform(get("/api/app-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAppUser() throws Exception {
        // Initialize the database
        appUserRepository.saveAndFlush(appUser);

        int databaseSizeBeforeUpdate = appUserRepository.findAll().size();

        // Update the appUser
        AppUser updatedAppUser = appUserRepository.findById(appUser.getId()).get();
        // Disconnect from session so that the updates on updatedAppUser are not directly saved in db
        em.detach(updatedAppUser);
        updatedAppUser
            .userName(UPDATED_USER_NAME)
            .displayedName(UPDATED_DISPLAYED_NAME)
            .admin(UPDATED_ADMIN)
            .shopRights(UPDATED_SHOP_RIGHTS)
            .blogRights(UPDATED_BLOG_RIGHTS)
            .profileRights(UPDATED_PROFILE_RIGHTS)
            .scriptoriumRights(UPDATED_SCRIPTORIUM_RIGHTS);

        restAppUserMockMvc.perform(put("/api/app-users").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAppUser)))
            .andExpect(status().isOk());

        // Validate the AppUser in the database
        List<AppUser> appUserList = appUserRepository.findAll();
        assertThat(appUserList).hasSize(databaseSizeBeforeUpdate);
        AppUser testAppUser = appUserList.get(appUserList.size() - 1);
        assertThat(testAppUser.getUserName()).isEqualTo(UPDATED_USER_NAME);
        assertThat(testAppUser.getDisplayedName()).isEqualTo(UPDATED_DISPLAYED_NAME);
        assertThat(testAppUser.isAdmin()).isEqualTo(UPDATED_ADMIN);
        assertThat(testAppUser.getShopRights()).isEqualTo(UPDATED_SHOP_RIGHTS);
        assertThat(testAppUser.getBlogRights()).isEqualTo(UPDATED_BLOG_RIGHTS);
        assertThat(testAppUser.getProfileRights()).isEqualTo(UPDATED_PROFILE_RIGHTS);
        assertThat(testAppUser.getScriptoriumRights()).isEqualTo(UPDATED_SCRIPTORIUM_RIGHTS);
    }

    @Test
    @Transactional
    public void updateNonExistingAppUser() throws Exception {
        int databaseSizeBeforeUpdate = appUserRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAppUserMockMvc.perform(put("/api/app-users").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(appUser)))
            .andExpect(status().isBadRequest());

        // Validate the AppUser in the database
        List<AppUser> appUserList = appUserRepository.findAll();
        assertThat(appUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAppUser() throws Exception {
        // Initialize the database
        appUserRepository.saveAndFlush(appUser);

        int databaseSizeBeforeDelete = appUserRepository.findAll().size();

        // Delete the appUser
        restAppUserMockMvc.perform(delete("/api/app-users/{id}", appUser.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AppUser> appUserList = appUserRepository.findAll();
        assertThat(appUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
