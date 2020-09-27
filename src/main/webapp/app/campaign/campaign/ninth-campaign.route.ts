import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INinthCampaign, NinthCampaign } from 'app/shared/model/ninth-campaign.model';
import { NinthCampaignComponent } from './ninth-campaign.component';
import { NinthCampaignDetailComponent } from './ninth-campaign-detail.component';
import { NinthCampaignUpdateComponent } from './ninth-campaign-update.component';
import { NinthCampaignService } from 'app/entities/ninth-campaign/ninth-campaign.service';

@Injectable({ providedIn: 'root' })
export class NinthCampaignResolve implements Resolve<INinthCampaign> {
  constructor(private service: NinthCampaignService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INinthCampaign> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ninthCampaign: HttpResponse<NinthCampaign>) => {
          if (ninthCampaign.body) {
            return of(ninthCampaign.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NinthCampaign());
  }
}

export const ninthCampaignRoute: Routes = [
  {
    path: '',
    component: NinthCampaignComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthCampaign.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NinthCampaignDetailComponent,
    resolve: {
      ninthCampaign: NinthCampaignResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthCampaign.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NinthCampaignUpdateComponent,
    resolve: {
      ninthCampaign: NinthCampaignResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthCampaign.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NinthCampaignUpdateComponent,
    resolve: {
      ninthCampaign: NinthCampaignResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthCampaign.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
