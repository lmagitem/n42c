import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILocalizedProduct, LocalizedProduct } from 'app/shared/model/localized-product.model';
import { LocalizedProductService } from './localized-product.service';
import { LocalizedProductComponent } from './localized-product.component';
import { LocalizedProductDetailComponent } from './localized-product-detail.component';
import { LocalizedProductUpdateComponent } from './localized-product-update.component';

@Injectable({ providedIn: 'root' })
export class LocalizedProductResolve implements Resolve<ILocalizedProduct> {
  constructor(private service: LocalizedProductService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocalizedProduct> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((localizedProduct: HttpResponse<LocalizedProduct>) => {
          if (localizedProduct.body) {
            return of(localizedProduct.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LocalizedProduct());
  }
}

export const localizedProductRoute: Routes = [
  {
    path: '',
    component: LocalizedProductComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedProduct.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LocalizedProductDetailComponent,
    resolve: {
      localizedProduct: LocalizedProductResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedProduct.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LocalizedProductUpdateComponent,
    resolve: {
      localizedProduct: LocalizedProductResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedProduct.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LocalizedProductUpdateComponent,
    resolve: {
      localizedProduct: LocalizedProductResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedProduct.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
