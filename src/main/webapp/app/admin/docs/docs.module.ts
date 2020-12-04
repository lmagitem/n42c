import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {N42CSharedModule} from 'app/shared/shared.module';

import {DocsComponent} from './docs.component';

import {docsRoute} from './docs.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild([docsRoute])],
  declarations: [DocsComponent],
})
export class DocsModule {
}
