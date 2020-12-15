import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {N42CSharedModule} from 'app/shared/shared.module';
import {BlogPostListComponent} from './blog-post-list.component';
import {BlogPostComponent} from './blog-post.component';
import {BlogPostUpdateComponent} from './blog-post-update.component';
import {BlogPostDeleteDialogComponent} from './blog-post-delete-dialog.component';
import {blogPostRoute} from './blog-post.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(blogPostRoute)],
  declarations: [BlogPostListComponent, BlogPostComponent, BlogPostUpdateComponent, BlogPostDeleteDialogComponent],
  entryComponents: [BlogPostDeleteDialogComponent],
})
export class BlogPostModule {
}
