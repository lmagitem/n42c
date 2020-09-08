import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { LocalizedNinthMissionComponent } from './localized-ninth-mission.component';
import { LocalizedNinthMissionDetailComponent } from './localized-ninth-mission-detail.component';
import { LocalizedNinthMissionUpdateComponent } from './localized-ninth-mission-update.component';
import { LocalizedNinthMissionDeleteDialogComponent } from './localized-ninth-mission-delete-dialog.component';
import { localizedNinthMissionRoute } from './localized-ninth-mission.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(localizedNinthMissionRoute)],
  declarations: [
    LocalizedNinthMissionComponent,
    LocalizedNinthMissionDetailComponent,
    LocalizedNinthMissionUpdateComponent,
    LocalizedNinthMissionDeleteDialogComponent,
  ],
  entryComponents: [LocalizedNinthMissionDeleteDialogComponent],
})
export class N42CLocalizedNinthMissionModule {}
