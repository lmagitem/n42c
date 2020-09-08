import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INinthStratagemGroup } from 'app/shared/model/ninth-stratagem-group.model';
import { NinthStratagemGroupService } from './ninth-stratagem-group.service';

@Component({
  templateUrl: './ninth-stratagem-group-delete-dialog.component.html',
})
export class NinthStratagemGroupDeleteDialogComponent {
  ninthStratagemGroup?: INinthStratagemGroup;

  constructor(
    protected ninthStratagemGroupService: NinthStratagemGroupService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ninthStratagemGroupService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ninthStratagemGroupListModification');
      this.activeModal.close();
    });
  }
}
