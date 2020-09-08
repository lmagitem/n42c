import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { LocalizedNinthDeploymentMapComponent } from './localized-ninth-deployment-map.component';
import { LocalizedNinthDeploymentMapDetailComponent } from './localized-ninth-deployment-map-detail.component';
import { LocalizedNinthDeploymentMapUpdateComponent } from './localized-ninth-deployment-map-update.component';
import { LocalizedNinthDeploymentMapDeleteDialogComponent } from './localized-ninth-deployment-map-delete-dialog.component';
import { localizedNinthDeploymentMapRoute } from './localized-ninth-deployment-map.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(localizedNinthDeploymentMapRoute)],
  declarations: [
    LocalizedNinthDeploymentMapComponent,
    LocalizedNinthDeploymentMapDetailComponent,
    LocalizedNinthDeploymentMapUpdateComponent,
    LocalizedNinthDeploymentMapDeleteDialogComponent,
  ],
  entryComponents: [LocalizedNinthDeploymentMapDeleteDialogComponent],
})
export class N42CLocalizedNinthDeploymentMapModule {}
