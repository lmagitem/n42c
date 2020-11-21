import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { LocalizedBlogComponent } from './localized-blog.component';
import { LocalizedBlogDetailComponent } from './localized-blog-detail.component';
import { LocalizedBlogUpdateComponent } from './localized-blog-update.component';
import { LocalizedBlogDeleteDialogComponent } from './localized-blog-delete-dialog.component';
import { localizedBlogRoute } from './localized-blog.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(localizedBlogRoute)],
  declarations: [LocalizedBlogComponent, LocalizedBlogDetailComponent, LocalizedBlogUpdateComponent, LocalizedBlogDeleteDialogComponent],
  entryComponents: [LocalizedBlogDeleteDialogComponent],
})
export class N42CLocalizedBlogModule {}
