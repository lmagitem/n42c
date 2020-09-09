import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INinthUnitMoment } from 'app/shared/model/ninth-unit-moment.model';
import { NinthUnitMomentService } from './ninth-unit-moment.service';

@Component({
  templateUrl: './ninth-unit-moment-delete-dialog.component.html',
})
export class NinthUnitMomentDeleteDialogComponent {
  ninthUnitMoment?: INinthUnitMoment;

  constructor(
    protected ninthUnitMomentService: NinthUnitMomentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ninthUnitMomentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ninthUnitMomentListModification');
      this.activeModal.close();
    });
  }
}
