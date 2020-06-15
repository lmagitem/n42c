import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProfilePartPreciseItem } from 'app/shared/model/profile-part-precise-item.model';
import { ProfilePartPreciseItemService } from './profile-part-precise-item.service';

@Component({
  templateUrl: './profile-part-precise-item-delete-dialog.component.html',
})
export class ProfilePartPreciseItemDeleteDialogComponent {
  profilePartPreciseItem?: IProfilePartPreciseItem;

  constructor(
    protected profilePartPreciseItemService: ProfilePartPreciseItemService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.profilePartPreciseItemService.delete(id).subscribe(() => {
      this.eventManager.broadcast('profilePartPreciseItemListModification');
      this.activeModal.close();
    });
  }
}
