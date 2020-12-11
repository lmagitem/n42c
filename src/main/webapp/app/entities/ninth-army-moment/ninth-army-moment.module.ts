import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {N42CSharedModule} from 'app/shared/shared.module';
import {NinthArmyMomentComponent} from './ninth-army-moment.component';
import {NinthArmyMomentDetailComponent} from './ninth-army-moment-detail.component';
import {NinthArmyMomentUpdateComponent} from './ninth-army-moment-update.component';
import {NinthArmyMomentDeleteDialogComponent} from './ninth-army-moment-delete-dialog.component';
import {ninthArmyMomentRoute} from './ninth-army-moment.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(ninthArmyMomentRoute)],
  declarations: [
    NinthArmyMomentComponent,
    NinthArmyMomentDetailComponent,
    NinthArmyMomentUpdateComponent,
    NinthArmyMomentDeleteDialogComponent,
  ],
  entryComponents: [NinthArmyMomentDeleteDialogComponent],
})
export class N42CNinthArmyMomentModule {}
