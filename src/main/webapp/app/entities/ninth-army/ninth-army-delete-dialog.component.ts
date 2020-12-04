import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {INinthArmy} from 'app/shared/model/ninth-army.model';
import {NinthArmyService} from './ninth-army.service';

@Component({
  templateUrl: './ninth-army-delete-dialog.component.html',
})
export class NinthArmyDeleteDialogComponent {
  ninthArmy?: INinthArmy;

  constructor(protected ninthArmyService: NinthArmyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ninthArmyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ninthArmyListModification');
      this.activeModal.close();
    });
  }
}
