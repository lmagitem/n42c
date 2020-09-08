import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { NinthMissionComponent } from './ninth-mission.component';
import { NinthMissionDetailComponent } from './ninth-mission-detail.component';
import { NinthMissionUpdateComponent } from './ninth-mission-update.component';
import { NinthMissionDeleteDialogComponent } from './ninth-mission-delete-dialog.component';
import { ninthMissionRoute } from './ninth-mission.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(ninthMissionRoute)],
  declarations: [NinthMissionComponent, NinthMissionDetailComponent, NinthMissionUpdateComponent, NinthMissionDeleteDialogComponent],
  entryComponents: [NinthMissionDeleteDialogComponent],
})
export class N42CNinthMissionModule {}
