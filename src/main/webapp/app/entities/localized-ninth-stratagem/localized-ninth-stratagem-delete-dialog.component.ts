import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocalizedNinthStratagem } from 'app/shared/model/localized-ninth-stratagem.model';
import { LocalizedNinthStratagemService } from './localized-ninth-stratagem.service';

@Component({
  templateUrl: './localized-ninth-stratagem-delete-dialog.component.html',
})
export class LocalizedNinthStratagemDeleteDialogComponent {
  localizedNinthStratagem?: ILocalizedNinthStratagem;

  constructor(
    protected localizedNinthStratagemService: LocalizedNinthStratagemService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.localizedNinthStratagemService.delete(id).subscribe(() => {
      this.eventManager.broadcast('localizedNinthStratagemListModification');
      this.activeModal.close();
    });
  }
}
