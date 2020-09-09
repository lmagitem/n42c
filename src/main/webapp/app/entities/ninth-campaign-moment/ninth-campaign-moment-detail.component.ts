import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INinthCampaignMoment } from 'app/shared/model/ninth-campaign-moment.model';

@Component({
  selector: 'jhi-ninth-campaign-moment-detail',
  templateUrl: './ninth-campaign-moment-detail.component.html',
})
export class NinthCampaignMomentDetailComponent implements OnInit {
  ninthCampaignMoment: INinthCampaignMoment | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthCampaignMoment }) => (this.ninthCampaignMoment = ninthCampaignMoment));
  }

  previousState(): void {
    window.history.back();
  }
}
