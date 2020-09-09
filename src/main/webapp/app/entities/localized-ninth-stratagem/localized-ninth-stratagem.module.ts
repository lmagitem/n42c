import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { LocalizedNinthStratagemComponent } from './localized-ninth-stratagem.component';
import { LocalizedNinthStratagemDetailComponent } from './localized-ninth-stratagem-detail.component';
import { LocalizedNinthStratagemUpdateComponent } from './localized-ninth-stratagem-update.component';
import { LocalizedNinthStratagemDeleteDialogComponent } from './localized-ninth-stratagem-delete-dialog.component';
import { localizedNinthStratagemRoute } from './localized-ninth-stratagem.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(localizedNinthStratagemRoute)],
  declarations: [
    LocalizedNinthStratagemComponent,
    LocalizedNinthStratagemDetailComponent,
    LocalizedNinthStratagemUpdateComponent,
    LocalizedNinthStratagemDeleteDialogComponent,
  ],
  entryComponents: [LocalizedNinthStratagemDeleteDialogComponent],
})
export class N42CLocalizedNinthStratagemModule {}
