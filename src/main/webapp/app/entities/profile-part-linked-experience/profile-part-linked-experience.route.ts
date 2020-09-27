import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProfilePartLinkedExperience, ProfilePartLinkedExperience } from 'app/shared/model/profile-part-linked-experience.model';
import { ProfilePartLinkedExperienceService } from './profile-part-linked-experience.service';
import { ProfilePartLinkedExperienceComponent } from './profile-part-linked-experience.component';
import { ProfilePartLinkedExperienceDetailComponent } from './profile-part-linked-experience-detail.component';
import { ProfilePartLinkedExperienceUpdateComponent } from './profile-part-linked-experience-update.component';

@Injectable({ providedIn: 'root' })
export class ProfilePartLinkedExperienceResolve implements Resolve<IProfilePartLinkedExperience> {
  constructor(private service: ProfilePartLinkedExperienceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProfilePartLinkedExperience> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((profilePartLinkedExperience: HttpResponse<ProfilePartLinkedExperience>) => {
          if (profilePartLinkedExperience.body) {
            return of(profilePartLinkedExperience.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProfilePartLinkedExperience());
  }
}

export const profilePartLinkedExperienceRoute: Routes = [
  {
    path: '',
    component: ProfilePartLinkedExperienceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.profilePartLinkedExperience.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProfilePartLinkedExperienceDetailComponent,
    resolve: {
      profilePartLinkedExperience: ProfilePartLinkedExperienceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.profilePartLinkedExperience.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProfilePartLinkedExperienceUpdateComponent,
    resolve: {
      profilePartLinkedExperience: ProfilePartLinkedExperienceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.profilePartLinkedExperience.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProfilePartLinkedExperienceUpdateComponent,
    resolve: {
      profilePartLinkedExperience: ProfilePartLinkedExperienceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.profilePartLinkedExperience.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
