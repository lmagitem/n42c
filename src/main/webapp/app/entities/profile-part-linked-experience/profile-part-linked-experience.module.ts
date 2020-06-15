import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { ProfilePartLinkedExperienceComponent } from './profile-part-linked-experience.component';
import { ProfilePartLinkedExperienceDetailComponent } from './profile-part-linked-experience-detail.component';
import { ProfilePartLinkedExperienceUpdateComponent } from './profile-part-linked-experience-update.component';
import { ProfilePartLinkedExperienceDeleteDialogComponent } from './profile-part-linked-experience-delete-dialog.component';
import { profilePartLinkedExperienceRoute } from './profile-part-linked-experience.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(profilePartLinkedExperienceRoute)],
  declarations: [
    ProfilePartLinkedExperienceComponent,
    ProfilePartLinkedExperienceDetailComponent,
    ProfilePartLinkedExperienceUpdateComponent,
    ProfilePartLinkedExperienceDeleteDialogComponent,
  ],
  entryComponents: [ProfilePartLinkedExperienceDeleteDialogComponent],
})
export class N42CProfilePartLinkedExperienceModule {}
