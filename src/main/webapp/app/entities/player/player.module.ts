import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { PlayerComponent } from './player.component';
import { PlayerDetailComponent } from './player-detail.component';
import { PlayerUpdateComponent } from './player-update.component';
import { PlayerDeleteDialogComponent } from './player-delete-dialog.component';
import { playerRoute } from './player.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(playerRoute)],
  declarations: [PlayerComponent, PlayerDetailComponent, PlayerUpdateComponent, PlayerDeleteDialogComponent],
  entryComponents: [PlayerDeleteDialogComponent],
})
export class N42CPlayerModule {}
