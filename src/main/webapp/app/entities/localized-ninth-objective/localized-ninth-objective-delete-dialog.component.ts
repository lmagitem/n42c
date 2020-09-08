import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocalizedNinthObjective } from 'app/shared/model/localized-ninth-objective.model';
import { LocalizedNinthObjectiveService } from './localized-ninth-objective.service';

@Component({
  templateUrl: './localized-ninth-objective-delete-dialog.component.html',
})
export class LocalizedNinthObjectiveDeleteDialogComponent {
  localizedNinthObjective?: ILocalizedNinthObjective;

  constructor(
    protected localizedNinthObjectiveService: LocalizedNinthObjectiveService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.localizedNinthObjectiveService.delete(id).subscribe(() => {
      this.eventManager.broadcast('localizedNinthObjectiveListModification');
      this.activeModal.close();
    });
  }
}
