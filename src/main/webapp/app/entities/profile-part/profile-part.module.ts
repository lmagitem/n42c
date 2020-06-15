import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { ProfilePartComponent } from './profile-part.component';
import { ProfilePartDetailComponent } from './profile-part-detail.component';
import { ProfilePartUpdateComponent } from './profile-part-update.component';
import { ProfilePartDeleteDialogComponent } from './profile-part-delete-dialog.component';
import { profilePartRoute } from './profile-part.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(profilePartRoute)],
  declarations: [ProfilePartComponent, ProfilePartDetailComponent, ProfilePartUpdateComponent, ProfilePartDeleteDialogComponent],
  entryComponents: [ProfilePartDeleteDialogComponent],
})
export class N42CProfilePartModule {}
