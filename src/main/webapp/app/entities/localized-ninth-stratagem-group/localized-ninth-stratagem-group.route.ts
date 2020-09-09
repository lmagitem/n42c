import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILocalizedNinthStratagemGroup, LocalizedNinthStratagemGroup } from 'app/shared/model/localized-ninth-stratagem-group.model';
import { LocalizedNinthStratagemGroupService } from './localized-ninth-stratagem-group.service';
import { LocalizedNinthStratagemGroupComponent } from './localized-ninth-stratagem-group.component';
import { LocalizedNinthStratagemGroupDetailComponent } from './localized-ninth-stratagem-group-detail.component';
import { LocalizedNinthStratagemGroupUpdateComponent } from './localized-ninth-stratagem-group-update.component';

@Injectable({ providedIn: 'root' })
export class LocalizedNinthStratagemGroupResolve implements Resolve<ILocalizedNinthStratagemGroup> {
  constructor(private service: LocalizedNinthStratagemGroupService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocalizedNinthStratagemGroup> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((localizedNinthStratagemGroup: HttpResponse<LocalizedNinthStratagemGroup>) => {
          if (localizedNinthStratagemGroup.body) {
            return of(localizedNinthStratagemGroup.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LocalizedNinthStratagemGroup());
  }
}

export const localizedNinthStratagemGroupRoute: Routes = [
  {
    path: '',
    component: LocalizedNinthStratagemGroupComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthStratagemGroup.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LocalizedNinthStratagemGroupDetailComponent,
    resolve: {
      localizedNinthStratagemGroup: LocalizedNinthStratagemGroupResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthStratagemGroup.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LocalizedNinthStratagemGroupUpdateComponent,
    resolve: {
      localizedNinthStratagemGroup: LocalizedNinthStratagemGroupResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthStratagemGroup.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LocalizedNinthStratagemGroupUpdateComponent,
    resolve: {
      localizedNinthStratagemGroup: LocalizedNinthStratagemGroupResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthStratagemGroup.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
