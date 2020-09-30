import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocalizedNinthObjective } from 'app/shared/model/localized-ninth-objective.model';
import { LocalizedNinthObjectiveService } from './localized-ninth-objective.service';
import { LocalizedNinthObjectiveDeleteDialogComponent } from './localized-ninth-objective-delete-dialog.component';

@Component({
  selector: 'jhi-localized-ninth-objective',
  templateUrl: './localized-ninth-objective.component.html',
})
export class LocalizedNinthObjectiveComponent implements OnInit, OnDestroy {
  localizedNinthObjectives?: ILocalizedNinthObjective[];
  eventSubscriber?: Subscription;

  constructor(
    protected localizedNinthObjectiveService: LocalizedNinthObjectiveService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.localizedNinthObjectiveService
      .query()
      .subscribe((res: HttpResponse<ILocalizedNinthObjective[]>) => (this.localizedNinthObjectives = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLocalizedNinthObjectives();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILocalizedNinthObjective): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInLocalizedNinthObjectives(): void {
    this.eventSubscriber = this.eventManager.subscribe('localizedNinthObjectiveListModification', () => this.loadAll());
  }

  delete(localizedNinthObjective: ILocalizedNinthObjective): void {
    const modalRef = this.modalService.open(LocalizedNinthObjectiveDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.localizedNinthObjective = localizedNinthObjective;
  }
}
