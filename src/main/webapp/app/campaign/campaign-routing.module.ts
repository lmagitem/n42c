import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';

@NgModule({
  imports: [
    /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    RouterModule.forChild([
      {
        path: '',
        data: {
          authorities: [Authority.USER],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./campaign/ninth-campaign.module').then(m => m.CampaignModule),
      },
    ]),
  ],
})
export class CampaignRoutingModule {}
