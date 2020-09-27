import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        },
        {
          path: 'entities',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./entities/entities-routing.module').then(m => m.N42CEntitiesRoutingModule),
        },
        {
          path: 'user',
          loadChildren: () => import('./user/user-routing.module').then(m => m.UserRoutingModule),
        },
        {
          path: 'blog',
          loadChildren: () => import('./blog/blog-routing.module').then(m => m.BlogRoutingModule),
        },
        {
          path: 'profile',
          loadChildren: () => import('./profile/profile-routing.module').then(m => m.ProfileRoutingModule),
        },
        {
          path: 'shop',
          loadChildren: () => import('./shop/shop-routing.module').then(m => m.ShopRoutingModule),
        },
        {
          path: 'campaign',
          loadChildren: () => import('./campaign/campaign-routing.module').then(m => m.CampaignRoutingModule),
        },
        {
          path: 'scriptorium',
          loadChildren: () => import('./scriptorium/scriptorium-routing.module').then(m => m.ScriptoriumRoutingModule),
        },
        ...LAYOUT_ROUTES,
        // add 'canActivate: AuthGuard' for catching unauth users
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class N42CAppRoutingModule {}
