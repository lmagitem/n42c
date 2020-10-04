import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INinthCampaignMoment } from 'app/shared/model/ninth-campaign-moment.model';
import { CampaignMomentComponent } from './campaign-moment.component';
import { CampaignMomentRedirectComponent } from '../campaign-moment-redirect/campaign-moment-redirect.component';
import { CampaignService } from 'app/campaign/campaign.service';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CampaignMomentResolve implements Resolve<INinthCampaignMoment> {
  constructor(private campaignService: CampaignService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INinthCampaignMoment> | Observable<never> {
    this.campaignService.updateSelectedCampaignMomentId(route.params['idMoment']);
    return this.campaignService.selectedCampaignMoment$.pipe(take(1));
  }
}

export const campaignMomentRoute: Routes = [
  {
    path: '',
    component: CampaignMomentRedirectComponent,
    data: {
      authorities: [Authority.PLAYER, Authority.ADMIN],
      pageTitle: 'n42cApp.ninthCampaignMoment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idMoment',
    component: CampaignMomentComponent,
    children: [
      {
        path: 'view',
        resolve: {
          ninthCampaign: CampaignMomentResolve,
        },
        data: {
          authorities: [Authority.PLAYER, Authority.ADMIN],
          pageTitle: 'n42cApp.ninthCampaignMoment.home.title',
        },
        canActivate: [UserRouteAccessService],
      },
      {
        path: 'edit',
        resolve: {
          ninthCampaign: CampaignMomentResolve,
        },
        data: {
          authorities: [Authority.PLAYER, Authority.ADMIN],
          pageTitle: 'n42cApp.ninthCampaignMoment.home.title',
        },
        canActivate: [UserRouteAccessService],
      },
    ],
    resolve: {
      ninthCampaign: CampaignMomentResolve,
    },
    data: {
      authorities: [Authority.PLAYER, Authority.ADMIN],
      pageTitle: 'n42cApp.ninthCampaignMoment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CampaignMomentComponent,
    resolve: {
      ninthCampaign: CampaignMomentResolve,
    },
    data: {
      authorities: [Authority.PLAYER, Authority.ADMIN],
      pageTitle: 'n42cApp.ninthCampaignMoment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
