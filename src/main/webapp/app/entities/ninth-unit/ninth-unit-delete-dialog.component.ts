import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INinthUnit } from 'app/shared/model/ninth-unit.model';
import { NinthUnitService } from './ninth-unit.service';

@Component({
  templateUrl: './ninth-unit-delete-dialog.component.html',
})
export class NinthUnitDeleteDialogComponent {
  ninthUnit?: INinthUnit;

  constructor(protected ninthUnitService: NinthUnitService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ninthUnitService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ninthUnitListModification');
      this.activeModal.close();
    });
  }
}
