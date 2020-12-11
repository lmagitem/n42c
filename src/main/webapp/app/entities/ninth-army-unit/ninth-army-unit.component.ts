import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {JhiEventManager} from 'ng-jhipster';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {INinthArmyUnit} from 'app/shared/model/ninth-army-unit.model';
import {NinthArmyUnitService} from './ninth-army-unit.service';
import {NinthArmyUnitDeleteDialogComponent} from './ninth-army-unit-delete-dialog.component';

@Component({
  selector: 'jhi-ninth-army-unit',
  templateUrl: './ninth-army-unit.component.html',
})
export class NinthArmyUnitComponent implements OnInit, OnDestroy {
  ninthArmyUnits?: INinthArmyUnit[];
  eventSubscriber?: Subscription;

  constructor(
    protected ninthArmyUnitService: NinthArmyUnitService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.ninthArmyUnitService.query().subscribe((res: HttpResponse<INinthArmyUnit[]>) => (this.ninthArmyUnits = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNinthArmyUnits();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INinthArmyUnit): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNinthArmyUnits(): void {
    this.eventSubscriber = this.eventManager.subscribe('ninthArmyUnitListModification', () => this.loadAll());
  }

  delete(ninthArmyUnit: INinthArmyUnit): void {
    const modalRef = this.modalService.open(NinthArmyUnitDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ninthArmyUnit = ninthArmyUnit;
  }
}
