import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {N42CSharedModule} from 'app/shared/shared.module';
import {LocalizedBlogPostComponent} from './localized-blog-post.component';
import {LocalizedBlogPostDetailComponent} from './localized-blog-post-detail.component';
import {LocalizedBlogPostUpdateComponent} from './localized-blog-post-update.component';
import {LocalizedBlogPostDeleteDialogComponent} from './localized-blog-post-delete-dialog.component';
import {localizedBlogPostRoute} from './localized-blog-post.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(localizedBlogPostRoute)],
  declarations: [
    LocalizedBlogPostComponent,
    LocalizedBlogPostDetailComponent,
    LocalizedBlogPostUpdateComponent,
    LocalizedBlogPostDeleteDialogComponent,
  ],
  entryComponents: [LocalizedBlogPostDeleteDialogComponent],
})
export class N42CLocalizedBlogPostModule {}
