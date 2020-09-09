import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { NinthObjectiveComponent } from './ninth-objective.component';
import { NinthObjectiveDetailComponent } from './ninth-objective-detail.component';
import { NinthObjectiveUpdateComponent } from './ninth-objective-update.component';
import { NinthObjectiveDeleteDialogComponent } from './ninth-objective-delete-dialog.component';
import { ninthObjectiveRoute } from './ninth-objective.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(ninthObjectiveRoute)],
  declarations: [
    NinthObjectiveComponent,
    NinthObjectiveDetailComponent,
    NinthObjectiveUpdateComponent,
    NinthObjectiveDeleteDialogComponent,
  ],
  entryComponents: [NinthObjectiveDeleteDialogComponent],
})
export class N42CNinthObjectiveModule {}
