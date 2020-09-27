import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {N42CSharedModule} from 'app/shared/shared.module';

import {StateComponent} from './state.component';

import {stateRoute} from './state.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild([stateRoute])],
  declarations: [StateComponent],
})
export class StateModule {}
