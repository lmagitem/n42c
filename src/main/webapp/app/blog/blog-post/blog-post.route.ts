import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBlogPost, BlogPost } from 'app/shared/model/blog-post.model';
import { BlogPostListComponent } from './blog-post-list.component';
import { BlogPostComponent } from './blog-post.component';
import { BlogPostUpdateComponent } from './blog-post-update.component';
import { BlogPostService } from 'app/entities/blog-post/blog-post.service';
import { BlogResolve } from '../blog.route';

@Injectable({ providedIn: 'root' })
export class BlogPostResolve implements Resolve<IBlogPost> {
  constructor(private service: BlogPostService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBlogPost> | Observable<never> {
    const id = route.params['idPost'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((blogPost: HttpResponse<BlogPost>) => {
          if (blogPost.body) {
            return of(blogPost.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BlogPost());
  }
}

export const blogPostRoute: Routes = [
  {
    path: '',
    resolve: {
      blog: BlogResolve,
    },
    component: BlogPostListComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.blogPost.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idPost',
    component: BlogPostComponent,
    resolve: {
      blogPost: BlogPostResolve,
    },
    data: {
      pageTitle: 'n42cApp.blogPost.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BlogPostUpdateComponent,
    resolve: {
      blogPost: BlogPostResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.blogPost.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idPost/edit',
    component: BlogPostUpdateComponent,
    resolve: {
      blogPost: BlogPostResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.blogPost.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
