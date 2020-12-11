package com.n42c.config;

import com.n42c.domain.LocalizedBlogPost;
import io.github.jhipster.config.JHipsterProperties;
import io.github.jhipster.config.cache.PrefixedKeyGenerator;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ExpiryPolicyBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
@EnableCaching
public class CacheConfiguration {
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;
    private GitProperties gitProperties;
    private BuildProperties buildProperties;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.n42c.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.n42c.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.n42c.domain.User.class.getName());
            createCache(cm, com.n42c.domain.Authority.class.getName());
            createCache(cm, com.n42c.domain.User.class.getName() + ".authorities");
            createCache(cm, com.n42c.domain.AppUser.class.getName());
            createCache(cm, com.n42c.domain.AppUser.class.getName() + ".blogPosts");
            createCache(cm, com.n42c.domain.AppUser.class.getName() + ".appUserProfiles");
            createCache(cm, com.n42c.domain.BlogPost.class.getName());
            createCache(cm, com.n42c.domain.BlogPost.class.getName() + ".blogCategories");
            createCache(cm, com.n42c.domain.BlogCategory.class.getName());
            createCache(cm, com.n42c.domain.BlogCategory.class.getName() + ".blogCategories");
            createCache(cm, com.n42c.domain.AppUserProfile.class.getName());
            createCache(cm, com.n42c.domain.AppUserProfile.class.getName() + ".profileParts");
            createCache(cm, com.n42c.domain.ProfilePart.class.getName());
            createCache(cm, com.n42c.domain.ProfilePart.class.getName() + ".profilePartSimpleItems");
            createCache(cm, com.n42c.domain.ProfilePart.class.getName() + ".profilePartPreciseItems");
            createCache(cm, com.n42c.domain.ProfilePart.class.getName() + ".profilePartSkillCategories");
            createCache(cm, com.n42c.domain.ProfilePartSimpleItem.class.getName());
            createCache(cm, com.n42c.domain.ProfilePartPreciseItem.class.getName());
            createCache(cm, com.n42c.domain.ProfilePartPreciseItem.class.getName() + ".profilePartLinkedExperiences");
            createCache(cm, com.n42c.domain.ProfilePartLinkedExperience.class.getName());
            createCache(cm, com.n42c.domain.ProfilePartLinkedExperience.class.getName() + ".linkedExperiences");
            createCache(cm, com.n42c.domain.ProfilePartSkillCategory.class.getName());
            createCache(cm, com.n42c.domain.ProfilePartSkillCategory.class.getName() + ".profilePartSkills");
            createCache(cm, com.n42c.domain.ProfilePartSkill.class.getName());
            createCache(cm, com.n42c.domain.ProfilePartSkill.class.getName() + ".linkedSkills");
            createCache(cm, com.n42c.domain.AppUser.class.getName() + ".blogs");
            createCache(cm, com.n42c.domain.AppUser.class.getName() + ".profiles");
            createCache(cm, com.n42c.domain.AppUser.class.getName() + ".givenFriendships");
            createCache(cm, com.n42c.domain.AppUser.class.getName() + ".askedFriendRequests");
            createCache(cm, com.n42c.domain.AppUser.class.getName() + ".receivedFriendships");
            createCache(cm, com.n42c.domain.AppUser.class.getName() + ".pendingFriendRequests");
            createCache(cm, com.n42c.domain.AppUser.class.getName() + ".products");
            createCache(cm, com.n42c.domain.AppUser.class.getName() + ".posts");
            createCache(cm, com.n42c.domain.Shop.class.getName());
            createCache(cm, com.n42c.domain.Shop.class.getName() + ".products");
            createCache(cm, com.n42c.domain.Product.class.getName());
            createCache(cm, com.n42c.domain.Product.class.getName() + ".localizations");
            createCache(cm, com.n42c.domain.Product.class.getName() + ".authors");
            createCache(cm, com.n42c.domain.LocalizedProduct.class.getName());
            createCache(cm, com.n42c.domain.Blog.class.getName());
            createCache(cm, com.n42c.domain.Blog.class.getName() + ".posts");
            createCache(cm, com.n42c.domain.BlogPost.class.getName() + ".localizations");
            createCache(cm, com.n42c.domain.BlogPost.class.getName() + ".authors");
            createCache(cm, com.n42c.domain.BlogPost.class.getName() + ".categories");
            createCache(cm, LocalizedBlogPost.class.getName());
            createCache(cm, com.n42c.domain.BlogCategory.class.getName() + ".subcategories");
            createCache(cm, com.n42c.domain.BlogCategory.class.getName() + ".localizations");
            createCache(cm, com.n42c.domain.BlogCategory.class.getName() + ".posts");
            createCache(cm, com.n42c.domain.LocalizedBlogCategory.class.getName());
            createCache(cm, com.n42c.domain.ProfilePart.class.getName() + ".simpleItems");
            createCache(cm, com.n42c.domain.ProfilePart.class.getName() + ".preciseItems");
            createCache(cm, com.n42c.domain.ProfilePart.class.getName() + ".skillCategories");
            createCache(cm, com.n42c.domain.ProfilePartPreciseItem.class.getName() + ".experiences");
            createCache(cm, com.n42c.domain.ProfilePartSkillCategory.class.getName() + ".skills");
            createCache(cm, com.n42c.domain.Player.class.getName());
            createCache(cm, com.n42c.domain.Player.class.getName() + ".lists");
            createCache(cm, com.n42c.domain.Player.class.getName() + ".collections");
            createCache(cm, com.n42c.domain.Player.class.getName() + ".stratagemGroups");
            createCache(cm, com.n42c.domain.Player.class.getName() + ".authoredCampaigns");
            createCache(cm, com.n42c.domain.Player.class.getName() + ".campaigns");
            createCache(cm, com.n42c.domain.NinthCampaign.class.getName());
            createCache(cm, com.n42c.domain.NinthCampaign.class.getName() + ".events");
            createCache(cm, com.n42c.domain.NinthCampaign.class.getName() + ".authors");
            createCache(cm, com.n42c.domain.NinthCampaign.class.getName() + ".participants");
            createCache(cm, com.n42c.domain.NinthCampaign.class.getName() + ".campaignStratagems");
            createCache(cm, com.n42c.domain.NinthCampaignMoment.class.getName());
            createCache(cm, com.n42c.domain.NinthCampaignMoment.class.getName() + ".battles");
            createCache(cm, com.n42c.domain.NinthBattle.class.getName());
            createCache(cm, com.n42c.domain.NinthBattle.class.getName() + ".armies");
            createCache(cm, com.n42c.domain.NinthArmy.class.getName());
            createCache(cm, com.n42c.domain.NinthArmy.class.getName() + ".units");
            createCache(cm, com.n42c.domain.NinthArmy.class.getName() + ".moments");
            createCache(cm, com.n42c.domain.NinthArmyMoment.class.getName());
            createCache(cm, com.n42c.domain.NinthArmyMoment.class.getName() + ".selectedUnits");
            createCache(cm, com.n42c.domain.NinthArmyMoment.class.getName() + ".selectedObjectives");
            createCache(cm, com.n42c.domain.NinthArmyUnit.class.getName());
            createCache(cm, com.n42c.domain.NinthArmyUnit.class.getName() + ".moments");
            createCache(cm, com.n42c.domain.NinthArmyUnit.class.getName() + ".selections");
            createCache(cm, com.n42c.domain.NinthArmyUnitMoment.class.getName());
            createCache(cm, com.n42c.domain.NinthUnit.class.getName());
            createCache(cm, com.n42c.domain.NinthUnit.class.getName() + ".selections");
            createCache(cm, com.n42c.domain.NinthUnit.class.getName() + ".moments");
            createCache(cm, com.n42c.domain.NinthUnitMoment.class.getName());
            createCache(cm, com.n42c.domain.NinthMission.class.getName());
            createCache(cm, com.n42c.domain.NinthMission.class.getName() + ".battles");
            createCache(cm, com.n42c.domain.NinthMission.class.getName() + ".localizations");
            createCache(cm, com.n42c.domain.NinthMission.class.getName() + ".missionStratagems");
            createCache(cm, com.n42c.domain.NinthMission.class.getName() + ".primaryObjectives");
            createCache(cm, com.n42c.domain.NinthMission.class.getName() + ".allowedSecondaries");
            createCache(cm, com.n42c.domain.NinthMission.class.getName() + ".rules");
            createCache(cm, com.n42c.domain.NinthMission.class.getName() + ".missionDeployments");
            createCache(cm, com.n42c.domain.LocalizedNinthMission.class.getName());
            createCache(cm, com.n42c.domain.NinthDeploymentMap.class.getName());
            createCache(cm, com.n42c.domain.NinthDeploymentMap.class.getName() + ".localizations");
            createCache(cm, com.n42c.domain.NinthDeploymentMap.class.getName() + ".usedInMissions");
            createCache(cm, com.n42c.domain.LocalizedNinthDeploymentMap.class.getName());
            createCache(cm, com.n42c.domain.NinthMissionRule.class.getName());
            createCache(cm, com.n42c.domain.NinthMissionRule.class.getName() + ".localizations");
            createCache(cm, com.n42c.domain.NinthMissionRule.class.getName() + ".missions");
            createCache(cm, com.n42c.domain.LocalizedNinthMissionRule.class.getName());
            createCache(cm, com.n42c.domain.NinthStratagemGroup.class.getName());
            createCache(cm, com.n42c.domain.NinthStratagemGroup.class.getName() + ".localizations");
            createCache(cm, com.n42c.domain.NinthStratagemGroup.class.getName() + ".stratagems");
            createCache(cm, com.n42c.domain.NinthStratagemGroup.class.getName() + ".campaigns");
            createCache(cm, com.n42c.domain.NinthStratagemGroup.class.getName() + ".missions");
            createCache(cm, com.n42c.domain.LocalizedNinthStratagemGroup.class.getName());
            createCache(cm, com.n42c.domain.NinthStratagem.class.getName());
            createCache(cm, com.n42c.domain.NinthStratagem.class.getName() + ".localizations");
            createCache(cm, com.n42c.domain.LocalizedNinthStratagem.class.getName());
            createCache(cm, com.n42c.domain.NinthObjective.class.getName());
            createCache(cm, com.n42c.domain.NinthObjective.class.getName() + ".localizations");
            createCache(cm, com.n42c.domain.NinthObjective.class.getName() + ".selections");
            createCache(cm, com.n42c.domain.NinthObjective.class.getName() + ".allowedAsPrimaries");
            createCache(cm, com.n42c.domain.NinthObjective.class.getName() + ".allowedAsSecondaries");
            createCache(cm, com.n42c.domain.LocalizedNinthObjective.class.getName());
            createCache(cm, com.n42c.domain.LocalizedBlog.class.getName());
            createCache(cm, com.n42c.domain.Blog.class.getName() + ".localizations");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
