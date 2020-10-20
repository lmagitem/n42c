import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { N42CSharedModule } from 'app/shared/shared.module';
import { ScriptoriumComponent } from './scriptorium.component';
import { scriptoriumRoute } from './scriptorium.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(scriptoriumRoute)],
  declarations: [ScriptoriumComponent],
})
export class ScriptoriumModule {}
