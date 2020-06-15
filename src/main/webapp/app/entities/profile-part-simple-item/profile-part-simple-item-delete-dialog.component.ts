import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProfilePartSimpleItem } from 'app/shared/model/profile-part-simple-item.model';
import { ProfilePartSimpleItemService } from './profile-part-simple-item.service';

@Component({
  templateUrl: './profile-part-simple-item-delete-dialog.component.html',
})
export class ProfilePartSimpleItemDeleteDialogComponent {
  profilePartSimpleItem?: IProfilePartSimpleItem;

  constructor(
    protected profilePartSimpleItemService: ProfilePartSimpleItemService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.profilePartSimpleItemService.delete(id).subscribe(() => {
      this.eventManager.broadcast('profilePartSimpleItemListModification');
      this.activeModal.close();
    });
  }
}
