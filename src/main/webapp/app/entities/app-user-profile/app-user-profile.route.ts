import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAppUserProfile, AppUserProfile } from 'app/shared/model/app-user-profile.model';
import { AppUserProfileService } from './app-user-profile.service';
import { AppUserProfileComponent } from './app-user-profile.component';
import { AppUserProfileDetailComponent } from './app-user-profile-detail.component';
import { AppUserProfileUpdateComponent } from './app-user-profile-update.component';

@Injectable({ providedIn: 'root' })
export class AppUserProfileResolve implements Resolve<IAppUserProfile> {
  constructor(private service: AppUserProfileService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAppUserProfile> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((appUserProfile: HttpResponse<AppUserProfile>) => {
          if (appUserProfile.body) {
            return of(appUserProfile.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AppUserProfile());
  }
}

export const appUserProfileRoute: Routes = [
  {
    path: '',
    component: AppUserProfileComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.appUserProfile.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AppUserProfileDetailComponent,
    resolve: {
      appUserProfile: AppUserProfileResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.appUserProfile.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AppUserProfileUpdateComponent,
    resolve: {
      appUserProfile: AppUserProfileResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.appUserProfile.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AppUserProfileUpdateComponent,
    resolve: {
      appUserProfile: AppUserProfileResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.appUserProfile.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
