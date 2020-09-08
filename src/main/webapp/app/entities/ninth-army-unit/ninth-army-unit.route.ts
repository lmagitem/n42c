import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INinthArmyUnit, NinthArmyUnit } from 'app/shared/model/ninth-army-unit.model';
import { NinthArmyUnitService } from './ninth-army-unit.service';
import { NinthArmyUnitComponent } from './ninth-army-unit.component';
import { NinthArmyUnitDetailComponent } from './ninth-army-unit-detail.component';
import { NinthArmyUnitUpdateComponent } from './ninth-army-unit-update.component';

@Injectable({ providedIn: 'root' })
export class NinthArmyUnitResolve implements Resolve<INinthArmyUnit> {
  constructor(private service: NinthArmyUnitService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INinthArmyUnit> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ninthArmyUnit: HttpResponse<NinthArmyUnit>) => {
          if (ninthArmyUnit.body) {
            return of(ninthArmyUnit.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NinthArmyUnit());
  }
}

export const ninthArmyUnitRoute: Routes = [
  {
    path: '',
    component: NinthArmyUnitComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthArmyUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NinthArmyUnitDetailComponent,
    resolve: {
      ninthArmyUnit: NinthArmyUnitResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthArmyUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NinthArmyUnitUpdateComponent,
    resolve: {
      ninthArmyUnit: NinthArmyUnitResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthArmyUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NinthArmyUnitUpdateComponent,
    resolve: {
      ninthArmyUnit: NinthArmyUnitResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthArmyUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
