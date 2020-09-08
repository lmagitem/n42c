import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocalizedNinthStratagemGroup } from 'app/shared/model/localized-ninth-stratagem-group.model';
import { LocalizedNinthStratagemGroupService } from './localized-ninth-stratagem-group.service';
import { LocalizedNinthStratagemGroupDeleteDialogComponent } from './localized-ninth-stratagem-group-delete-dialog.component';

@Component({
  selector: 'jhi-localized-ninth-stratagem-group',
  templateUrl: './localized-ninth-stratagem-group.component.html',
})
export class LocalizedNinthStratagemGroupComponent implements OnInit, OnDestroy {
  localizedNinthStratagemGroups?: ILocalizedNinthStratagemGroup[];
  eventSubscriber?: Subscription;

  constructor(
    protected localizedNinthStratagemGroupService: LocalizedNinthStratagemGroupService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.localizedNinthStratagemGroupService
      .query()
      .subscribe((res: HttpResponse<ILocalizedNinthStratagemGroup[]>) => (this.localizedNinthStratagemGroups = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLocalizedNinthStratagemGroups();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILocalizedNinthStratagemGroup): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLocalizedNinthStratagemGroups(): void {
    this.eventSubscriber = this.eventManager.subscribe('localizedNinthStratagemGroupListModification', () => this.loadAll());
  }

  delete(localizedNinthStratagemGroup: ILocalizedNinthStratagemGroup): void {
    const modalRef = this.modalService.open(LocalizedNinthStratagemGroupDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.localizedNinthStratagemGroup = localizedNinthStratagemGroup;
  }
}
