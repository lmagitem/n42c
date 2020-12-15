import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, Router, Routes} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';

import {Authority} from 'app/shared/constants/authority.constants';
import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
import {INinthObjective, NinthObjective} from 'app/shared/model/ninth-objective.model';
import {NinthObjectiveService} from './ninth-objective.service';
import {NinthObjectiveComponent} from './ninth-objective.component';
import {NinthObjectiveDetailComponent} from './ninth-objective-detail.component';
import {NinthObjectiveUpdateComponent} from './ninth-objective-update.component';

@Injectable({ providedIn: 'root' })
export class NinthObjectiveResolve implements Resolve<INinthObjective> {
  constructor(private service: NinthObjectiveService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INinthObjective> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ninthObjective: HttpResponse<NinthObjective>) => {
          if (ninthObjective.body) {
            return of(ninthObjective.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NinthObjective());
  }
}

export const ninthObjectiveRoute: Routes = [
  {
    path: '',
    component: NinthObjectiveComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthObjective.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NinthObjectiveDetailComponent,
    resolve: {
      ninthObjective: NinthObjectiveResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthObjective.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NinthObjectiveUpdateComponent,
    resolve: {
      ninthObjective: NinthObjectiveResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthObjective.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NinthObjectiveUpdateComponent,
    resolve: {
      ninthObjective: NinthObjectiveResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthObjective.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
