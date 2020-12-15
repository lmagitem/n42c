import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {N42CSharedModule} from 'app/shared/shared.module';
import {NinthArmyUnitComponent} from './ninth-army-unit.component';
import {NinthArmyUnitDetailComponent} from './ninth-army-unit-detail.component';
import {NinthArmyUnitUpdateComponent} from './ninth-army-unit-update.component';
import {NinthArmyUnitDeleteDialogComponent} from './ninth-army-unit-delete-dialog.component';
import {ninthArmyUnitRoute} from './ninth-army-unit.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(ninthArmyUnitRoute)],
  declarations: [NinthArmyUnitComponent, NinthArmyUnitDetailComponent, NinthArmyUnitUpdateComponent, NinthArmyUnitDeleteDialogComponent],
  entryComponents: [NinthArmyUnitDeleteDialogComponent],
})
export class N42CNinthArmyUnitModule {}
