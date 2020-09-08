import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INinthStratagemGroup, NinthStratagemGroup } from 'app/shared/model/ninth-stratagem-group.model';
import { NinthStratagemGroupService } from './ninth-stratagem-group.service';
import { NinthStratagemGroupComponent } from './ninth-stratagem-group.component';
import { NinthStratagemGroupDetailComponent } from './ninth-stratagem-group-detail.component';
import { NinthStratagemGroupUpdateComponent } from './ninth-stratagem-group-update.component';

@Injectable({ providedIn: 'root' })
export class NinthStratagemGroupResolve implements Resolve<INinthStratagemGroup> {
  constructor(private service: NinthStratagemGroupService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INinthStratagemGroup> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ninthStratagemGroup: HttpResponse<NinthStratagemGroup>) => {
          if (ninthStratagemGroup.body) {
            return of(ninthStratagemGroup.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NinthStratagemGroup());
  }
}

export const ninthStratagemGroupRoute: Routes = [
  {
    path: '',
    component: NinthStratagemGroupComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthStratagemGroup.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NinthStratagemGroupDetailComponent,
    resolve: {
      ninthStratagemGroup: NinthStratagemGroupResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthStratagemGroup.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NinthStratagemGroupUpdateComponent,
    resolve: {
      ninthStratagemGroup: NinthStratagemGroupResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthStratagemGroup.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NinthStratagemGroupUpdateComponent,
    resolve: {
      ninthStratagemGroup: NinthStratagemGroupResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthStratagemGroup.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
