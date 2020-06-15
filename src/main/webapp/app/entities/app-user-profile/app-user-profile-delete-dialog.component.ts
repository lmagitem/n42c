import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAppUserProfile } from 'app/shared/model/app-user-profile.model';
import { AppUserProfileService } from './app-user-profile.service';

@Component({
  templateUrl: './app-user-profile-delete-dialog.component.html',
})
export class AppUserProfileDeleteDialogComponent {
  appUserProfile?: IAppUserProfile;

  constructor(
    protected appUserProfileService: AppUserProfileService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.appUserProfileService.delete(id).subscribe(() => {
      this.eventManager.broadcast('appUserProfileListModification');
      this.activeModal.close();
    });
  }
}
