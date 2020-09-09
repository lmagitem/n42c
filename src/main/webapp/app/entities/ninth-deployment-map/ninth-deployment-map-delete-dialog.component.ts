import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INinthDeploymentMap } from 'app/shared/model/ninth-deployment-map.model';
import { NinthDeploymentMapService } from './ninth-deployment-map.service';

@Component({
  templateUrl: './ninth-deployment-map-delete-dialog.component.html',
})
export class NinthDeploymentMapDeleteDialogComponent {
  ninthDeploymentMap?: INinthDeploymentMap;

  constructor(
    protected ninthDeploymentMapService: NinthDeploymentMapService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ninthDeploymentMapService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ninthDeploymentMapListModification');
      this.activeModal.close();
    });
  }
}
