import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INinthCampaignMoment, NinthCampaignMoment } from 'app/shared/model/ninth-campaign-moment.model';
import { NinthCampaignMomentService } from './ninth-campaign-moment.service';
import { NinthCampaignMomentComponent } from './ninth-campaign-moment.component';
import { NinthCampaignMomentDetailComponent } from './ninth-campaign-moment-detail.component';
import { NinthCampaignMomentUpdateComponent } from './ninth-campaign-moment-update.component';

@Injectable({ providedIn: 'root' })
export class NinthCampaignMomentResolve implements Resolve<INinthCampaignMoment> {
  constructor(private service: NinthCampaignMomentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INinthCampaignMoment> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ninthCampaignMoment: HttpResponse<NinthCampaignMoment>) => {
          if (ninthCampaignMoment.body) {
            return of(ninthCampaignMoment.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NinthCampaignMoment());
  }
}

export const ninthCampaignMomentRoute: Routes = [
  {
    path: '',
    component: NinthCampaignMomentComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthCampaignMoment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NinthCampaignMomentDetailComponent,
    resolve: {
      ninthCampaignMoment: NinthCampaignMomentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthCampaignMoment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NinthCampaignMomentUpdateComponent,
    resolve: {
      ninthCampaignMoment: NinthCampaignMomentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthCampaignMoment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NinthCampaignMomentUpdateComponent,
    resolve: {
      ninthCampaignMoment: NinthCampaignMomentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthCampaignMoment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
