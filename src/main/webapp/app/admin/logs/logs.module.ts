import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {N42CSharedModule} from 'app/shared/shared.module';

import {LogsComponent} from './logs.component';

import {logsRoute} from './logs.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild([logsRoute])],
  declarations: [LogsComponent],
})
export class LogsModule {
}
