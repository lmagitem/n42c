import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocalizedBlogCategory } from 'app/shared/model/localized-blog-category.model';
import { LocalizedBlogCategoryService } from './localized-blog-category.service';

@Component({
  templateUrl: './localized-blog-category-delete-dialog.component.html',
})
export class LocalizedBlogCategoryDeleteDialogComponent {
  localizedBlogCategory?: ILocalizedBlogCategory;

  constructor(
    protected localizedBlogCategoryService: LocalizedBlogCategoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.localizedBlogCategoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('localizedBlogCategoryListModification');
      this.activeModal.close();
    });
  }
}
