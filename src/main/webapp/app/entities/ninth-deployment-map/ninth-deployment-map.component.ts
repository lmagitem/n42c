import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {JhiEventManager} from 'ng-jhipster';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {INinthDeploymentMap} from 'app/shared/model/ninth-deployment-map.model';
import {NinthDeploymentMapService} from './ninth-deployment-map.service';
import {NinthDeploymentMapDeleteDialogComponent} from './ninth-deployment-map-delete-dialog.component';

@Component({
  selector: 'jhi-ninth-deployment-map',
  templateUrl: './ninth-deployment-map.component.html',
})
export class NinthDeploymentMapComponent implements OnInit, OnDestroy {
  ninthDeploymentMaps?: INinthDeploymentMap[];
  eventSubscriber?: Subscription;

  constructor(
    protected ninthDeploymentMapService: NinthDeploymentMapService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.ninthDeploymentMapService
      .query()
      .subscribe((res: HttpResponse<INinthDeploymentMap[]>) => (this.ninthDeploymentMaps = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNinthDeploymentMaps();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INinthDeploymentMap): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNinthDeploymentMaps(): void {
    this.eventSubscriber = this.eventManager.subscribe('ninthDeploymentMapListModification', () => this.loadAll());
  }

  delete(ninthDeploymentMap: INinthDeploymentMap): void {
    const modalRef = this.modalService.open(NinthDeploymentMapDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ninthDeploymentMap = ninthDeploymentMap;
  }
}
