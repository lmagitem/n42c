import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {N42CSharedModule} from 'app/shared/shared.module';
import {LocalizedProductComponent} from './localized-product.component';
import {LocalizedProductDetailComponent} from './localized-product-detail.component';
import {LocalizedProductUpdateComponent} from './localized-product-update.component';
import {LocalizedProductDeleteDialogComponent} from './localized-product-delete-dialog.component';
import {localizedProductRoute} from './localized-product.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(localizedProductRoute)],
  declarations: [
    LocalizedProductComponent,
    LocalizedProductDetailComponent,
    LocalizedProductUpdateComponent,
    LocalizedProductDeleteDialogComponent,
  ],
  entryComponents: [LocalizedProductDeleteDialogComponent],
})
export class N42CLocalizedProductModule {}
