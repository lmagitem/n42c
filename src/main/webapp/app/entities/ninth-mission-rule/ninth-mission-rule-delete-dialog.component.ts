import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {INinthMissionRule} from 'app/shared/model/ninth-mission-rule.model';
import {NinthMissionRuleService} from './ninth-mission-rule.service';

@Component({
  templateUrl: './ninth-mission-rule-delete-dialog.component.html',
})
export class NinthMissionRuleDeleteDialogComponent {
  ninthMissionRule?: INinthMissionRule;

  constructor(
    protected ninthMissionRuleService: NinthMissionRuleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ninthMissionRuleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ninthMissionRuleListModification');
      this.activeModal.close();
    });
  }
}
