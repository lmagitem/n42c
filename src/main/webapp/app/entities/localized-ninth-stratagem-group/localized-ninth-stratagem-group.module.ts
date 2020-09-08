import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { LocalizedNinthStratagemGroupComponent } from './localized-ninth-stratagem-group.component';
import { LocalizedNinthStratagemGroupDetailComponent } from './localized-ninth-stratagem-group-detail.component';
import { LocalizedNinthStratagemGroupUpdateComponent } from './localized-ninth-stratagem-group-update.component';
import { LocalizedNinthStratagemGroupDeleteDialogComponent } from './localized-ninth-stratagem-group-delete-dialog.component';
import { localizedNinthStratagemGroupRoute } from './localized-ninth-stratagem-group.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(localizedNinthStratagemGroupRoute)],
  declarations: [
    LocalizedNinthStratagemGroupComponent,
    LocalizedNinthStratagemGroupDetailComponent,
    LocalizedNinthStratagemGroupUpdateComponent,
    LocalizedNinthStratagemGroupDeleteDialogComponent,
  ],
  entryComponents: [LocalizedNinthStratagemGroupDeleteDialogComponent],
})
export class N42CLocalizedNinthStratagemGroupModule {}
