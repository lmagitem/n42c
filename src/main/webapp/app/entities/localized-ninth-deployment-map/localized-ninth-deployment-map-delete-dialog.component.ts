import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocalizedNinthDeploymentMap } from 'app/shared/model/localized-ninth-deployment-map.model';
import { LocalizedNinthDeploymentMapService } from './localized-ninth-deployment-map.service';

@Component({
  templateUrl: './localized-ninth-deployment-map-delete-dialog.component.html',
})
export class LocalizedNinthDeploymentMapDeleteDialogComponent {
  localizedNinthDeploymentMap?: ILocalizedNinthDeploymentMap;

  constructor(
    protected localizedNinthDeploymentMapService: LocalizedNinthDeploymentMapService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.localizedNinthDeploymentMapService.delete(id).subscribe(() => {
      this.eventManager.broadcast('localizedNinthDeploymentMapListModification');
      this.activeModal.close();
    });
  }
}
