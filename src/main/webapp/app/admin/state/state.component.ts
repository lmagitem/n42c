import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StateService } from './state.service';
import { Observable } from 'rxjs';
import { Account } from 'app/core/user/account.model';
import { first } from 'rxjs/operators';
import { CampaignService } from 'app/campaign/campaign.service';

@Component({
  selector: 'jhi-state',
  templateUrl: './state.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StateComponent implements OnInit {
  constructor(private stateService: StateService, private campaignService: CampaignService) {}

  ngOnInit(): void {}

  getAccount(): Observable<Account | null> {
    return this.stateService.getAccount();
  }

  getCampaign(): string {
    let string = '{';

    this.campaignService.selectedCampaignId$
      .pipe(first())
      .subscribe(content => (string += '"selectedCampaignId": ' + JSON.stringify(content) + ','));
    this.campaignService.selectedCampaign$
      .pipe(first())
      .subscribe(content => (string += '"selectedCampaign": ' + JSON.stringify(content) + ','));
    this.campaignService.currentlyEditingCampaign$
      .pipe(first())
      .subscribe(content => (string += '"currentlyEditingCampaign": ' + JSON.stringify(content) + ','));
    this.campaignService.selectedCampaignMomentId$
      .pipe(first())
      .subscribe(content => (string += '"selectedCampaignMomentId": ' + JSON.stringify(content) + ','));
    this.campaignService.selectedCampaignMoment$
      .pipe(first())
      .subscribe(content => (string += '"selectedCampaignMoment": ' + JSON.stringify(content) + ','));
    this.campaignService.selectedCampaignMomentsIds$
      .pipe(first())
      .subscribe(content => (string += '"selectedCampaignMomentsIds": ' + JSON.stringify(content) + ','));
    this.campaignService.currentlyEditingCampaignMoment$
      .pipe(first())
      .subscribe(content => (string += '"currentlyEditingCampaignMoment": ' + JSON.stringify(content)));
    string += '}';

    return JSON.parse(string);
  }
}
