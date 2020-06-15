import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { ProfilePartSkillCategoryComponent } from './profile-part-skill-category.component';
import { ProfilePartSkillCategoryDetailComponent } from './profile-part-skill-category-detail.component';
import { ProfilePartSkillCategoryUpdateComponent } from './profile-part-skill-category-update.component';
import { ProfilePartSkillCategoryDeleteDialogComponent } from './profile-part-skill-category-delete-dialog.component';
import { profilePartSkillCategoryRoute } from './profile-part-skill-category.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(profilePartSkillCategoryRoute)],
  declarations: [
    ProfilePartSkillCategoryComponent,
    ProfilePartSkillCategoryDetailComponent,
    ProfilePartSkillCategoryUpdateComponent,
    ProfilePartSkillCategoryDeleteDialogComponent,
  ],
  entryComponents: [ProfilePartSkillCategoryDeleteDialogComponent],
})
export class N42CProfilePartSkillCategoryModule {}
