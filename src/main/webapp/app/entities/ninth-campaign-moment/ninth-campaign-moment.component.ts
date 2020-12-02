import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils, JhiLanguageService } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { INinthCampaignMoment } from 'app/shared/model/ninth-campaign-moment.model';
import { NinthCampaignMomentService } from './ninth-campaign-moment.service';
import { NinthCampaignMomentDeleteDialogComponent } from './ninth-campaign-moment-delete-dialog.component';

@Component({
  selector: 'jhi-ninth-campaign-moment',
  templateUrl: './ninth-campaign-moment.component.html',
})
export class NinthCampaignMomentComponent implements OnInit, OnDestroy {
  ninthCampaignMoments?: INinthCampaignMoment[];
  eventSubscriber?: Subscription;
  locale: string;

  constructor(
    protected ninthCampaignMomentService: NinthCampaignMomentService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected languageService: JhiLanguageService
  ) {
    this.locale = this.languageService.getCurrentLanguage();
  }

  loadAll(): void {
    this.ninthCampaignMomentService
      .query()
      .subscribe((res: HttpResponse<INinthCampaignMoment[]>) => (this.ninthCampaignMoments = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNinthCampaignMoments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INinthCampaignMoment): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInNinthCampaignMoments(): void {
    this.eventSubscriber = this.eventManager.subscribe('ninthCampaignMomentListModification', () => this.loadAll());
  }

  delete(ninthCampaignMoment: INinthCampaignMoment): void {
    const modalRef = this.modalService.open(NinthCampaignMomentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ninthCampaignMoment = ninthCampaignMoment;
  }
}
