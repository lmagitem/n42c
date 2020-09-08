import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INinthArmyMoment } from 'app/shared/model/ninth-army-moment.model';
import { NinthArmyMomentService } from './ninth-army-moment.service';

@Component({
  templateUrl: './ninth-army-moment-delete-dialog.component.html',
})
export class NinthArmyMomentDeleteDialogComponent {
  ninthArmyMoment?: INinthArmyMoment;

  constructor(
    protected ninthArmyMomentService: NinthArmyMomentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ninthArmyMomentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ninthArmyMomentListModification');
      this.activeModal.close();
    });
  }
}
