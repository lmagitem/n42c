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
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class N42CEntityModule {}
