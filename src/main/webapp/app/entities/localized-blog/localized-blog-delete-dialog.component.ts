import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocalizedBlog } from 'app/shared/model/localized-blog.model';
import { LocalizedBlogService } from './localized-blog.service';

@Component({
  templateUrl: './localized-blog-delete-dialog.component.html',
})
export class LocalizedBlogDeleteDialogComponent {
  localizedBlog?: ILocalizedBlog;

  constructor(
    protected localizedBlogService: LocalizedBlogService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.localizedBlogService.delete(id).subscribe(() => {
      this.eventManager.broadcast('localizedBlogListModification');
      this.activeModal.close();
    });
  }
}
