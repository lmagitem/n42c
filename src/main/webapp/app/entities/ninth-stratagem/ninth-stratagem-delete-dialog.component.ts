import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INinthStratagem } from 'app/shared/model/ninth-stratagem.model';
import { NinthStratagemService } from './ninth-stratagem.service';

@Component({
  templateUrl: './ninth-stratagem-delete-dialog.component.html',
})
export class NinthStratagemDeleteDialogComponent {
  ninthStratagem?: INinthStratagem;

  constructor(
    protected ninthStratagemService: NinthStratagemService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ninthStratagemService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ninthStratagemListModification');
      this.activeModal.close();
    });
  }
}
