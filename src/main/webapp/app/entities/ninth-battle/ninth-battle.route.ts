import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INinthBattle, NinthBattle } from 'app/shared/model/ninth-battle.model';
import { NinthBattleService } from './ninth-battle.service';
import { NinthBattleComponent } from './ninth-battle.component';
import { NinthBattleDetailComponent } from './ninth-battle-detail.component';
import { NinthBattleUpdateComponent } from './ninth-battle-update.component';

@Injectable({ providedIn: 'root' })
export class NinthBattleResolve implements Resolve<INinthBattle> {
  constructor(private service: NinthBattleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INinthBattle> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ninthBattle: HttpResponse<NinthBattle>) => {
          if (ninthBattle.body) {
            return of(ninthBattle.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NinthBattle());
  }
}

export const ninthBattleRoute: Routes = [
  {
    path: '',
    component: NinthBattleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthBattle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NinthBattleDetailComponent,
    resolve: {
      ninthBattle: NinthBattleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthBattle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NinthBattleUpdateComponent,
    resolve: {
      ninthBattle: NinthBattleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthBattle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NinthBattleUpdateComponent,
    resolve: {
      ninthBattle: NinthBattleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthBattle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
