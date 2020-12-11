import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {INinthCampaignMoment} from 'app/shared/model/ninth-campaign-moment.model';
import {NinthCampaignMomentService} from './ninth-campaign-moment.service';

@Component({
  templateUrl: './ninth-campaign-moment-delete-dialog.component.html',
})
export class NinthCampaignMomentDeleteDialogComponent {
  ninthCampaignMoment?: INinthCampaignMoment;

  constructor(
    protected ninthCampaignMomentService: NinthCampaignMomentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ninthCampaignMomentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ninthCampaignMomentListModification');
      this.activeModal.close();
    });
  }
}
