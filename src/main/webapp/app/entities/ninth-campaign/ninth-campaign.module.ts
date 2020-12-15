import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {N42CSharedModule} from 'app/shared/shared.module';
import {NinthCampaignComponent} from './ninth-campaign.component';
import {NinthCampaignDetailComponent} from './ninth-campaign-detail.component';
import {NinthCampaignUpdateComponent} from './ninth-campaign-update.component';
import {NinthCampaignDeleteDialogComponent} from './ninth-campaign-delete-dialog.component';
import {ninthCampaignRoute} from './ninth-campaign.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(ninthCampaignRoute)],
  declarations: [NinthCampaignComponent, NinthCampaignDetailComponent, NinthCampaignUpdateComponent, NinthCampaignDeleteDialogComponent],
  entryComponents: [NinthCampaignDeleteDialogComponent],
})
export class N42CNinthCampaignModule {}
