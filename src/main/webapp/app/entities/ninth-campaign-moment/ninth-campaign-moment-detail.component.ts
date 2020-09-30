import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { INinthCampaignMoment } from 'app/shared/model/ninth-campaign-moment.model';

@Component({
  selector: 'jhi-ninth-campaign-moment-detail',
  templateUrl: './ninth-campaign-moment-detail.component.html',
})
export class NinthCampaignMomentDetailComponent implements OnInit {
  ninthCampaignMoment: INinthCampaignMoment | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthCampaignMoment }) => (this.ninthCampaignMoment = ninthCampaignMoment));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
