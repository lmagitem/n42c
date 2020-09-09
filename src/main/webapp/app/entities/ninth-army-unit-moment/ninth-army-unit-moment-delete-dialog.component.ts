import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INinthArmyUnitMoment } from 'app/shared/model/ninth-army-unit-moment.model';
import { NinthArmyUnitMomentService } from './ninth-army-unit-moment.service';

@Component({
  templateUrl: './ninth-army-unit-moment-delete-dialog.component.html',
})
export class NinthArmyUnitMomentDeleteDialogComponent {
  ninthArmyUnitMoment?: INinthArmyUnitMoment;

  constructor(
    protected ninthArmyUnitMomentService: NinthArmyUnitMomentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ninthArmyUnitMomentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ninthArmyUnitMomentListModification');
      this.activeModal.close();
    });
  }
}
