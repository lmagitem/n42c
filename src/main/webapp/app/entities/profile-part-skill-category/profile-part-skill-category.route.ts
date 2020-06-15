import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProfilePartSkillCategory, ProfilePartSkillCategory } from 'app/shared/model/profile-part-skill-category.model';
import { ProfilePartSkillCategoryService } from './profile-part-skill-category.service';
import { ProfilePartSkillCategoryComponent } from './profile-part-skill-category.component';
import { ProfilePartSkillCategoryDetailComponent } from './profile-part-skill-category-detail.component';
import { ProfilePartSkillCategoryUpdateComponent } from './profile-part-skill-category-update.component';

@Injectable({ providedIn: 'root' })
export class ProfilePartSkillCategoryResolve implements Resolve<IProfilePartSkillCategory> {
  constructor(private service: ProfilePartSkillCategoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProfilePartSkillCategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((profilePartSkillCategory: HttpResponse<ProfilePartSkillCategory>) => {
          if (profilePartSkillCategory.body) {
            return of(profilePartSkillCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProfilePartSkillCategory());
  }
}

export const profilePartSkillCategoryRoute: Routes = [
  {
    path: '',
    component: ProfilePartSkillCategoryComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.profilePartSkillCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProfilePartSkillCategoryDetailComponent,
    resolve: {
      profilePartSkillCategory: ProfilePartSkillCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.profilePartSkillCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProfilePartSkillCategoryUpdateComponent,
    resolve: {
      profilePartSkillCategory: ProfilePartSkillCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.profilePartSkillCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProfilePartSkillCategoryUpdateComponent,
    resolve: {
      profilePartSkillCategory: ProfilePartSkillCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.profilePartSkillCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
