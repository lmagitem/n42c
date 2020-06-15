import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProfilePart, ProfilePart } from 'app/shared/model/profile-part.model';
import { ProfilePartService } from './profile-part.service';
import { ProfilePartComponent } from './profile-part.component';
import { ProfilePartDetailComponent } from './profile-part-detail.component';
import { ProfilePartUpdateComponent } from './profile-part-update.component';

@Injectable({ providedIn: 'root' })
export class ProfilePartResolve implements Resolve<IProfilePart> {
  constructor(private service: ProfilePartService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProfilePart> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((profilePart: HttpResponse<ProfilePart>) => {
          if (profilePart.body) {
            return of(profilePart.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProfilePart());
  }
}

export const profilePartRoute: Routes = [
  {
    path: '',
    component: ProfilePartComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.profilePart.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProfilePartDetailComponent,
    resolve: {
      profilePart: ProfilePartResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.profilePart.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProfilePartUpdateComponent,
    resolve: {
      profilePart: ProfilePartResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.profilePart.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProfilePartUpdateComponent,
    resolve: {
      profilePart: ProfilePartResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.profilePart.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
