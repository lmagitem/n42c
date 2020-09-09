import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocalizedPostContent } from 'app/shared/model/localized-post-content.model';
import { LocalizedPostContentService } from './localized-post-content.service';

@Component({
  templateUrl: './localized-post-content-delete-dialog.component.html',
})
export class LocalizedPostContentDeleteDialogComponent {
  localizedPostContent?: ILocalizedPostContent;

  constructor(
    protected localizedPostContentService: LocalizedPostContentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.localizedPostContentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('localizedPostContentListModification');
      this.activeModal.close();
    });
  }
}
