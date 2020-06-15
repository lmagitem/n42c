import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { ProfilePartSkillComponent } from './profile-part-skill.component';
import { ProfilePartSkillDetailComponent } from './profile-part-skill-detail.component';
import { ProfilePartSkillUpdateComponent } from './profile-part-skill-update.component';
import { ProfilePartSkillDeleteDialogComponent } from './profile-part-skill-delete-dialog.component';
import { profilePartSkillRoute } from './profile-part-skill.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(profilePartSkillRoute)],
  declarations: [
    ProfilePartSkillComponent,
    ProfilePartSkillDetailComponent,
    ProfilePartSkillUpdateComponent,
    ProfilePartSkillDeleteDialogComponent,
  ],
  entryComponents: [ProfilePartSkillDeleteDialogComponent],
})
export class N42CProfilePartSkillModule {}
