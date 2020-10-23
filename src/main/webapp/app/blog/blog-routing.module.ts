import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

@NgModule({
  imports: [
    /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    RouterModule.forChild([
      {
        path: '',
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./blog.module').then(m => m.BlogModule),
      },
    ]),
  ],
})
export class BlogRoutingModule {}
