import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProfilePartLinkedExperience } from 'app/shared/model/profile-part-linked-experience.model';
import { ProfilePartLinkedExperienceService } from './profile-part-linked-experience.service';

@Component({
  templateUrl: './profile-part-linked-experience-delete-dialog.component.html',
})
export class ProfilePartLinkedExperienceDeleteDialogComponent {
  profilePartLinkedExperience?: IProfilePartLinkedExperience;

  constructor(
    protected profilePartLinkedExperienceService: ProfilePartLinkedExperienceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.profilePartLinkedExperienceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('profilePartLinkedExperienceListModification');
      this.activeModal.close();
    });
  }
}
