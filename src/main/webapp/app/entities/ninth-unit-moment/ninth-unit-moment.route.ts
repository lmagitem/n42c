import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INinthUnitMoment, NinthUnitMoment } from 'app/shared/model/ninth-unit-moment.model';
import { NinthUnitMomentService } from './ninth-unit-moment.service';
import { NinthUnitMomentComponent } from './ninth-unit-moment.component';
import { NinthUnitMomentDetailComponent } from './ninth-unit-moment-detail.component';
import { NinthUnitMomentUpdateComponent } from './ninth-unit-moment-update.component';

@Injectable({ providedIn: 'root' })
export class NinthUnitMomentResolve implements Resolve<INinthUnitMoment> {
  constructor(private service: NinthUnitMomentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INinthUnitMoment> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ninthUnitMoment: HttpResponse<NinthUnitMoment>) => {
          if (ninthUnitMoment.body) {
            return of(ninthUnitMoment.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NinthUnitMoment());
  }
}

export const ninthUnitMomentRoute: Routes = [
  {
    path: '',
    component: NinthUnitMomentComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthUnitMoment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NinthUnitMomentDetailComponent,
    resolve: {
      ninthUnitMoment: NinthUnitMomentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthUnitMoment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NinthUnitMomentUpdateComponent,
    resolve: {
      ninthUnitMoment: NinthUnitMomentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthUnitMoment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NinthUnitMomentUpdateComponent,
    resolve: {
      ninthUnitMoment: NinthUnitMomentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthUnitMoment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
