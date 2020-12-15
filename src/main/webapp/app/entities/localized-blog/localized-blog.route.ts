import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, Router, Routes} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';

import {Authority} from 'app/shared/constants/authority.constants';
import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
import {ILocalizedBlog, LocalizedBlog} from 'app/shared/model/localized-blog.model';
import {LocalizedBlogService} from './localized-blog.service';
import {LocalizedBlogComponent} from './localized-blog.component';
import {LocalizedBlogDetailComponent} from './localized-blog-detail.component';
import {LocalizedBlogUpdateComponent} from './localized-blog-update.component';

@Injectable({providedIn: 'root'})
export class LocalizedBlogResolve implements Resolve<ILocalizedBlog> {
  constructor(private service: LocalizedBlogService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ILocalizedBlog> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((localizedBlog: HttpResponse<LocalizedBlog>) => {
          if (localizedBlog.body) {
            return of(localizedBlog.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LocalizedBlog());
  }
}

export const localizedBlogRoute: Routes = [
  {
    path: '',
    component: LocalizedBlogComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedBlog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LocalizedBlogDetailComponent,
    resolve: {
      localizedBlog: LocalizedBlogResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedBlog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LocalizedBlogUpdateComponent,
    resolve: {
      localizedBlog: LocalizedBlogResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedBlog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LocalizedBlogUpdateComponent,
    resolve: {
      localizedBlog: LocalizedBlogResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedBlog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
