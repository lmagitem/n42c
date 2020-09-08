import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { N42CSharedModule } from 'app/shared/shared.module';
import { NinthDeploymentMapComponent } from './ninth-deployment-map.component';
import { NinthDeploymentMapDetailComponent } from './ninth-deployment-map-detail.component';
import { NinthDeploymentMapUpdateComponent } from './ninth-deployment-map-update.component';
import { NinthDeploymentMapDeleteDialogComponent } from './ninth-deployment-map-delete-dialog.component';
import { ninthDeploymentMapRoute } from './ninth-deployment-map.route';

@NgModule({
  imports: [N42CSharedModule, RouterModule.forChild(ninthDeploymentMapRoute)],
  declarations: [
    NinthDeploymentMapComponent,
    NinthDeploymentMapDetailComponent,
    NinthDeploymentMapUpdateComponent,
    NinthDeploymentMapDeleteDialogComponent,
  ],
  entryComponents: [NinthDeploymentMapDeleteDialogComponent],
})
export class N42CNinthDeploymentMapModule {}
