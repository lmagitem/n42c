import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILocalizedNinthDeploymentMap, LocalizedNinthDeploymentMap } from 'app/shared/model/localized-ninth-deployment-map.model';
import { LocalizedNinthDeploymentMapService } from './localized-ninth-deployment-map.service';
import { LocalizedNinthDeploymentMapComponent } from './localized-ninth-deployment-map.component';
import { LocalizedNinthDeploymentMapDetailComponent } from './localized-ninth-deployment-map-detail.component';
import { LocalizedNinthDeploymentMapUpdateComponent } from './localized-ninth-deployment-map-update.component';

@Injectable({ providedIn: 'root' })
export class LocalizedNinthDeploymentMapResolve implements Resolve<ILocalizedNinthDeploymentMap> {
  constructor(private service: LocalizedNinthDeploymentMapService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocalizedNinthDeploymentMap> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((localizedNinthDeploymentMap: HttpResponse<LocalizedNinthDeploymentMap>) => {
          if (localizedNinthDeploymentMap.body) {
            return of(localizedNinthDeploymentMap.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LocalizedNinthDeploymentMap());
  }
}

export const localizedNinthDeploymentMapRoute: Routes = [
  {
    path: '',
    component: LocalizedNinthDeploymentMapComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthDeploymentMap.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LocalizedNinthDeploymentMapDetailComponent,
    resolve: {
      localizedNinthDeploymentMap: LocalizedNinthDeploymentMapResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthDeploymentMap.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LocalizedNinthDeploymentMapUpdateComponent,
    resolve: {
      localizedNinthDeploymentMap: LocalizedNinthDeploymentMapResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthDeploymentMap.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LocalizedNinthDeploymentMapUpdateComponent,
    resolve: {
      localizedNinthDeploymentMap: LocalizedNinthDeploymentMapResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthDeploymentMap.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
