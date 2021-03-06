import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {JhiEventManager} from 'ng-jhipster';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {INinthCampaign} from 'app/shared/model/ninth-campaign.model';
import {NinthCampaignService} from 'app/entities/ninth-campaign/ninth-campaign.service';
import {CampaignDeleteDialogComponent} from './campaign-delete-dialog.component';

@Component({
  selector: 'jhi-ninth-campaign',
  templateUrl: './campaign-list.component.html',
})
export class CampaignListComponent implements OnInit, OnDestroy {
  ninthCampaigns?: INinthCampaign[];
  eventSubscriber?: Subscription;

  constructor(
    protected ninthCampaignService: NinthCampaignService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {
  }

  loadAll(): void {
    this.ninthCampaignService.query().subscribe((res: HttpResponse<INinthCampaign[]>) => (this.ninthCampaigns = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNinthCampaigns();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INinthCampaign): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNinthCampaigns(): void {
    this.eventSubscriber = this.eventManager.subscribe('ninthCampaignListModification', () => this.loadAll());
  }

  delete(ninthCampaign: INinthCampaign): void {
    const modalRef = this.modalService.open(CampaignDeleteDialogComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.ninthCampaign = ninthCampaign;
  }
}
