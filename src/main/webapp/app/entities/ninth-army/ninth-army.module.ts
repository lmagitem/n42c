import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { NinthArmyComponent } from './ninth-army.component';
import { NinthArmyDetailComponent } from './ninth-army-detail.component';
import { NinthArmyUpdateComponent } from './ninth-army-update.component';
import { NinthArmyDeleteDialogComponent } from './ninth-army-delete-dialog.component';
import { ninthArmyRoute } from './ninth-army.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(ninthArmyRoute)],
  declarations: [NinthArmyComponent, NinthArmyDetailComponent, NinthArmyUpdateComponent, NinthArmyDeleteDialogComponent],
  entryComponents: [NinthArmyDeleteDialogComponent],
})
export class N42CNinthArmyModule {}
