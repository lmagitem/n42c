import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INinthDeploymentMap, NinthDeploymentMap } from 'app/shared/model/ninth-deployment-map.model';
import { NinthDeploymentMapService } from './ninth-deployment-map.service';
import { NinthDeploymentMapComponent } from './ninth-deployment-map.component';
import { NinthDeploymentMapDetailComponent } from './ninth-deployment-map-detail.component';
import { NinthDeploymentMapUpdateComponent } from './ninth-deployment-map-update.component';

@Injectable({ providedIn: 'root' })
export class NinthDeploymentMapResolve implements Resolve<INinthDeploymentMap> {
  constructor(private service: NinthDeploymentMapService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INinthDeploymentMap> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ninthDeploymentMap: HttpResponse<NinthDeploymentMap>) => {
          if (ninthDeploymentMap.body) {
            return of(ninthDeploymentMap.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NinthDeploymentMap());
  }
}

export const ninthDeploymentMapRoute: Routes = [
  {
    path: '',
    component: NinthDeploymentMapComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthDeploymentMap.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NinthDeploymentMapDetailComponent,
    resolve: {
      ninthDeploymentMap: NinthDeploymentMapResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthDeploymentMap.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NinthDeploymentMapUpdateComponent,
    resolve: {
      ninthDeploymentMap: NinthDeploymentMapResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthDeploymentMap.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NinthDeploymentMapUpdateComponent,
    resolve: {
      ninthDeploymentMap: NinthDeploymentMapResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthDeploymentMap.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
