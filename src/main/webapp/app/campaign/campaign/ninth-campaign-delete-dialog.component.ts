import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { INinthCampaign } from 'app/shared/model/ninth-campaign.model';
import { NinthCampaignService } from 'app/entities/ninth-campaign/ninth-campaign.service';

@Component({
  templateUrl: './ninth-campaign-delete-dialog.component.html',
})
export class NinthCampaignDeleteDialogComponent {
  ninthCampaign?: INinthCampaign;

  constructor(
    protected ninthCampaignService: NinthCampaignService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

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
