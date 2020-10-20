import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INinthCampaign } from 'app/shared/model/ninth-campaign.model';
import { NinthCampaignService } from './ninth-campaign.service';
import { NinthCampaignDeleteDialogComponent } from './ninth-campaign-delete-dialog.component';

@Component({
  selector: 'jhi-ninth-campaign',
  templateUrl: './ninth-campaign.component.html',
})
export class NinthCampaignComponent implements OnInit, OnDestroy {
  ninthCampaigns?: INinthCampaign[];
  eventSubscriber?: Subscription;

  constructor(
    protected ninthCampaignService: NinthCampaignService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

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

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInNinthCampaigns(): void {
    this.eventSubscriber = this.eventManager.subscribe('ninthCampaignListModification', () => this.loadAll());
  }

  delete(ninthCampaign: INinthCampaign): void {
    const modalRef = this.modalService.open(NinthCampaignDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ninthCampaign = ninthCampaign;
  }
}
