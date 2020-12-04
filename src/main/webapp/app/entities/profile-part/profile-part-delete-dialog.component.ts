import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {IProfilePart} from 'app/shared/model/profile-part.model';
import {ProfilePartService} from './profile-part.service';

@Component({
  templateUrl: './profile-part-delete-dialog.component.html',
})
export class ProfilePartDeleteDialogComponent {
  profilePart?: IProfilePart;

  constructor(
    protected profilePartService: ProfilePartService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.profilePartService.delete(id).subscribe(() => {
      this.eventManager.broadcast('profilePartListModification');
      this.activeModal.close();
    });
  }
}
