import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILocalizedNinthObjective, LocalizedNinthObjective } from 'app/shared/model/localized-ninth-objective.model';
import { LocalizedNinthObjectiveService } from './localized-ninth-objective.service';
import { LocalizedNinthObjectiveComponent } from './localized-ninth-objective.component';
import { LocalizedNinthObjectiveDetailComponent } from './localized-ninth-objective-detail.component';
import { LocalizedNinthObjectiveUpdateComponent } from './localized-ninth-objective-update.component';

@Injectable({ providedIn: 'root' })
export class LocalizedNinthObjectiveResolve implements Resolve<ILocalizedNinthObjective> {
  constructor(private service: LocalizedNinthObjectiveService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocalizedNinthObjective> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((localizedNinthObjective: HttpResponse<LocalizedNinthObjective>) => {
          if (localizedNinthObjective.body) {
            return of(localizedNinthObjective.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LocalizedNinthObjective());
  }
}

export const localizedNinthObjectiveRoute: Routes = [
  {
    path: '',
    component: LocalizedNinthObjectiveComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthObjective.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LocalizedNinthObjectiveDetailComponent,
    resolve: {
      localizedNinthObjective: LocalizedNinthObjectiveResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthObjective.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LocalizedNinthObjectiveUpdateComponent,
    resolve: {
      localizedNinthObjective: LocalizedNinthObjectiveResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthObjective.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LocalizedNinthObjectiveUpdateComponent,
    resolve: {
      localizedNinthObjective: LocalizedNinthObjectiveResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthObjective.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
