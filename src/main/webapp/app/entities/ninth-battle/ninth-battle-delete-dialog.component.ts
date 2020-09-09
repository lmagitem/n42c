import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INinthBattle } from 'app/shared/model/ninth-battle.model';
import { NinthBattleService } from './ninth-battle.service';

@Component({
  templateUrl: './ninth-battle-delete-dialog.component.html',
})
export class NinthBattleDeleteDialogComponent {
  ninthBattle?: INinthBattle;

  constructor(
    protected ninthBattleService: NinthBattleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ninthBattleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ninthBattleListModification');
      this.activeModal.close();
    });
  }
}
