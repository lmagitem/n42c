import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, Router, Routes} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';

import {Authority} from 'app/shared/constants/authority.constants';
import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
import {BlogCategory, IBlogCategory} from 'app/shared/model/blog-category.model';
import {BlogCategoryService} from './blog-category.service';
import {BlogCategoryComponent} from './blog-category.component';
import {BlogCategoryDetailComponent} from './blog-category-detail.component';
import {BlogCategoryUpdateComponent} from './blog-category-update.component';

@Injectable({providedIn: 'root'})
export class BlogCategoryResolve implements Resolve<IBlogCategory> {
  constructor(private service: BlogCategoryService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IBlogCategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((blogCategory: HttpResponse<BlogCategory>) => {
          if (blogCategory.body) {
            return of(blogCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BlogCategory());
  }
}

export const blogCategoryRoute: Routes = [
  {
    path: '',
    component: BlogCategoryComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.blogCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BlogCategoryDetailComponent,
    resolve: {
      blogCategory: BlogCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.blogCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BlogCategoryUpdateComponent,
    resolve: {
      blogCategory: BlogCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.blogCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BlogCategoryUpdateComponent,
    resolve: {
      blogCategory: BlogCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.blogCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
