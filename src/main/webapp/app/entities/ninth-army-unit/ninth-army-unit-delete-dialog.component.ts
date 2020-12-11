import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {INinthArmyUnit} from 'app/shared/model/ninth-army-unit.model';
import {NinthArmyUnitService} from './ninth-army-unit.service';

@Component({
  templateUrl: './ninth-army-unit-delete-dialog.component.html',
})
export class NinthArmyUnitDeleteDialogComponent {
  ninthArmyUnit?: INinthArmyUnit;

  constructor(
    protected ninthArmyUnitService: NinthArmyUnitService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ninthArmyUnitService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ninthArmyUnitListModification');
      this.activeModal.close();
    });
  }
}
