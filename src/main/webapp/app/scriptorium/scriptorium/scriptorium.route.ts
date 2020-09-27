import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Resolve, ActivatedRouteSnapshot, Routes, Router} from '@angular/router';
import {Observable, of, EMPTY} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {Authority} from 'app/shared/constants/authority.constants';
import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
import {IShop, Shop} from 'app/shared/model/shop.model';
import {ScriptoriumService} from './scriptorium.service';
import {ScriptoriumComponent} from './scriptorium.component';

@Injectable({providedIn: 'root'})
export class ShopResolve implements Resolve<IShop> {
  constructor(private service: ScriptoriumService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IShop> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((shop: HttpResponse<Shop>) => {
          if (shop.body) {
            return of(shop.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Shop());
  }
}

export const scriptoriumRoute: Routes = [
  {
    path: '',
    component: ScriptoriumComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'n42cApp.shop.home.title',
    },
    canActivate: [UserRouteAccessService],
  }
];
