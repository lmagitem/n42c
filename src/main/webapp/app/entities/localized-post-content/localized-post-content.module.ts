import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { LocalizedPostContentComponent } from './localized-post-content.component';
import { LocalizedPostContentDetailComponent } from './localized-post-content-detail.component';
import { LocalizedPostContentUpdateComponent } from './localized-post-content-update.component';
import { LocalizedPostContentDeleteDialogComponent } from './localized-post-content-delete-dialog.component';
import { localizedPostContentRoute } from './localized-post-content.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(localizedPostContentRoute)],
  declarations: [
    LocalizedPostContentComponent,
    LocalizedPostContentDetailComponent,
    LocalizedPostContentUpdateComponent,
    LocalizedPostContentDeleteDialogComponent,
  ],
  entryComponents: [LocalizedPostContentDeleteDialogComponent],
})
export class N42CLocalizedPostContentModule {}
