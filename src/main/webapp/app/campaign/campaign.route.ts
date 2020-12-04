import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Routes} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Authority} from 'app/shared/constants/authority.constants';
import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
import {INinthCampaign} from 'app/shared/model/ninth-campaign.model';
import {CampaignViewComponent} from './campaign-view.component';
import {CampaignListComponent} from './campaign-list.component';
import {CampaignService} from './campaign.service';

@Injectable({providedIn: 'root'})
export class CampaignResolve implements Resolve<INinthCampaign> {
  constructor(private campaignService: CampaignService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<INinthCampaign> | Observable<never> {
    this.campaignService.enableRerouting(true);

    const param = route.params['id'];
    if (param === 'new') {
      this.campaignService.updateSelectedCampaignId(-1);
    } else {
      this.campaignService.updateSelectedCampaignId(param);
    }
    return of({});
  }
}

export const campaignRoute: Routes = [
  {
    path: '',
    component: CampaignListComponent,
    data: {
      authorities: [Authority.PLAYER, Authority.ADMIN],
      pageTitle: 'n42cApp.ninthCampaign.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CampaignViewComponent,
    resolve: {
      ninthCampaign: CampaignResolve,
    },
    data: {
      authorities: [Authority.PLAYER, Authority.ADMIN],
      pageTitle: 'n42cApp.ninthCampaign.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id',
    component: CampaignViewComponent,
    children: [
      {
        path: 'moment',
        loadChildren: () => import('./campaign-moment/campaign-moment.module').then(m => m.CampaignMomentModule),
      },
    ],
    resolve: {
      ninthCampaign: CampaignResolve,
    },
    data: {
      authorities: [Authority.PLAYER, Authority.ADMIN],
      pageTitle: 'n42cApp.ninthCampaign.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
