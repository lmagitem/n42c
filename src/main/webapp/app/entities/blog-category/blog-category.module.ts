import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { BlogCategoryComponent } from './blog-category.component';
import { BlogCategoryDetailComponent } from './blog-category-detail.component';
import { BlogCategoryUpdateComponent } from './blog-category-update.component';
import { BlogCategoryDeleteDialogComponent } from './blog-category-delete-dialog.component';
import { blogCategoryRoute } from './blog-category.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(blogCategoryRoute)],
  declarations: [BlogCategoryComponent, BlogCategoryDetailComponent, BlogCategoryUpdateComponent, BlogCategoryDeleteDialogComponent],
  entryComponents: [BlogCategoryDeleteDialogComponent],
})
export class N42CBlogCategoryModule {}
