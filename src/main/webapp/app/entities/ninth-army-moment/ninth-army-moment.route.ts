import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INinthArmyMoment, NinthArmyMoment } from 'app/shared/model/ninth-army-moment.model';
import { NinthArmyMomentService } from './ninth-army-moment.service';
import { NinthArmyMomentComponent } from './ninth-army-moment.component';
import { NinthArmyMomentDetailComponent } from './ninth-army-moment-detail.component';
import { NinthArmyMomentUpdateComponent } from './ninth-army-moment-update.component';

@Injectable({ providedIn: 'root' })
export class NinthArmyMomentResolve implements Resolve<INinthArmyMoment> {
  constructor(private service: NinthArmyMomentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INinthArmyMoment> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ninthArmyMoment: HttpResponse<NinthArmyMoment>) => {
          if (ninthArmyMoment.body) {
            return of(ninthArmyMoment.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NinthArmyMoment());
  }
}

export const ninthArmyMomentRoute: Routes = [
  {
    path: '',
    component: NinthArmyMomentComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthArmyMoment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NinthArmyMomentDetailComponent,
    resolve: {
      ninthArmyMoment: NinthArmyMomentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthArmyMoment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NinthArmyMomentUpdateComponent,
    resolve: {
      ninthArmyMoment: NinthArmyMomentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthArmyMoment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NinthArmyMomentUpdateComponent,
    resolve: {
      ninthArmyMoment: NinthArmyMomentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthArmyMoment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
