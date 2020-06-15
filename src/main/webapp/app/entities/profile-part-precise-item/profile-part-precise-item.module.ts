import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { ProfilePartPreciseItemComponent } from './profile-part-precise-item.component';
import { ProfilePartPreciseItemDetailComponent } from './profile-part-precise-item-detail.component';
import { ProfilePartPreciseItemUpdateComponent } from './profile-part-precise-item-update.component';
import { ProfilePartPreciseItemDeleteDialogComponent } from './profile-part-precise-item-delete-dialog.component';
import { profilePartPreciseItemRoute } from './profile-part-precise-item.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(profilePartPreciseItemRoute)],
  declarations: [
    ProfilePartPreciseItemComponent,
    ProfilePartPreciseItemDetailComponent,
    ProfilePartPreciseItemUpdateComponent,
    ProfilePartPreciseItemDeleteDialogComponent,
  ],
  entryComponents: [ProfilePartPreciseItemDeleteDialogComponent],
})
export class N42CProfilePartPreciseItemModule {}
