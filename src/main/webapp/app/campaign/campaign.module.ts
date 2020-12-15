import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {N42CSharedModule} from 'app/shared/shared.module';
import {CampaignListComponent} from './campaign-list.component';
import {CampaignViewComponent} from './campaign-view.component';
import {campaignRoute} from './campaign.route';
import {CampaignDeleteDialogComponent} from './campaign-delete-dialog.component';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(campaignRoute)],
  declarations: [CampaignListComponent, CampaignViewComponent, CampaignDeleteDialogComponent],
  entryComponents: [CampaignDeleteDialogComponent],
})
export class CampaignModule {
}
