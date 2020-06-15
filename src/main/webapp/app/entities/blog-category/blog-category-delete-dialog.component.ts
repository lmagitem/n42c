import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBlogCategory } from 'app/shared/model/blog-category.model';
import { BlogCategoryService } from './blog-category.service';

@Component({
  templateUrl: './blog-category-delete-dialog.component.html',
})
export class BlogCategoryDeleteDialogComponent {
  blogCategory?: IBlogCategory;

  constructor(
    protected blogCategoryService: BlogCategoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.blogCategoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('blogCategoryListModification');
      this.activeModal.close();
    });
  }
}
