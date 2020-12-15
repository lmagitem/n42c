import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NinthCampaignService} from 'app/entities/ninth-campaign/ninth-campaign.service';
import {INinthCampaign} from 'app/shared/model/ninth-campaign.model';
import {JhiEventManager} from 'ng-jhipster';

@Component({
  templateUrl: './campaign-delete-dialog.component.html',
})
export class CampaignDeleteDialogComponent {
  ninthCampaign?: INinthCampaign;

  constructor(
    protected ninthCampaignService: NinthCampaignService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ninthCampaignService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ninthCampaignListModification');
      this.activeModal.close();
    });
  }
}
