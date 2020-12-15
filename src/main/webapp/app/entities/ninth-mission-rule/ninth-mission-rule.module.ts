import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {N42CSharedModule} from 'app/shared/shared.module';
import {NinthMissionRuleComponent} from './ninth-mission-rule.component';
import {NinthMissionRuleDetailComponent} from './ninth-mission-rule-detail.component';
import {NinthMissionRuleUpdateComponent} from './ninth-mission-rule-update.component';
import {NinthMissionRuleDeleteDialogComponent} from './ninth-mission-rule-delete-dialog.component';
import {ninthMissionRuleRoute} from './ninth-mission-rule.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(ninthMissionRuleRoute)],
  declarations: [
    NinthMissionRuleComponent,
    NinthMissionRuleDetailComponent,
    NinthMissionRuleUpdateComponent,
    NinthMissionRuleDeleteDialogComponent,
  ],
  entryComponents: [NinthMissionRuleDeleteDialogComponent],
})
export class N42CNinthMissionRuleModule {}
