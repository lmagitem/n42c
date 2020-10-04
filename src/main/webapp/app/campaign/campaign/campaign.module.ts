import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { N42CSharedModule } from 'app/shared/shared.module';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignViewComponent } from './campaign-view/campaign-view.component';
import { campaignRoute } from './campaign.route';
import { CampaignDeleteDialogComponent } from './campaign-list/campaign-delete-dialog.component';
import { CampaignMomentRedirectComponent } from './campaign-moment-redirect/campaign-moment-redirect.component';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(campaignRoute)],
  declarations: [CampaignListComponent, CampaignViewComponent, CampaignDeleteDialogComponent, CampaignMomentRedirectComponent],
  entryComponents: [CampaignDeleteDialogComponent],
})
export class CampaignModule {}
