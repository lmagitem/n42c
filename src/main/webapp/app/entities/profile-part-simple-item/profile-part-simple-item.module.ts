import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { ProfilePartSimpleItemComponent } from './profile-part-simple-item.component';
import { ProfilePartSimpleItemDetailComponent } from './profile-part-simple-item-detail.component';
import { ProfilePartSimpleItemUpdateComponent } from './profile-part-simple-item-update.component';
import { ProfilePartSimpleItemDeleteDialogComponent } from './profile-part-simple-item-delete-dialog.component';
import { profilePartSimpleItemRoute } from './profile-part-simple-item.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(profilePartSimpleItemRoute)],
  declarations: [
    ProfilePartSimpleItemComponent,
    ProfilePartSimpleItemDetailComponent,
    ProfilePartSimpleItemUpdateComponent,
    ProfilePartSimpleItemDeleteDialogComponent,
  ],
  entryComponents: [ProfilePartSimpleItemDeleteDialogComponent],
})
export class N42CProfilePartSimpleItemModule {}
