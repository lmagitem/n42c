import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBlog, Blog } from 'app/shared/model/blog.model';
import { BlogListComponent } from './blog-list.component';
import { BlogComponent } from './blog.component';
import { BlogService } from 'app/entities/blog/blog.service';
import { BlogPostListComponent } from './blog-post/blog-post-list.component';

@Injectable({ providedIn: 'root' })
export class BlogResolve implements Resolve<IBlog> {
  constructor(private service: BlogService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBlog> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((blog: HttpResponse<Blog>) => {
          if (blog.body) {
            return of(blog.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Blog());
  }
}

export const blogRoute: Routes = [
  {
    path: '', // Shows most recent entries from all authorized blogs
    component: BlogPostListComponent,
    data: {
      pageTitle: 'n42cApp.blog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'list', // Shows the list of all blogs
    component: BlogListComponent,
    data: {
      defaultSort: 'id,asc',
      pageTitle: 'n42cApp.blog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new', // Create a new blog
    component: BlogComponent,
    resolve: {
      blog: BlogResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.blog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id', // Redirects to the post entries of that blog
    redirectTo: '/blog/:id/post',
    pathMatch: 'full',
  },
  {
    path: ':id/post', // The post entries of that blog
    canActivate: [UserRouteAccessService],
    loadChildren: () => import('./blog-post/blog-post.module').then(m => m.BlogPostModule),
  },
  {
    path: ':id/edit', // Edit an existing blog
    component: BlogComponent,
    resolve: {
      blog: BlogResolve,
    },
    data: {
      pageTitle: 'n42cApp.blog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
