import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProfilePartSimpleItem, ProfilePartSimpleItem } from 'app/shared/model/profile-part-simple-item.model';
import { ProfilePartSimpleItemService } from './profile-part-simple-item.service';
import { ProfilePartSimpleItemComponent } from './profile-part-simple-item.component';
import { ProfilePartSimpleItemDetailComponent } from './profile-part-simple-item-detail.component';
import { ProfilePartSimpleItemUpdateComponent } from './profile-part-simple-item-update.component';

@Injectable({ providedIn: 'root' })
export class ProfilePartSimpleItemResolve implements Resolve<IProfilePartSimpleItem> {
  constructor(private service: ProfilePartSimpleItemService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProfilePartSimpleItem> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((profilePartSimpleItem: HttpResponse<ProfilePartSimpleItem>) => {
          if (profilePartSimpleItem.body) {
            return of(profilePartSimpleItem.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProfilePartSimpleItem());
  }
}

export const profilePartSimpleItemRoute: Routes = [
  {
    path: '',
    component: ProfilePartSimpleItemComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.profilePartSimpleItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProfilePartSimpleItemDetailComponent,
    resolve: {
      profilePartSimpleItem: ProfilePartSimpleItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.profilePartSimpleItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProfilePartSimpleItemUpdateComponent,
    resolve: {
      profilePartSimpleItem: ProfilePartSimpleItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.profilePartSimpleItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProfilePartSimpleItemUpdateComponent,
    resolve: {
      profilePartSimpleItem: ProfilePartSimpleItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42CApp.profilePartSimpleItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
