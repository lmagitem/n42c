package com.n42c.web.rest;

import com.n42c.N42CApp;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.NinthArmyUnitMoment;
import com.n42c.domain.enumerations.NinthCrusadeRank;
import com.n42c.repository.NinthArmyUnitMomentRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link NinthArmyUnitMomentResource} REST controller.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@AutoConfigureMockMvc
@WithMockUser
public class NinthArmyUnitMomentResourceIT {

    private static final Boolean DEFAULT_CURRENT = false;
    private static final Boolean UPDATED_CURRENT = true;

    private static final Instant DEFAULT_SINCE_INSTANT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SINCE_INSTANT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_POINTS_COST = 1;
    private static final Integer UPDATED_POINTS_COST = 2;

    private static final Integer DEFAULT_POWER_RATING = 1;
    private static final Integer UPDATED_POWER_RATING = 2;

    private static final Integer DEFAULT_EXPERIENCE_POINTS = 1;
    private static final Integer UPDATED_EXPERIENCE_POINTS = 2;

    private static final Integer DEFAULT_CRUSADE_POINTS = 1;
    private static final Integer UPDATED_CRUSADE_POINTS = 2;

    private static final String DEFAULT_EQUIPMENT = "AAAAAAAAAA";
    private static final String UPDATED_EQUIPMENT = "BBBBBBBBBB";

    private static final String DEFAULT_PSYCHIC_POWERS = "AAAAAAAAAA";
    private static final String UPDATED_PSYCHIC_POWERS = "BBBBBBBBBB";

    private static final String DEFAULT_WARLORD_TRAITS = "AAAAAAAAAA";
    private static final String UPDATED_WARLORD_TRAITS = "BBBBBBBBBB";

    private static final String DEFAULT_RELICS = "AAAAAAAAAA";
    private static final String UPDATED_RELICS = "BBBBBBBBBB";

    private static final String DEFAULT_OTHER_UPGRADES = "AAAAAAAAAA";
    private static final String UPDATED_OTHER_UPGRADES = "BBBBBBBBBB";

    private static final Integer DEFAULT_BATTLES_PLAYED = 1;
    private static final Integer UPDATED_BATTLES_PLAYED = 2;

    private static final Integer DEFAULT_BATTLES_SURVIVED = 1;
    private static final Integer UPDATED_BATTLES_SURVIVED = 2;

    private static final Integer DEFAULT_RANGED_KILLS = 1;
    private static final Integer UPDATED_RANGED_KILLS = 2;

    private static final Integer DEFAULT_MELEE_KILLS = 1;
    private static final Integer UPDATED_MELEE_KILLS = 2;

    private static final Integer DEFAULT_PSYCHIC_KILLS = 1;
    private static final Integer UPDATED_PSYCHIC_KILLS = 2;

    private static final NinthCrusadeRank DEFAULT_CRUSADE_RANK = NinthCrusadeRank.RE;
    private static final NinthCrusadeRank UPDATED_CRUSADE_RANK = NinthCrusadeRank.BL;

    private static final String DEFAULT_BATTLE_HONOURS = "AAAAAAAAAA";
    private static final String UPDATED_BATTLE_HONOURS = "BBBBBBBBBB";

    private static final String DEFAULT_BATTLE_SCARS = "AAAAAAAAAA";
    private static final String UPDATED_BATTLE_SCARS = "BBBBBBBBBB";

    @Autowired
    private NinthArmyUnitMomentRepository ninthArmyUnitMomentRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNinthArmyUnitMomentMockMvc;

    private NinthArmyUnitMoment ninthArmyUnitMoment;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthArmyUnitMoment createEntity(EntityManager em) {
        NinthArmyUnitMoment ninthArmyUnitMoment = new NinthArmyUnitMoment()
            .current(DEFAULT_CURRENT)
            .sinceInstant(DEFAULT_SINCE_INSTANT)
            .pointsCost(DEFAULT_POINTS_COST)
            .powerRating(DEFAULT_POWER_RATING)
            .experiencePoints(DEFAULT_EXPERIENCE_POINTS)
            .crusadePoints(DEFAULT_CRUSADE_POINTS)
            .equipment(DEFAULT_EQUIPMENT)
            .psychicPowers(DEFAULT_PSYCHIC_POWERS)
            .warlordTraits(DEFAULT_WARLORD_TRAITS)
            .relics(DEFAULT_RELICS)
            .otherUpgrades(DEFAULT_OTHER_UPGRADES)
            .battlesPlayed(DEFAULT_BATTLES_PLAYED)
            .battlesSurvived(DEFAULT_BATTLES_SURVIVED)
            .rangedKills(DEFAULT_RANGED_KILLS)
            .meleeKills(DEFAULT_MELEE_KILLS)
            .psychicKills(DEFAULT_PSYCHIC_KILLS)
            .crusadeRank(DEFAULT_CRUSADE_RANK)
            .battleHonours(DEFAULT_BATTLE_HONOURS)
            .battleScars(DEFAULT_BATTLE_SCARS);
        return ninthArmyUnitMoment;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NinthArmyUnitMoment createUpdatedEntity(EntityManager em) {
        NinthArmyUnitMoment ninthArmyUnitMoment = new NinthArmyUnitMoment()
            .current(UPDATED_CURRENT)
            .sinceInstant(UPDATED_SINCE_INSTANT)
            .pointsCost(UPDATED_POINTS_COST)
            .powerRating(UPDATED_POWER_RATING)
            .experiencePoints(UPDATED_EXPERIENCE_POINTS)
            .crusadePoints(UPDATED_CRUSADE_POINTS)
            .equipment(UPDATED_EQUIPMENT)
            .psychicPowers(UPDATED_PSYCHIC_POWERS)
            .warlordTraits(UPDATED_WARLORD_TRAITS)
            .relics(UPDATED_RELICS)
            .otherUpgrades(UPDATED_OTHER_UPGRADES)
            .battlesPlayed(UPDATED_BATTLES_PLAYED)
            .battlesSurvived(UPDATED_BATTLES_SURVIVED)
            .rangedKills(UPDATED_RANGED_KILLS)
            .meleeKills(UPDATED_MELEE_KILLS)
            .psychicKills(UPDATED_PSYCHIC_KILLS)
            .crusadeRank(UPDATED_CRUSADE_RANK)
            .battleHonours(UPDATED_BATTLE_HONOURS)
            .battleScars(UPDATED_BATTLE_SCARS);
        return ninthArmyUnitMoment;
    }

    @BeforeEach
    public void initTest() {
        ninthArmyUnitMoment = createEntity(em);
    }

    @Test
    @Transactional
    public void createNinthArmyUnitMoment() throws Exception {
        int databaseSizeBeforeCreate = ninthArmyUnitMomentRepository.findAll().size();
        // Create the NinthArmyUnitMoment
        restNinthArmyUnitMomentMockMvc.perform(post("/api/ninth-army-unit-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthArmyUnitMoment)))
            .andExpect(status().isCreated());

        // Validate the NinthArmyUnitMoment in the database
        List<NinthArmyUnitMoment> ninthArmyUnitMomentList = ninthArmyUnitMomentRepository.findAll();
        assertThat(ninthArmyUnitMomentList).hasSize(databaseSizeBeforeCreate + 1);
        NinthArmyUnitMoment testNinthArmyUnitMoment = ninthArmyUnitMomentList.get(ninthArmyUnitMomentList.size() - 1);
        assertThat(testNinthArmyUnitMoment.isCurrent()).isEqualTo(DEFAULT_CURRENT);
        assertThat(testNinthArmyUnitMoment.getSinceInstant()).isEqualTo(DEFAULT_SINCE_INSTANT);
        assertThat(testNinthArmyUnitMoment.getPointsCost()).isEqualTo(DEFAULT_POINTS_COST);
        assertThat(testNinthArmyUnitMoment.getPowerRating()).isEqualTo(DEFAULT_POWER_RATING);
        assertThat(testNinthArmyUnitMoment.getExperiencePoints()).isEqualTo(DEFAULT_EXPERIENCE_POINTS);
        assertThat(testNinthArmyUnitMoment.getCrusadePoints()).isEqualTo(DEFAULT_CRUSADE_POINTS);
        assertThat(testNinthArmyUnitMoment.getEquipment()).isEqualTo(DEFAULT_EQUIPMENT);
        assertThat(testNinthArmyUnitMoment.getPsychicPowers()).isEqualTo(DEFAULT_PSYCHIC_POWERS);
        assertThat(testNinthArmyUnitMoment.getWarlordTraits()).isEqualTo(DEFAULT_WARLORD_TRAITS);
        assertThat(testNinthArmyUnitMoment.getRelics()).isEqualTo(DEFAULT_RELICS);
        assertThat(testNinthArmyUnitMoment.getOtherUpgrades()).isEqualTo(DEFAULT_OTHER_UPGRADES);
        assertThat(testNinthArmyUnitMoment.getBattlesPlayed()).isEqualTo(DEFAULT_BATTLES_PLAYED);
        assertThat(testNinthArmyUnitMoment.getBattlesSurvived()).isEqualTo(DEFAULT_BATTLES_SURVIVED);
        assertThat(testNinthArmyUnitMoment.getRangedKills()).isEqualTo(DEFAULT_RANGED_KILLS);
        assertThat(testNinthArmyUnitMoment.getMeleeKills()).isEqualTo(DEFAULT_MELEE_KILLS);
        assertThat(testNinthArmyUnitMoment.getPsychicKills()).isEqualTo(DEFAULT_PSYCHIC_KILLS);
        assertThat(testNinthArmyUnitMoment.getCrusadeRank()).isEqualTo(DEFAULT_CRUSADE_RANK);
        assertThat(testNinthArmyUnitMoment.getBattleHonours()).isEqualTo(DEFAULT_BATTLE_HONOURS);
        assertThat(testNinthArmyUnitMoment.getBattleScars()).isEqualTo(DEFAULT_BATTLE_SCARS);
    }

    @Test
    @Transactional
    public void createNinthArmyUnitMomentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ninthArmyUnitMomentRepository.findAll().size();

        // Create the NinthArmyUnitMoment with an existing ID
        ninthArmyUnitMoment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNinthArmyUnitMomentMockMvc.perform(post("/api/ninth-army-unit-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthArmyUnitMoment)))
            .andExpect(status().isBadRequest());

        // Validate the NinthArmyUnitMoment in the database
        List<NinthArmyUnitMoment> ninthArmyUnitMomentList = ninthArmyUnitMomentRepository.findAll();
        assertThat(ninthArmyUnitMomentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCurrentIsRequired() throws Exception {
        int databaseSizeBeforeTest = ninthArmyUnitMomentRepository.findAll().size();
        // set the field null
        ninthArmyUnitMoment.setCurrent(null);

        // Create the NinthArmyUnitMoment, which fails.


        restNinthArmyUnitMomentMockMvc.perform(post("/api/ninth-army-unit-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthArmyUnitMoment)))
            .andExpect(status().isBadRequest());

        List<NinthArmyUnitMoment> ninthArmyUnitMomentList = ninthArmyUnitMomentRepository.findAll();
        assertThat(ninthArmyUnitMomentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSinceInstantIsRequired() throws Exception {
        int databaseSizeBeforeTest = ninthArmyUnitMomentRepository.findAll().size();
        // set the field null
        ninthArmyUnitMoment.setSinceInstant(null);

        // Create the NinthArmyUnitMoment, which fails.


        restNinthArmyUnitMomentMockMvc.perform(post("/api/ninth-army-unit-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthArmyUnitMoment)))
            .andExpect(status().isBadRequest());

        List<NinthArmyUnitMoment> ninthArmyUnitMomentList = ninthArmyUnitMomentRepository.findAll();
        assertThat(ninthArmyUnitMomentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNinthArmyUnitMoments() throws Exception {
        // Initialize the database
        ninthArmyUnitMomentRepository.saveAndFlush(ninthArmyUnitMoment);

        // Get all the ninthArmyUnitMomentList
        restNinthArmyUnitMomentMockMvc.perform(get("/api/ninth-army-unit-moments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ninthArmyUnitMoment.getId().intValue())))
            .andExpect(jsonPath("$.[*].current").value(hasItem(DEFAULT_CURRENT.booleanValue())))
            .andExpect(jsonPath("$.[*].sinceInstant").value(hasItem(DEFAULT_SINCE_INSTANT.toString())))
            .andExpect(jsonPath("$.[*].pointsCost").value(hasItem(DEFAULT_POINTS_COST)))
            .andExpect(jsonPath("$.[*].powerRating").value(hasItem(DEFAULT_POWER_RATING)))
            .andExpect(jsonPath("$.[*].experiencePoints").value(hasItem(DEFAULT_EXPERIENCE_POINTS)))
            .andExpect(jsonPath("$.[*].crusadePoints").value(hasItem(DEFAULT_CRUSADE_POINTS)))
            .andExpect(jsonPath("$.[*].equipment").value(hasItem(DEFAULT_EQUIPMENT)))
            .andExpect(jsonPath("$.[*].psychicPowers").value(hasItem(DEFAULT_PSYCHIC_POWERS)))
            .andExpect(jsonPath("$.[*].warlordTraits").value(hasItem(DEFAULT_WARLORD_TRAITS)))
            .andExpect(jsonPath("$.[*].relics").value(hasItem(DEFAULT_RELICS)))
            .andExpect(jsonPath("$.[*].otherUpgrades").value(hasItem(DEFAULT_OTHER_UPGRADES)))
            .andExpect(jsonPath("$.[*].battlesPlayed").value(hasItem(DEFAULT_BATTLES_PLAYED)))
            .andExpect(jsonPath("$.[*].battlesSurvived").value(hasItem(DEFAULT_BATTLES_SURVIVED)))
            .andExpect(jsonPath("$.[*].rangedKills").value(hasItem(DEFAULT_RANGED_KILLS)))
            .andExpect(jsonPath("$.[*].meleeKills").value(hasItem(DEFAULT_MELEE_KILLS)))
            .andExpect(jsonPath("$.[*].psychicKills").value(hasItem(DEFAULT_PSYCHIC_KILLS)))
            .andExpect(jsonPath("$.[*].crusadeRank").value(hasItem(DEFAULT_CRUSADE_RANK.toString())))
            .andExpect(jsonPath("$.[*].battleHonours").value(hasItem(DEFAULT_BATTLE_HONOURS)))
            .andExpect(jsonPath("$.[*].battleScars").value(hasItem(DEFAULT_BATTLE_SCARS)));
    }

    @Test
    @Transactional
    public void getNinthArmyUnitMoment() throws Exception {
        // Initialize the database
        ninthArmyUnitMomentRepository.saveAndFlush(ninthArmyUnitMoment);

        // Get the ninthArmyUnitMoment
        restNinthArmyUnitMomentMockMvc.perform(get("/api/ninth-army-unit-moments/{id}", ninthArmyUnitMoment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ninthArmyUnitMoment.getId().intValue()))
            .andExpect(jsonPath("$.current").value(DEFAULT_CURRENT.booleanValue()))
            .andExpect(jsonPath("$.sinceInstant").value(DEFAULT_SINCE_INSTANT.toString()))
            .andExpect(jsonPath("$.pointsCost").value(DEFAULT_POINTS_COST))
            .andExpect(jsonPath("$.powerRating").value(DEFAULT_POWER_RATING))
            .andExpect(jsonPath("$.experiencePoints").value(DEFAULT_EXPERIENCE_POINTS))
            .andExpect(jsonPath("$.crusadePoints").value(DEFAULT_CRUSADE_POINTS))
            .andExpect(jsonPath("$.equipment").value(DEFAULT_EQUIPMENT))
            .andExpect(jsonPath("$.psychicPowers").value(DEFAULT_PSYCHIC_POWERS))
            .andExpect(jsonPath("$.warlordTraits").value(DEFAULT_WARLORD_TRAITS))
            .andExpect(jsonPath("$.relics").value(DEFAULT_RELICS))
            .andExpect(jsonPath("$.otherUpgrades").value(DEFAULT_OTHER_UPGRADES))
            .andExpect(jsonPath("$.battlesPlayed").value(DEFAULT_BATTLES_PLAYED))
            .andExpect(jsonPath("$.battlesSurvived").value(DEFAULT_BATTLES_SURVIVED))
            .andExpect(jsonPath("$.rangedKills").value(DEFAULT_RANGED_KILLS))
            .andExpect(jsonPath("$.meleeKills").value(DEFAULT_MELEE_KILLS))
            .andExpect(jsonPath("$.psychicKills").value(DEFAULT_PSYCHIC_KILLS))
            .andExpect(jsonPath("$.crusadeRank").value(DEFAULT_CRUSADE_RANK.toString()))
            .andExpect(jsonPath("$.battleHonours").value(DEFAULT_BATTLE_HONOURS))
            .andExpect(jsonPath("$.battleScars").value(DEFAULT_BATTLE_SCARS));
    }

    @Test
    @Transactional
    public void getNonExistingNinthArmyUnitMoment() throws Exception {
        // Get the ninthArmyUnitMoment
        restNinthArmyUnitMomentMockMvc.perform(get("/api/ninth-army-unit-moments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNinthArmyUnitMoment() throws Exception {
        // Initialize the database
        ninthArmyUnitMomentRepository.saveAndFlush(ninthArmyUnitMoment);

        int databaseSizeBeforeUpdate = ninthArmyUnitMomentRepository.findAll().size();

        // Update the ninthArmyUnitMoment
        NinthArmyUnitMoment updatedNinthArmyUnitMoment = ninthArmyUnitMomentRepository.findById(ninthArmyUnitMoment.getId()).get();
        // Disconnect from session so that the updates on updatedNinthArmyUnitMoment are not directly saved in db
        em.detach(updatedNinthArmyUnitMoment);
        updatedNinthArmyUnitMoment
            .current(UPDATED_CURRENT)
            .sinceInstant(UPDATED_SINCE_INSTANT)
            .pointsCost(UPDATED_POINTS_COST)
            .powerRating(UPDATED_POWER_RATING)
            .experiencePoints(UPDATED_EXPERIENCE_POINTS)
            .crusadePoints(UPDATED_CRUSADE_POINTS)
            .equipment(UPDATED_EQUIPMENT)
            .psychicPowers(UPDATED_PSYCHIC_POWERS)
            .warlordTraits(UPDATED_WARLORD_TRAITS)
            .relics(UPDATED_RELICS)
            .otherUpgrades(UPDATED_OTHER_UPGRADES)
            .battlesPlayed(UPDATED_BATTLES_PLAYED)
            .battlesSurvived(UPDATED_BATTLES_SURVIVED)
            .rangedKills(UPDATED_RANGED_KILLS)
            .meleeKills(UPDATED_MELEE_KILLS)
            .psychicKills(UPDATED_PSYCHIC_KILLS)
            .crusadeRank(UPDATED_CRUSADE_RANK)
            .battleHonours(UPDATED_BATTLE_HONOURS)
            .battleScars(UPDATED_BATTLE_SCARS);

        restNinthArmyUnitMomentMockMvc.perform(put("/api/ninth-army-unit-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNinthArmyUnitMoment)))
            .andExpect(status().isOk());

        // Validate the NinthArmyUnitMoment in the database
        List<NinthArmyUnitMoment> ninthArmyUnitMomentList = ninthArmyUnitMomentRepository.findAll();
        assertThat(ninthArmyUnitMomentList).hasSize(databaseSizeBeforeUpdate);
        NinthArmyUnitMoment testNinthArmyUnitMoment = ninthArmyUnitMomentList.get(ninthArmyUnitMomentList.size() - 1);
        assertThat(testNinthArmyUnitMoment.isCurrent()).isEqualTo(UPDATED_CURRENT);
        assertThat(testNinthArmyUnitMoment.getSinceInstant()).isEqualTo(UPDATED_SINCE_INSTANT);
        assertThat(testNinthArmyUnitMoment.getPointsCost()).isEqualTo(UPDATED_POINTS_COST);
        assertThat(testNinthArmyUnitMoment.getPowerRating()).isEqualTo(UPDATED_POWER_RATING);
        assertThat(testNinthArmyUnitMoment.getExperiencePoints()).isEqualTo(UPDATED_EXPERIENCE_POINTS);
        assertThat(testNinthArmyUnitMoment.getCrusadePoints()).isEqualTo(UPDATED_CRUSADE_POINTS);
        assertThat(testNinthArmyUnitMoment.getEquipment()).isEqualTo(UPDATED_EQUIPMENT);
        assertThat(testNinthArmyUnitMoment.getPsychicPowers()).isEqualTo(UPDATED_PSYCHIC_POWERS);
        assertThat(testNinthArmyUnitMoment.getWarlordTraits()).isEqualTo(UPDATED_WARLORD_TRAITS);
        assertThat(testNinthArmyUnitMoment.getRelics()).isEqualTo(UPDATED_RELICS);
        assertThat(testNinthArmyUnitMoment.getOtherUpgrades()).isEqualTo(UPDATED_OTHER_UPGRADES);
        assertThat(testNinthArmyUnitMoment.getBattlesPlayed()).isEqualTo(UPDATED_BATTLES_PLAYED);
        assertThat(testNinthArmyUnitMoment.getBattlesSurvived()).isEqualTo(UPDATED_BATTLES_SURVIVED);
        assertThat(testNinthArmyUnitMoment.getRangedKills()).isEqualTo(UPDATED_RANGED_KILLS);
        assertThat(testNinthArmyUnitMoment.getMeleeKills()).isEqualTo(UPDATED_MELEE_KILLS);
        assertThat(testNinthArmyUnitMoment.getPsychicKills()).isEqualTo(UPDATED_PSYCHIC_KILLS);
        assertThat(testNinthArmyUnitMoment.getCrusadeRank()).isEqualTo(UPDATED_CRUSADE_RANK);
        assertThat(testNinthArmyUnitMoment.getBattleHonours()).isEqualTo(UPDATED_BATTLE_HONOURS);
        assertThat(testNinthArmyUnitMoment.getBattleScars()).isEqualTo(UPDATED_BATTLE_SCARS);
    }

    @Test
    @Transactional
    public void updateNonExistingNinthArmyUnitMoment() throws Exception {
        int databaseSizeBeforeUpdate = ninthArmyUnitMomentRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNinthArmyUnitMomentMockMvc.perform(put("/api/ninth-army-unit-moments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ninthArmyUnitMoment)))
            .andExpect(status().isBadRequest());

        // Validate the NinthArmyUnitMoment in the database
        List<NinthArmyUnitMoment> ninthArmyUnitMomentList = ninthArmyUnitMomentRepository.findAll();
        assertThat(ninthArmyUnitMomentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNinthArmyUnitMoment() throws Exception {
        // Initialize the database
        ninthArmyUnitMomentRepository.saveAndFlush(ninthArmyUnitMoment);

        int databaseSizeBeforeDelete = ninthArmyUnitMomentRepository.findAll().size();

        // Delete the ninthArmyUnitMoment
        restNinthArmyUnitMomentMockMvc.perform(delete("/api/ninth-army-unit-moments/{id}", ninthArmyUnitMoment.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NinthArmyUnitMoment> ninthArmyUnitMomentList = ninthArmyUnitMomentRepository.findAll();
        assertThat(ninthArmyUnitMomentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
