import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {JhiEventManager} from 'ng-jhipster';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {INinthObjective} from 'app/shared/model/ninth-objective.model';
import {NinthObjectiveService} from './ninth-objective.service';
import {NinthObjectiveDeleteDialogComponent} from './ninth-objective-delete-dialog.component';

@Component({
  selector: 'jhi-ninth-objective',
  templateUrl: './ninth-objective.component.html',
})
export class NinthObjectiveComponent implements OnInit, OnDestroy {
  ninthObjectives?: INinthObjective[];
  eventSubscriber?: Subscription;

  constructor(
    protected ninthObjectiveService: NinthObjectiveService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.ninthObjectiveService.query().subscribe((res: HttpResponse<INinthObjective[]>) => (this.ninthObjectives = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNinthObjectives();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INinthObjective): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNinthObjectives(): void {
    this.eventSubscriber = this.eventManager.subscribe('ninthObjectiveListModification', () => this.loadAll());
  }

  delete(ninthObjective: INinthObjective): void {
    const modalRef = this.modalService.open(NinthObjectiveDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ninthObjective = ninthObjective;
  }
}
