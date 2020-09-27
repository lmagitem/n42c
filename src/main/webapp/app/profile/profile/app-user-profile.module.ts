import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {N42CSharedModule} from 'app/shared/shared.module';
import {AppUserProfileComponent} from './app-user-profile.component';
import {AppUserProfileDetailComponent} from './app-user-profile-detail.component';
import {AppUserProfileUpdateComponent} from './app-user-profile-update.component';
import {AppUserProfileDeleteDialogComponent} from './app-user-profile-delete-dialog.component';
import {appUserProfileRoute} from './app-user-profile.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(appUserProfileRoute)],
  declarations: [
    AppUserProfileComponent,
    AppUserProfileDetailComponent,
    AppUserProfileUpdateComponent,
    AppUserProfileDeleteDialogComponent,
  ],
  entryComponents: [AppUserProfileDeleteDialogComponent],
})
export class ProfileModule {
}
