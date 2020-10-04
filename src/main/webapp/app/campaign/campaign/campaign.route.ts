import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INinthCampaign } from 'app/shared/model/ninth-campaign.model';
import { CampaignViewComponent } from './campaign-view/campaign-view.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignService } from '../campaign.service';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CampaignResolve implements Resolve<INinthCampaign> {
  constructor(private campaignService: CampaignService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INinthCampaign> | Observable<never> {
    this.campaignService.updateSelectedCampaignId(route.params['id']);
    return this.campaignService.selectedCampaign$.pipe(take(1));
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
      { path: '', redirectTo: 'moment', pathMatch: 'full' },
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
