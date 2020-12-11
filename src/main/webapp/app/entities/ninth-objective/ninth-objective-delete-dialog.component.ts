import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {INinthObjective} from 'app/shared/model/ninth-objective.model';
import {NinthObjectiveService} from './ninth-objective.service';

@Component({
  templateUrl: './ninth-objective-delete-dialog.component.html',
})
export class NinthObjectiveDeleteDialogComponent {
  ninthObjective?: INinthObjective;

  constructor(
    protected ninthObjectiveService: NinthObjectiveService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ninthObjectiveService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ninthObjectiveListModification');
      this.activeModal.close();
    });
  }
}
