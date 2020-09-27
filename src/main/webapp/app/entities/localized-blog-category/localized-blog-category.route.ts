import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILocalizedBlogCategory, LocalizedBlogCategory } from 'app/shared/model/localized-blog-category.model';
import { LocalizedBlogCategoryService } from './localized-blog-category.service';
import { LocalizedBlogCategoryComponent } from './localized-blog-category.component';
import { LocalizedBlogCategoryDetailComponent } from './localized-blog-category-detail.component';
import { LocalizedBlogCategoryUpdateComponent } from './localized-blog-category-update.component';

@Injectable({ providedIn: 'root' })
export class LocalizedBlogCategoryResolve implements Resolve<ILocalizedBlogCategory> {
  constructor(private service: LocalizedBlogCategoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocalizedBlogCategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((localizedBlogCategory: HttpResponse<LocalizedBlogCategory>) => {
          if (localizedBlogCategory.body) {
            return of(localizedBlogCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LocalizedBlogCategory());
  }
}

export const localizedBlogCategoryRoute: Routes = [
  {
    path: '',
    component: LocalizedBlogCategoryComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedBlogCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LocalizedBlogCategoryDetailComponent,
    resolve: {
      localizedBlogCategory: LocalizedBlogCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedBlogCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LocalizedBlogCategoryUpdateComponent,
    resolve: {
      localizedBlogCategory: LocalizedBlogCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedBlogCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LocalizedBlogCategoryUpdateComponent,
    resolve: {
      localizedBlogCategory: LocalizedBlogCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedBlogCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
