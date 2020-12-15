import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, Router, Routes} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';

import {Authority} from 'app/shared/constants/authority.constants';
import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
import {INinthUnit, NinthUnit} from 'app/shared/model/ninth-unit.model';
import {NinthUnitService} from './ninth-unit.service';
import {NinthUnitComponent} from './ninth-unit.component';
import {NinthUnitDetailComponent} from './ninth-unit-detail.component';
import {NinthUnitUpdateComponent} from './ninth-unit-update.component';

@Injectable({providedIn: 'root'})
export class NinthUnitResolve implements Resolve<INinthUnit> {
  constructor(private service: NinthUnitService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<INinthUnit> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ninthUnit: HttpResponse<NinthUnit>) => {
          if (ninthUnit.body) {
            return of(ninthUnit.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NinthUnit());
  }
}

export const ninthUnitRoute: Routes = [
  {
    path: '',
    component: NinthUnitComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NinthUnitDetailComponent,
    resolve: {
      ninthUnit: NinthUnitResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NinthUnitUpdateComponent,
    resolve: {
      ninthUnit: NinthUnitResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NinthUnitUpdateComponent,
    resolve: {
      ninthUnit: NinthUnitResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
