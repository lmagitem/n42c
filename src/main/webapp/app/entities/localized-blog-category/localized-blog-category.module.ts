import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { LocalizedBlogCategoryComponent } from './localized-blog-category.component';
import { LocalizedBlogCategoryDetailComponent } from './localized-blog-category-detail.component';
import { LocalizedBlogCategoryUpdateComponent } from './localized-blog-category-update.component';
import { LocalizedBlogCategoryDeleteDialogComponent } from './localized-blog-category-delete-dialog.component';
import { localizedBlogCategoryRoute } from './localized-blog-category.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(localizedBlogCategoryRoute)],
  declarations: [
    LocalizedBlogCategoryComponent,
    LocalizedBlogCategoryDetailComponent,
    LocalizedBlogCategoryUpdateComponent,
    LocalizedBlogCategoryDeleteDialogComponent,
  ],
  entryComponents: [LocalizedBlogCategoryDeleteDialogComponent],
})
export class N42CLocalizedBlogCategoryModule {}
