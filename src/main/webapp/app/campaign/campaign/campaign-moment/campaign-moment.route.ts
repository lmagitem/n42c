import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INinthCampaignMoment } from 'app/shared/model/ninth-campaign-moment.model';
import { CampaignMomentComponent } from './campaign-moment.component';
import { CampaignService } from '../campaign.service';

@Injectable({ providedIn: 'root' })
export class CampaignMomentResolve implements Resolve<INinthCampaignMoment> {
  constructor(private campaignService: CampaignService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INinthCampaignMoment> | Observable<never> {
    const param = route.params['idMoment'];
    if (param === 'new') {
      this.campaignService.updateSelectedCampaignMomentId(-1);
    } else {
      this.campaignService.updateSelectedCampaignMomentId(param);
    }
    return of({});
  }
}

export const campaignMomentRoute: Routes = [
  {
    path: ':idMoment',
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
