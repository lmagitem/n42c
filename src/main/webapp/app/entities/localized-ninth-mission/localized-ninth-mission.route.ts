import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILocalizedNinthMission, LocalizedNinthMission } from 'app/shared/model/localized-ninth-mission.model';
import { LocalizedNinthMissionService } from './localized-ninth-mission.service';
import { LocalizedNinthMissionComponent } from './localized-ninth-mission.component';
import { LocalizedNinthMissionDetailComponent } from './localized-ninth-mission-detail.component';
import { LocalizedNinthMissionUpdateComponent } from './localized-ninth-mission-update.component';

@Injectable({ providedIn: 'root' })
export class LocalizedNinthMissionResolve implements Resolve<ILocalizedNinthMission> {
  constructor(private service: LocalizedNinthMissionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocalizedNinthMission> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((localizedNinthMission: HttpResponse<LocalizedNinthMission>) => {
          if (localizedNinthMission.body) {
            return of(localizedNinthMission.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LocalizedNinthMission());
  }
}

export const localizedNinthMissionRoute: Routes = [
  {
    path: '',
    component: LocalizedNinthMissionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthMission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LocalizedNinthMissionDetailComponent,
    resolve: {
      localizedNinthMission: LocalizedNinthMissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthMission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LocalizedNinthMissionUpdateComponent,
    resolve: {
      localizedNinthMission: LocalizedNinthMissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthMission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LocalizedNinthMissionUpdateComponent,
    resolve: {
      localizedNinthMission: LocalizedNinthMissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthMission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
