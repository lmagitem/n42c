import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { NinthStratagemComponent } from './ninth-stratagem.component';
import { NinthStratagemDetailComponent } from './ninth-stratagem-detail.component';
import { NinthStratagemUpdateComponent } from './ninth-stratagem-update.component';
import { NinthStratagemDeleteDialogComponent } from './ninth-stratagem-delete-dialog.component';
import { ninthStratagemRoute } from './ninth-stratagem.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(ninthStratagemRoute)],
  declarations: [
    NinthStratagemComponent,
    NinthStratagemDetailComponent,
    NinthStratagemUpdateComponent,
    NinthStratagemDeleteDialogComponent,
  ],
  entryComponents: [NinthStratagemDeleteDialogComponent],
})
export class N42CNinthStratagemModule {}
