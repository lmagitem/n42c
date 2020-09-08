import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocalizedNinthMission } from 'app/shared/model/localized-ninth-mission.model';
import { LocalizedNinthMissionService } from './localized-ninth-mission.service';

@Component({
  templateUrl: './localized-ninth-mission-delete-dialog.component.html',
})
export class LocalizedNinthMissionDeleteDialogComponent {
  localizedNinthMission?: ILocalizedNinthMission;

  constructor(
    protected localizedNinthMissionService: LocalizedNinthMissionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.localizedNinthMissionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('localizedNinthMissionListModification');
      this.activeModal.close();
    });
  }
}
