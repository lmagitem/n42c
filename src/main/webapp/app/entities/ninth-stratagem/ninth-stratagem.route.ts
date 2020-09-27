import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INinthStratagem, NinthStratagem } from 'app/shared/model/ninth-stratagem.model';
import { NinthStratagemService } from './ninth-stratagem.service';
import { NinthStratagemComponent } from './ninth-stratagem.component';
import { NinthStratagemDetailComponent } from './ninth-stratagem-detail.component';
import { NinthStratagemUpdateComponent } from './ninth-stratagem-update.component';

@Injectable({ providedIn: 'root' })
export class NinthStratagemResolve implements Resolve<INinthStratagem> {
  constructor(private service: NinthStratagemService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INinthStratagem> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ninthStratagem: HttpResponse<NinthStratagem>) => {
          if (ninthStratagem.body) {
            return of(ninthStratagem.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NinthStratagem());
  }
}

export const ninthStratagemRoute: Routes = [
  {
    path: '',
    component: NinthStratagemComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthStratagem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NinthStratagemDetailComponent,
    resolve: {
      ninthStratagem: NinthStratagemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthStratagem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NinthStratagemUpdateComponent,
    resolve: {
      ninthStratagem: NinthStratagemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthStratagem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NinthStratagemUpdateComponent,
    resolve: {
      ninthStratagem: NinthStratagemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.ninthStratagem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
