import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INinthArmy } from 'app/shared/model/ninth-army.model';
import { NinthArmyService } from './ninth-army.service';
import { NinthArmyDeleteDialogComponent } from './ninth-army-delete-dialog.component';

@Component({
  selector: 'jhi-ninth-army',
  templateUrl: './ninth-army.component.html',
})
export class NinthArmyComponent implements OnInit, OnDestroy {
  ninthArmies?: INinthArmy[];
  eventSubscriber?: Subscription;

  constructor(protected ninthArmyService: NinthArmyService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.ninthArmyService.query().subscribe((res: HttpResponse<INinthArmy[]>) => (this.ninthArmies = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNinthArmies();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INinthArmy): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNinthArmies(): void {
    this.eventSubscriber = this.eventManager.subscribe('ninthArmyListModification', () => this.loadAll());
  }

  delete(ninthArmy: INinthArmy): void {
    const modalRef = this.modalService.open(NinthArmyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ninthArmy = ninthArmy;
  }
}
