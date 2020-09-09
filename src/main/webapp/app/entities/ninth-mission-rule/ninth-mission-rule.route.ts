import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INinthMissionRule, NinthMissionRule } from 'app/shared/model/ninth-mission-rule.model';
import { NinthMissionRuleService } from './ninth-mission-rule.service';
import { NinthMissionRuleComponent } from './ninth-mission-rule.component';
import { NinthMissionRuleDetailComponent } from './ninth-mission-rule-detail.component';
import { NinthMissionRuleUpdateComponent } from './ninth-mission-rule-update.component';

@Injectable({ providedIn: 'root' })
export class NinthMissionRuleResolve implements Resolve<INinthMissionRule> {
  constructor(private service: NinthMissionRuleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INinthMissionRule> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ninthMissionRule: HttpResponse<NinthMissionRule>) => {
          if (ninthMissionRule.body) {
            return of(ninthMissionRule.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NinthMissionRule());
  }
}

export const ninthMissionRuleRoute: Routes = [
  {
    path: '',
    component: NinthMissionRuleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthMissionRule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NinthMissionRuleDetailComponent,
    resolve: {
      ninthMissionRule: NinthMissionRuleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthMissionRule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NinthMissionRuleUpdateComponent,
    resolve: {
      ninthMissionRule: NinthMissionRuleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthMissionRule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NinthMissionRuleUpdateComponent,
    resolve: {
      ninthMissionRule: NinthMissionRuleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.ninthMissionRule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
