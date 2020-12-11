import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, Router, Routes} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';

import {Authority} from 'app/shared/constants/authority.constants';
import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
import {ILocalizedBlogPost, LocalizedBlogPost} from 'app/shared/model/localized-blog-post.model';
import {LocalizedBlogPostService} from './localized-blog-post.service';
import {LocalizedBlogPostComponent} from './localized-blog-post.component';
import {LocalizedBlogPostDetailComponent} from './localized-blog-post-detail.component';
import {LocalizedBlogPostUpdateComponent} from './localized-blog-post-update.component';

@Injectable({ providedIn: 'root' })
export class LocalizedBlogPostResolve implements Resolve<ILocalizedBlogPost> {
  constructor(private service: LocalizedBlogPostService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocalizedBlogPost> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((localizedBlogPost: HttpResponse<LocalizedBlogPost>) => {
          if (localizedBlogPost.body) {
            return of(localizedBlogPost.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LocalizedBlogPost());
  }
}

export const localizedBlogPostRoute: Routes = [
  {
    path: '',
    component: LocalizedBlogPostComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedBlogPost.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LocalizedBlogPostDetailComponent,
    resolve: {
      localizedBlogPost: LocalizedBlogPostResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedBlogPost.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LocalizedBlogPostUpdateComponent,
    resolve: {
      localizedBlogPost: LocalizedBlogPostResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedBlogPost.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LocalizedBlogPostUpdateComponent,
    resolve: {
      localizedBlogPost: LocalizedBlogPostResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.localizedBlogPost.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
