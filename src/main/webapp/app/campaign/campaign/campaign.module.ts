import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { N42CSharedModule } from 'app/shared/shared.module';
import { CampaignComponent } from './campaign.component';
import { CampaignViewComponent } from './campaign-view.component';
import { campaignRoute } from './campaign.route';
import { CampaignDeleteDialogComponent } from './campaign-delete-dialog.component';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(campaignRoute)],
  declarations: [CampaignComponent, CampaignViewComponent, CampaignDeleteDialogComponent],
  entryComponents: [CampaignDeleteDialogComponent],
})
export class CampaignModule {}
