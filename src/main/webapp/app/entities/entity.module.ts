import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'app-user',
        loadChildren: () => import('./app-user/app-user.module').then(m => m.N42CAppUserModule),
      },
      {
        path: 'blog-post',
        loadChildren: () => import('./blog-post/blog-post.module').then(m => m.N42CBlogPostModule),
      },
      {
        path: 'blog-category',
        loadChildren: () => import('./blog-category/blog-category.module').then(m => m.N42CBlogCategoryModule),
      },
      {
        path: 'app-user-profile',
        loadChildren: () => import('./app-user-profile/app-user-profile.module').then(m => m.N42CAppUserProfileModule),
      },
      {
        path: 'profile-part',
        loadChildren: () => import('./profile-part/profile-part.module').then(m => m.N42CProfilePartModule),
      },
      {
        path: 'profile-part-simple-item',
        loadChildren: () =>
          import('./profile-part-simple-item/profile-part-simple-item.module').then(m => m.N42CProfilePartSimpleItemModule),
      },
      {
        path: 'profile-part-precise-item',
        loadChildren: () =>
          import('./profile-part-precise-item/profile-part-precise-item.module').then(m => m.N42CProfilePartPreciseItemModule),
      },
      {
        path: 'profile-part-linked-experience',
        loadChildren: () =>
          import('./profile-part-linked-experience/profile-part-linked-experience.module').then(
            m => m.N42CProfilePartLinkedExperienceModule
          ),
      },
      {
        path: 'profile-part-skill-category',
        loadChildren: () =>
          import('./profile-part-skill-category/profile-part-skill-category.module').then(m => m.N42CProfilePartSkillCategoryModule),
      },
      {
        path: 'profile-part-skill',
        loadChildren: () => import('./profile-part-skill/profile-part-skill.module').then(m => m.N42CProfilePartSkillModule),
      },
      {
        path: 'shop',
        loadChildren: () => import('./shop/shop.module').then(m => m.N42CShopModule),
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.N42CProductModule),
      },
      {
        path: 'localized-product',
        loadChildren: () => import('./localized-product/localized-product.module').then(m => m.N42CLocalizedProductModule),
      },
      {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then(m => m.N42CBlogModule),
      },
      {
        path: 'localized-post-content',
        loadChildren: () => import('./localized-post-content/localized-post-content.module').then(m => m.N42CLocalizedPostContentModule),
      },
      {
        path: 'localized-blog-category',
        loadChildren: () => import('./localized-blog-category/localized-blog-category.module').then(m => m.N42CLocalizedBlogCategoryModule),
      },
      {
        path: 'player',
        loadChildren: () => import('./player/player.module').then(m => m.N42CPlayerModule),
      },
      {
        path: 'ninth-campaign',
        loadChildren: () => import('./ninth-campaign/ninth-campaign.module').then(m => m.N42CNinthCampaignModule),
      },
      {
        path: 'ninth-campaign-moment',
        loadChildren: () => import('./ninth-campaign-moment/ninth-campaign-moment.module').then(m => m.N42CNinthCampaignMomentModule),
      },
      {
        path: 'ninth-battle',
        loadChildren: () => import('./ninth-battle/ninth-battle.module').then(m => m.N42CNinthBattleModule),
      },
      {
        path: 'ninth-army',
        loadChildren: () => import('./ninth-army/ninth-army.module').then(m => m.N42CNinthArmyModule),
      },
      {
        path: 'ninth-army-moment',
        loadChildren: () => import('./ninth-army-moment/ninth-army-moment.module').then(m => m.N42CNinthArmyMomentModule),
      },
      {
        path: 'ninth-army-unit',
        loadChildren: () => import('./ninth-army-unit/ninth-army-unit.module').then(m => m.N42CNinthArmyUnitModule),
      },
      {
        path: 'ninth-army-unit-moment',
        loadChildren: () => import('./ninth-army-unit-moment/ninth-army-unit-moment.module').then(m => m.N42CNinthArmyUnitMomentModule),
      },
      {
        path: 'ninth-unit',
        loadChildren: () => import('./ninth-unit/ninth-unit.module').then(m => m.N42CNinthUnitModule),
      },
      {
        path: 'ninth-unit-moment',
        loadChildren: () => import('./ninth-unit-moment/ninth-unit-moment.module').then(m => m.N42CNinthUnitMomentModule),
      },
      {
        path: 'ninth-mission',
        loadChildren: () => import('./ninth-mission/ninth-mission.module').then(m => m.N42CNinthMissionModule),
      },
      {
        path: 'localized-ninth-mission',
        loadChildren: () => import('./localized-ninth-mission/localized-ninth-mission.module').then(m => m.N42CLocalizedNinthMissionModule),
      },
      {
        path: 'ninth-deployment-map',
        loadChildren: () => import('./ninth-deployment-map/ninth-deployment-map.module').then(m => m.N42CNinthDeploymentMapModule),
      },
      {
        path: 'localized-ninth-deployment-map',
        loadChildren: () =>
          import('./localized-ninth-deployment-map/localized-ninth-deployment-map.module').then(
            m => m.N42CLocalizedNinthDeploymentMapModule
          ),
      },
      {
        path: 'ninth-mission-rule',
        loadChildren: () => import('./ninth-mission-rule/ninth-mission-rule.module').then(m => m.N42CNinthMissionRuleModule),
      },
      {
        path: 'localized-ninth-mission-rule',
        loadChildren: () =>
          import('./localized-ninth-mission-rule/localized-ninth-mission-rule.module').then(m => m.N42CLocalizedNinthMissionRuleModule),
      },
      {
        path: 'ninth-stratagem-group',
        loadChildren: () => import('./ninth-stratagem-group/ninth-stratagem-group.module').then(m => m.N42CNinthStratagemGroupModule),
      },
      {
        path: 'localized-ninth-stratagem-group',
        loadChildren: () =>
          import('./localized-ninth-stratagem-group/localized-ninth-stratagem-group.module').then(
            m => m.N42CLocalizedNinthStratagemGroupModule
          ),
      },
      {
        path: 'ninth-stratagem',
        loadChildren: () => import('./ninth-stratagem/ninth-stratagem.module').then(m => m.N42CNinthStratagemModule),
      },
      {
        path: 'localized-ninth-stratagem',
        loadChildren: () =>
          import('./localized-ninth-stratagem/localized-ninth-stratagem.module').then(m => m.N42CLocalizedNinthStratagemModule),
      },
      {
        path: 'ninth-objective',
        loadChildren: () => import('./ninth-objective/ninth-objective.module').then(m => m.N42CNinthObjectiveModule),
      },
      {
        path: 'localized-ninth-objective',
        loadChildren: () =>
          import('./localized-ninth-objective/localized-ninth-objective.module').then(m => m.N42CLocalizedNinthObjectiveModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class N42CEntityModule {}
