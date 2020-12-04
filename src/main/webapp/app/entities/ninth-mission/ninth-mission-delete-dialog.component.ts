import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {INinthMission} from 'app/shared/model/ninth-mission.model';
import {NinthMissionService} from './ninth-mission.service';

@Component({
  templateUrl: './ninth-mission-delete-dialog.component.html',
})
export class NinthMissionDeleteDialogComponent {
  ninthMission?: INinthMission;

  constructor(
    protected ninthMissionService: NinthMissionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ninthMissionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ninthMissionListModification');
      this.activeModal.close();
    });
  }
}
