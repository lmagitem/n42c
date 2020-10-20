import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INinthMission, NinthMission } from 'app/shared/model/ninth-mission.model';
import { NinthMissionService } from './ninth-mission.service';
import { NinthMissionComponent } from './ninth-mission.component';
import { NinthMissionDetailComponent } from './ninth-mission-detail.component';
import { NinthMissionUpdateComponent } from './ninth-mission-update.component';

@Injectable({ providedIn: 'root' })
export class NinthMissionResolve implements Resolve<INinthMission> {
  constructor(private service: NinthMissionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INinthMission> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ninthMission: HttpResponse<NinthMission>) => {
          if (ninthMission.body) {
            return of(ninthMission.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NinthMission());
  }
}

export const ninthMissionRoute: Routes = [
  {
    path: '',
    component: NinthMissionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthMission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NinthMissionDetailComponent,
    resolve: {
      ninthMission: NinthMissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthMission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NinthMissionUpdateComponent,
    resolve: {
      ninthMission: NinthMissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthMission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NinthMissionUpdateComponent,
    resolve: {
      ninthMission: NinthMissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthMission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
