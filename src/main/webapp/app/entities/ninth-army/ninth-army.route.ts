import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, Router, Routes} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';

import {Authority} from 'app/shared/constants/authority.constants';
import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
import {INinthArmy, NinthArmy} from 'app/shared/model/ninth-army.model';
import {NinthArmyService} from './ninth-army.service';
import {NinthArmyComponent} from './ninth-army.component';
import {NinthArmyDetailComponent} from './ninth-army-detail.component';
import {NinthArmyUpdateComponent} from './ninth-army-update.component';

@Injectable({providedIn: 'root'})
export class NinthArmyResolve implements Resolve<INinthArmy> {
  constructor(private service: NinthArmyService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<INinthArmy> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ninthArmy: HttpResponse<NinthArmy>) => {
          if (ninthArmy.body) {
            return of(ninthArmy.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NinthArmy());
  }
}

export const ninthArmyRoute: Routes = [
  {
    path: '',
    component: NinthArmyComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthArmy.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NinthArmyDetailComponent,
    resolve: {
      ninthArmy: NinthArmyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthArmy.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NinthArmyUpdateComponent,
    resolve: {
      ninthArmy: NinthArmyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthArmy.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NinthArmyUpdateComponent,
    resolve: {
      ninthArmy: NinthArmyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthArmy.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
