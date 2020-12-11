import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JhiDataUtils} from 'ng-jhipster';

import {INinthCampaign} from 'app/shared/model/ninth-campaign.model';

@Component({
  selector: 'jhi-ninth-campaign-detail',
  templateUrl: './ninth-campaign-detail.component.html',
})
export class NinthCampaignDetailComponent implements OnInit {
  ninthCampaign: INinthCampaign | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthCampaign }) => (this.ninthCampaign = ninthCampaign));
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
