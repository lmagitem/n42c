import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INinthCampaign } from 'app/shared/model/ninth-campaign.model';

@Component({
  selector: 'jhi-ninth-campaign-detail',
  templateUrl: './ninth-campaign-detail.component.html',
})
export class NinthCampaignDetailComponent implements OnInit {
  ninthCampaign: INinthCampaign | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthCampaign }) => (this.ninthCampaign = ninthCampaign));
  }

  previousState(): void {
    window.history.back();
  }
}
