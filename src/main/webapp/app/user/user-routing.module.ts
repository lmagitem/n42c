import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {Authority} from "app/shared/constants/authority.constants";
import {UserRouteAccessService} from "app/core/auth/user-route-access-service";

@NgModule({
  imports: [
    /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    RouterModule.forChild([
      {
        path: 'account',
        data: {
          authorities: [Authority.USER],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
      }
    ]),
  ],
})
export class UserRoutingModule {
}
