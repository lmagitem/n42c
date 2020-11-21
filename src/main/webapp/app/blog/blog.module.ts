import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { N42CSharedModule } from 'app/shared/shared.module';
import { BlogListComponent } from './blog-list.component';
import { BlogComponent } from './blog.component';
import { BlogDeleteDialogComponent } from './blog-delete-dialog.component';
import { blogRoute } from './blog.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(blogRoute)],
  declarations: [BlogListComponent, BlogComponent, BlogDeleteDialogComponent],
  entryComponents: [BlogDeleteDialogComponent],
})
export class BlogModule {}
