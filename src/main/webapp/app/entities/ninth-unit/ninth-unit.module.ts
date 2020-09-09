import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { NinthUnitComponent } from './ninth-unit.component';
import { NinthUnitDetailComponent } from './ninth-unit-detail.component';
import { NinthUnitUpdateComponent } from './ninth-unit-update.component';
import { NinthUnitDeleteDialogComponent } from './ninth-unit-delete-dialog.component';
import { ninthUnitRoute } from './ninth-unit.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(ninthUnitRoute)],
  declarations: [NinthUnitComponent, NinthUnitDetailComponent, NinthUnitUpdateComponent, NinthUnitDeleteDialogComponent],
  entryComponents: [NinthUnitDeleteDialogComponent],
})
export class N42CNinthUnitModule {}
