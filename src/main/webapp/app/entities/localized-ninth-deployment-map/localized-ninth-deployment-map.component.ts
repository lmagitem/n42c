import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocalizedNinthDeploymentMap } from 'app/shared/model/localized-ninth-deployment-map.model';
import { LocalizedNinthDeploymentMapService } from './localized-ninth-deployment-map.service';
import { LocalizedNinthDeploymentMapDeleteDialogComponent } from './localized-ninth-deployment-map-delete-dialog.component';

@Component({
  selector: 'jhi-localized-ninth-deployment-map',
  templateUrl: './localized-ninth-deployment-map.component.html',
})
export class LocalizedNinthDeploymentMapComponent implements OnInit, OnDestroy {
  localizedNinthDeploymentMaps?: ILocalizedNinthDeploymentMap[];
  eventSubscriber?: Subscription;

  constructor(
    protected localizedNinthDeploymentMapService: LocalizedNinthDeploymentMapService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.localizedNinthDeploymentMapService
      .query()
      .subscribe((res: HttpResponse<ILocalizedNinthDeploymentMap[]>) => (this.localizedNinthDeploymentMaps = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLocalizedNinthDeploymentMaps();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILocalizedNinthDeploymentMap): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInLocalizedNinthDeploymentMaps(): void {
    this.eventSubscriber = this.eventManager.subscribe('localizedNinthDeploymentMapListModification', () => this.loadAll());
  }

  delete(localizedNinthDeploymentMap: ILocalizedNinthDeploymentMap): void {
    const modalRef = this.modalService.open(LocalizedNinthDeploymentMapDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.localizedNinthDeploymentMap = localizedNinthDeploymentMap;
  }
}
