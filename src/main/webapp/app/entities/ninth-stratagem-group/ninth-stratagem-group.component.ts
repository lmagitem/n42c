import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INinthStratagemGroup } from 'app/shared/model/ninth-stratagem-group.model';
import { NinthStratagemGroupService } from './ninth-stratagem-group.service';
import { NinthStratagemGroupDeleteDialogComponent } from './ninth-stratagem-group-delete-dialog.component';

@Component({
  selector: 'jhi-ninth-stratagem-group',
  templateUrl: './ninth-stratagem-group.component.html',
})
export class NinthStratagemGroupComponent implements OnInit, OnDestroy {
  ninthStratagemGroups?: INinthStratagemGroup[];
  eventSubscriber?: Subscription;

  constructor(
    protected ninthStratagemGroupService: NinthStratagemGroupService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.ninthStratagemGroupService
      .query()
      .subscribe((res: HttpResponse<INinthStratagemGroup[]>) => (this.ninthStratagemGroups = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNinthStratagemGroups();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INinthStratagemGroup): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNinthStratagemGroups(): void {
    this.eventSubscriber = this.eventManager.subscribe('ninthStratagemGroupListModification', () => this.loadAll());
  }

  delete(ninthStratagemGroup: INinthStratagemGroup): void {
    const modalRef = this.modalService.open(NinthStratagemGroupDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ninthStratagemGroup = ninthStratagemGroup;
  }
}
