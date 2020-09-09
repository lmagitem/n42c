import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { LocalizedNinthMissionRuleComponent } from './localized-ninth-mission-rule.component';
import { LocalizedNinthMissionRuleDetailComponent } from './localized-ninth-mission-rule-detail.component';
import { LocalizedNinthMissionRuleUpdateComponent } from './localized-ninth-mission-rule-update.component';
import { LocalizedNinthMissionRuleDeleteDialogComponent } from './localized-ninth-mission-rule-delete-dialog.component';
import { localizedNinthMissionRuleRoute } from './localized-ninth-mission-rule.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(localizedNinthMissionRuleRoute)],
  declarations: [
    LocalizedNinthMissionRuleComponent,
    LocalizedNinthMissionRuleDetailComponent,
    LocalizedNinthMissionRuleUpdateComponent,
    LocalizedNinthMissionRuleDeleteDialogComponent,
  ],
  entryComponents: [LocalizedNinthMissionRuleDeleteDialogComponent],
})
export class N42CLocalizedNinthMissionRuleModule {}
