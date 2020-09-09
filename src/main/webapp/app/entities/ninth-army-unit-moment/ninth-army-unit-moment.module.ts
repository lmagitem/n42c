import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { NinthArmyUnitMomentComponent } from './ninth-army-unit-moment.component';
import { NinthArmyUnitMomentDetailComponent } from './ninth-army-unit-moment-detail.component';
import { NinthArmyUnitMomentUpdateComponent } from './ninth-army-unit-moment-update.component';
import { NinthArmyUnitMomentDeleteDialogComponent } from './ninth-army-unit-moment-delete-dialog.component';
import { ninthArmyUnitMomentRoute } from './ninth-army-unit-moment.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(ninthArmyUnitMomentRoute)],
  declarations: [
    NinthArmyUnitMomentComponent,
    NinthArmyUnitMomentDetailComponent,
    NinthArmyUnitMomentUpdateComponent,
    NinthArmyUnitMomentDeleteDialogComponent,
  ],
  entryComponents: [NinthArmyUnitMomentDeleteDialogComponent],
})
export class N42CNinthArmyUnitMomentModule {}
