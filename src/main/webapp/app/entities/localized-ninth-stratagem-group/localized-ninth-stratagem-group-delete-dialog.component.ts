import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocalizedNinthStratagemGroup } from 'app/shared/model/localized-ninth-stratagem-group.model';
import { LocalizedNinthStratagemGroupService } from './localized-ninth-stratagem-group.service';

@Component({
  templateUrl: './localized-ninth-stratagem-group-delete-dialog.component.html',
})
export class LocalizedNinthStratagemGroupDeleteDialogComponent {
  localizedNinthStratagemGroup?: ILocalizedNinthStratagemGroup;

  constructor(
    protected localizedNinthStratagemGroupService: LocalizedNinthStratagemGroupService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.localizedNinthStratagemGroupService.delete(id).subscribe(() => {
      this.eventManager.broadcast('localizedNinthStratagemGroupListModification');
      this.activeModal.close();
    });
  }
}
