import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {ILocalizedBlogPost} from 'app/shared/model/localized-blog-post.model';
import {LocalizedBlogPostService} from './localized-blog-post.service';

@Component({
  templateUrl: './localized-blog-post-delete-dialog.component.html',
})
export class LocalizedBlogPostDeleteDialogComponent {
  localizedBlogPost?: ILocalizedBlogPost;

  constructor(
    protected localizedBlogPostService: LocalizedBlogPostService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.localizedBlogPostService.delete(id).subscribe(() => {
      this.eventManager.broadcast('localizedBlogPostListModification');
      this.activeModal.close();
    });
  }
}
