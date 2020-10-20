import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILocalizedNinthMissionRule, LocalizedNinthMissionRule } from 'app/shared/model/localized-ninth-mission-rule.model';
import { LocalizedNinthMissionRuleService } from './localized-ninth-mission-rule.service';
import { LocalizedNinthMissionRuleComponent } from './localized-ninth-mission-rule.component';
import { LocalizedNinthMissionRuleDetailComponent } from './localized-ninth-mission-rule-detail.component';
import { LocalizedNinthMissionRuleUpdateComponent } from './localized-ninth-mission-rule-update.component';

@Injectable({ providedIn: 'root' })
export class LocalizedNinthMissionRuleResolve implements Resolve<ILocalizedNinthMissionRule> {
  constructor(private service: LocalizedNinthMissionRuleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocalizedNinthMissionRule> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((localizedNinthMissionRule: HttpResponse<LocalizedNinthMissionRule>) => {
          if (localizedNinthMissionRule.body) {
            return of(localizedNinthMissionRule.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LocalizedNinthMissionRule());
  }
}

export const localizedNinthMissionRuleRoute: Routes = [
  {
    path: '',
    component: LocalizedNinthMissionRuleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedNinthMissionRule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LocalizedNinthMissionRuleDetailComponent,
    resolve: {
      localizedNinthMissionRule: LocalizedNinthMissionRuleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedNinthMissionRule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LocalizedNinthMissionRuleUpdateComponent,
    resolve: {
      localizedNinthMissionRule: LocalizedNinthMissionRuleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedNinthMissionRule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LocalizedNinthMissionRuleUpdateComponent,
    resolve: {
      localizedNinthMissionRule: LocalizedNinthMissionRuleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedNinthMissionRule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
