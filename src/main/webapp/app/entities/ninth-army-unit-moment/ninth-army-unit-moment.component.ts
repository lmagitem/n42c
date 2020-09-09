import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INinthArmyUnitMoment } from 'app/shared/model/ninth-army-unit-moment.model';
import { NinthArmyUnitMomentService } from './ninth-army-unit-moment.service';
import { NinthArmyUnitMomentDeleteDialogComponent } from './ninth-army-unit-moment-delete-dialog.component';

@Component({
  selector: 'jhi-ninth-army-unit-moment',
  templateUrl: './ninth-army-unit-moment.component.html',
})
export class NinthArmyUnitMomentComponent implements OnInit, OnDestroy {
  ninthArmyUnitMoments?: INinthArmyUnitMoment[];
  eventSubscriber?: Subscription;

  constructor(
    protected ninthArmyUnitMomentService: NinthArmyUnitMomentService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.ninthArmyUnitMomentService
      .query()
      .subscribe((res: HttpResponse<INinthArmyUnitMoment[]>) => (this.ninthArmyUnitMoments = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNinthArmyUnitMoments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INinthArmyUnitMoment): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNinthArmyUnitMoments(): void {
    this.eventSubscriber = this.eventManager.subscribe('ninthArmyUnitMomentListModification', () => this.loadAll());
  }

  delete(ninthArmyUnitMoment: INinthArmyUnitMoment): void {
    const modalRef = this.modalService.open(NinthArmyUnitMomentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ninthArmyUnitMoment = ninthArmyUnitMoment;
  }
}
