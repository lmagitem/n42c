import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProfilePartPreciseItem, ProfilePartPreciseItem } from 'app/shared/model/profile-part-precise-item.model';
import { ProfilePartPreciseItemService } from './profile-part-precise-item.service';
import { ProfilePartPreciseItemComponent } from './profile-part-precise-item.component';
import { ProfilePartPreciseItemDetailComponent } from './profile-part-precise-item-detail.component';
import { ProfilePartPreciseItemUpdateComponent } from './profile-part-precise-item-update.component';

@Injectable({ providedIn: 'root' })
export class ProfilePartPreciseItemResolve implements Resolve<IProfilePartPreciseItem> {
  constructor(private service: ProfilePartPreciseItemService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProfilePartPreciseItem> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((profilePartPreciseItem: HttpResponse<ProfilePartPreciseItem>) => {
          if (profilePartPreciseItem.body) {
            return of(profilePartPreciseItem.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProfilePartPreciseItem());
  }
}

export const profilePartPreciseItemRoute: Routes = [
  {
    path: '',
    component: ProfilePartPreciseItemComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.profilePartPreciseItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProfilePartPreciseItemDetailComponent,
    resolve: {
      profilePartPreciseItem: ProfilePartPreciseItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.profilePartPreciseItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProfilePartPreciseItemUpdateComponent,
    resolve: {
      profilePartPreciseItem: ProfilePartPreciseItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.profilePartPreciseItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProfilePartPreciseItemUpdateComponent,
    resolve: {
      profilePartPreciseItem: ProfilePartPreciseItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.profilePartPreciseItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
