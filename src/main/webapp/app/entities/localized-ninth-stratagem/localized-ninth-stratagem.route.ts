import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILocalizedNinthStratagem, LocalizedNinthStratagem } from 'app/shared/model/localized-ninth-stratagem.model';
import { LocalizedNinthStratagemService } from './localized-ninth-stratagem.service';
import { LocalizedNinthStratagemComponent } from './localized-ninth-stratagem.component';
import { LocalizedNinthStratagemDetailComponent } from './localized-ninth-stratagem-detail.component';
import { LocalizedNinthStratagemUpdateComponent } from './localized-ninth-stratagem-update.component';

@Injectable({ providedIn: 'root' })
export class LocalizedNinthStratagemResolve implements Resolve<ILocalizedNinthStratagem> {
  constructor(private service: LocalizedNinthStratagemService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocalizedNinthStratagem> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((localizedNinthStratagem: HttpResponse<LocalizedNinthStratagem>) => {
          if (localizedNinthStratagem.body) {
            return of(localizedNinthStratagem.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LocalizedNinthStratagem());
  }
}

export const localizedNinthStratagemRoute: Routes = [
  {
    path: '',
    component: LocalizedNinthStratagemComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthStratagem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LocalizedNinthStratagemDetailComponent,
    resolve: {
      localizedNinthStratagem: LocalizedNinthStratagemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthStratagem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LocalizedNinthStratagemUpdateComponent,
    resolve: {
      localizedNinthStratagem: LocalizedNinthStratagemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthStratagem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LocalizedNinthStratagemUpdateComponent,
    resolve: {
      localizedNinthStratagem: LocalizedNinthStratagemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.localizedNinthStratagem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
