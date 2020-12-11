import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, Router, Routes} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';

import {Authority} from 'app/shared/constants/authority.constants';
import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
import {IProfilePartSkill, ProfilePartSkill} from 'app/shared/model/profile-part-skill.model';
import {ProfilePartSkillService} from './profile-part-skill.service';
import {ProfilePartSkillComponent} from './profile-part-skill.component';
import {ProfilePartSkillDetailComponent} from './profile-part-skill-detail.component';
import {ProfilePartSkillUpdateComponent} from './profile-part-skill-update.component';

@Injectable({ providedIn: 'root' })
export class ProfilePartSkillResolve implements Resolve<IProfilePartSkill> {
  constructor(private service: ProfilePartSkillService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProfilePartSkill> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((profilePartSkill: HttpResponse<ProfilePartSkill>) => {
          if (profilePartSkill.body) {
            return of(profilePartSkill.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProfilePartSkill());
  }
}

export const profilePartSkillRoute: Routes = [
  {
    path: '',
    component: ProfilePartSkillComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.profilePartSkill.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProfilePartSkillDetailComponent,
    resolve: {
      profilePartSkill: ProfilePartSkillResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.profilePartSkill.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProfilePartSkillUpdateComponent,
    resolve: {
      profilePartSkill: ProfilePartSkillResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.profilePartSkill.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProfilePartSkillUpdateComponent,
    resolve: {
      profilePartSkill: ProfilePartSkillResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.profilePartSkill.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
