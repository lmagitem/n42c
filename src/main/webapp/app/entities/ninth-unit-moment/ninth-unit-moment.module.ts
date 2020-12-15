import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {N42CSharedModule} from 'app/shared/shared.module';
import {NinthUnitMomentComponent} from './ninth-unit-moment.component';
import {NinthUnitMomentDetailComponent} from './ninth-unit-moment-detail.component';
import {NinthUnitMomentUpdateComponent} from './ninth-unit-moment-update.component';
import {NinthUnitMomentDeleteDialogComponent} from './ninth-unit-moment-delete-dialog.component';
import {ninthUnitMomentRoute} from './ninth-unit-moment.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(ninthUnitMomentRoute)],
  declarations: [
    NinthUnitMomentComponent,
    NinthUnitMomentDetailComponent,
    NinthUnitMomentUpdateComponent,
    NinthUnitMomentDeleteDialogComponent,
  ],
  entryComponents: [NinthUnitMomentDeleteDialogComponent],
})
export class N42CNinthUnitMomentModule {}
