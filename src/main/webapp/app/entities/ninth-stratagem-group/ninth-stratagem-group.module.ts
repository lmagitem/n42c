import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { NinthStratagemGroupComponent } from './ninth-stratagem-group.component';
import { NinthStratagemGroupDetailComponent } from './ninth-stratagem-group-detail.component';
import { NinthStratagemGroupUpdateComponent } from './ninth-stratagem-group-update.component';
import { NinthStratagemGroupDeleteDialogComponent } from './ninth-stratagem-group-delete-dialog.component';
import { ninthStratagemGroupRoute } from './ninth-stratagem-group.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(ninthStratagemGroupRoute)],
  declarations: [
    NinthStratagemGroupComponent,
    NinthStratagemGroupDetailComponent,
    NinthStratagemGroupUpdateComponent,
    NinthStratagemGroupDeleteDialogComponent,
  ],
  entryComponents: [NinthStratagemGroupDeleteDialogComponent],
})
export class N42CNinthStratagemGroupModule {}
