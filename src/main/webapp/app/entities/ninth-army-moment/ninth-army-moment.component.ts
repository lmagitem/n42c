import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {JhiDataUtils, JhiEventManager} from 'ng-jhipster';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {INinthArmyMoment} from 'app/shared/model/ninth-army-moment.model';
import {NinthArmyMomentService} from './ninth-army-moment.service';
import {NinthArmyMomentDeleteDialogComponent} from './ninth-army-moment-delete-dialog.component';

@Component({
  selector: 'jhi-ninth-army-moment',
  templateUrl: './ninth-army-moment.component.html',
})
export class NinthArmyMomentComponent implements OnInit, OnDestroy {
  ninthArmyMoments?: INinthArmyMoment[];
  eventSubscriber?: Subscription;

  constructor(
    protected ninthArmyMomentService: NinthArmyMomentService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.ninthArmyMomentService.query().subscribe((res: HttpResponse<INinthArmyMoment[]>) => (this.ninthArmyMoments = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNinthArmyMoments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INinthArmyMoment): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInNinthArmyMoments(): void {
    this.eventSubscriber = this.eventManager.subscribe('ninthArmyMomentListModification', () => this.loadAll());
  }

  delete(ninthArmyMoment: INinthArmyMoment): void {
    const modalRef = this.modalService.open(NinthArmyMomentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ninthArmyMoment = ninthArmyMoment;
  }
}
