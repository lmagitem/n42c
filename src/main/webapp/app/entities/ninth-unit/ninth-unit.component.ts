import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INinthUnit } from 'app/shared/model/ninth-unit.model';
import { NinthUnitService } from './ninth-unit.service';
import { NinthUnitDeleteDialogComponent } from './ninth-unit-delete-dialog.component';

@Component({
  selector: 'jhi-ninth-unit',
  templateUrl: './ninth-unit.component.html',
})
export class NinthUnitComponent implements OnInit, OnDestroy {
  ninthUnits?: INinthUnit[];
  eventSubscriber?: Subscription;

  constructor(protected ninthUnitService: NinthUnitService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.ninthUnitService.query().subscribe((res: HttpResponse<INinthUnit[]>) => (this.ninthUnits = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNinthUnits();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INinthUnit): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNinthUnits(): void {
    this.eventSubscriber = this.eventManager.subscribe('ninthUnitListModification', () => this.loadAll());
  }

  delete(ninthUnit: INinthUnit): void {
    const modalRef = this.modalService.open(NinthUnitDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ninthUnit = ninthUnit;
  }
}
