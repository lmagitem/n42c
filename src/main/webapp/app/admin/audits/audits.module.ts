import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {N42CSharedModule} from 'app/shared/shared.module';

import {AuditsComponent} from './audits.component';

import {auditsRoute} from './audits.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild([auditsRoute])],
  declarations: [AuditsComponent],
})
export class AuditsModule {}
