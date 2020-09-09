import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { NinthBattleComponent } from './ninth-battle.component';
import { NinthBattleDetailComponent } from './ninth-battle-detail.component';
import { NinthBattleUpdateComponent } from './ninth-battle-update.component';
import { NinthBattleDeleteDialogComponent } from './ninth-battle-delete-dialog.component';
import { ninthBattleRoute } from './ninth-battle.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(ninthBattleRoute)],
  declarations: [NinthBattleComponent, NinthBattleDetailComponent, NinthBattleUpdateComponent, NinthBattleDeleteDialogComponent],
  entryComponents: [NinthBattleDeleteDialogComponent],
})
export class N42CNinthBattleModule {}
