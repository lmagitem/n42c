import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocalizedNinthMissionRule } from 'app/shared/model/localized-ninth-mission-rule.model';
import { LocalizedNinthMissionRuleService } from './localized-ninth-mission-rule.service';

@Component({
  templateUrl: './localized-ninth-mission-rule-delete-dialog.component.html',
})
export class LocalizedNinthMissionRuleDeleteDialogComponent {
  localizedNinthMissionRule?: ILocalizedNinthMissionRule;

  constructor(
    protected localizedNinthMissionRuleService: LocalizedNinthMissionRuleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.localizedNinthMissionRuleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('localizedNinthMissionRuleListModification');
      this.activeModal.close();
    });
  }
}
