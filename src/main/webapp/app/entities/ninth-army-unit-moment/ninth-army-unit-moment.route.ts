import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INinthArmyUnitMoment, NinthArmyUnitMoment } from 'app/shared/model/ninth-army-unit-moment.model';
import { NinthArmyUnitMomentService } from './ninth-army-unit-moment.service';
import { NinthArmyUnitMomentComponent } from './ninth-army-unit-moment.component';
import { NinthArmyUnitMomentDetailComponent } from './ninth-army-unit-moment-detail.component';
import { NinthArmyUnitMomentUpdateComponent } from './ninth-army-unit-moment-update.component';

@Injectable({ providedIn: 'root' })
export class NinthArmyUnitMomentResolve implements Resolve<INinthArmyUnitMoment> {
  constructor(private service: NinthArmyUnitMomentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INinthArmyUnitMoment> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ninthArmyUnitMoment: HttpResponse<NinthArmyUnitMoment>) => {
          if (ninthArmyUnitMoment.body) {
            return of(ninthArmyUnitMoment.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NinthArmyUnitMoment());
  }
}

export const ninthArmyUnitMomentRoute: Routes = [
  {
    path: '',
    component: NinthArmyUnitMomentComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthArmyUnitMoment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NinthArmyUnitMomentDetailComponent,
    resolve: {
      ninthArmyUnitMoment: NinthArmyUnitMomentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthArmyUnitMoment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NinthArmyUnitMomentUpdateComponent,
    resolve: {
      ninthArmyUnitMoment: NinthArmyUnitMomentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthArmyUnitMoment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NinthArmyUnitMomentUpdateComponent,
    resolve: {
      ninthArmyUnitMoment: NinthArmyUnitMomentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthArmyUnitMoment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
