import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { NinthCampaignMomentComponent } from './ninth-campaign-moment.component';
import { NinthCampaignMomentDetailComponent } from './ninth-campaign-moment-detail.component';
import { NinthCampaignMomentUpdateComponent } from './ninth-campaign-moment-update.component';
import { NinthCampaignMomentDeleteDialogComponent } from './ninth-campaign-moment-delete-dialog.component';
import { ninthCampaignMomentRoute } from './ninth-campaign-moment.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(ninthCampaignMomentRoute)],
  declarations: [
    NinthCampaignMomentComponent,
    NinthCampaignMomentDetailComponent,
    NinthCampaignMomentUpdateComponent,
    NinthCampaignMomentDeleteDialogComponent,
  ],
  entryComponents: [NinthCampaignMomentDeleteDialogComponent],
})
export class N42CNinthCampaignMomentModule {}
