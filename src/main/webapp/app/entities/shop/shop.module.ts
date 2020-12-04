import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {N42CSharedModule} from 'app/shared/shared.module';
import {ShopComponent} from './shop.component';
import {ShopDetailComponent} from './shop-detail.component';
import {ShopUpdateComponent} from './shop-update.component';
import {ShopDeleteDialogComponent} from './shop-delete-dialog.component';
import {shopRoute} from './shop.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(shopRoute)],
  declarations: [ShopComponent, ShopDetailComponent, ShopUpdateComponent, ShopDeleteDialogComponent],
  entryComponents: [ShopDeleteDialogComponent],
})
export class N42CShopModule {
}
