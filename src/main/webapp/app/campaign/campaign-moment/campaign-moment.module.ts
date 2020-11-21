import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { N42CSharedModule } from 'app/shared/shared.module';
import { CampaignMomentComponent } from './campaign-moment.component';
import { campaignMomentRoute } from './campaign-moment.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(campaignMomentRoute)],
  declarations: [CampaignMomentComponent],
})
export class CampaignMomentModule {}
