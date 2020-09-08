import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { LocalizedNinthObjectiveComponent } from './localized-ninth-objective.component';
import { LocalizedNinthObjectiveDetailComponent } from './localized-ninth-objective-detail.component';
import { LocalizedNinthObjectiveUpdateComponent } from './localized-ninth-objective-update.component';
import { LocalizedNinthObjectiveDeleteDialogComponent } from './localized-ninth-objective-delete-dialog.component';
import { localizedNinthObjectiveRoute } from './localized-ninth-objective.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(localizedNinthObjectiveRoute)],
  declarations: [
    LocalizedNinthObjectiveComponent,
    LocalizedNinthObjectiveDetailComponent,
    LocalizedNinthObjectiveUpdateComponent,
    LocalizedNinthObjectiveDeleteDialogComponent,
  ],
  entryComponents: [LocalizedNinthObjectiveDeleteDialogComponent],
})
export class N42CLocalizedNinthObjectiveModule {}
