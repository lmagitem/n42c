import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INinthMission } from 'app/shared/model/ninth-mission.model';
import { NinthMissionService } from './ninth-mission.service';
import { NinthMissionDeleteDialogComponent } from './ninth-mission-delete-dialog.component';

@Component({
  selector: 'jhi-ninth-mission',
  templateUrl: './ninth-mission.component.html',
})
export class NinthMissionComponent implements OnInit, OnDestroy {
  ninthMissions?: INinthMission[];
  eventSubscriber?: Subscription;

  constructor(
    protected ninthMissionService: NinthMissionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.ninthMissionService.query().subscribe((res: HttpResponse<INinthMission[]>) => (this.ninthMissions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNinthMissions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INinthMission): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNinthMissions(): void {
    this.eventSubscriber = this.eventManager.subscribe('ninthMissionListModification', () => this.loadAll());
  }

  delete(ninthMission: INinthMission): void {
    const modalRef = this.modalService.open(NinthMissionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ninthMission = ninthMission;
  }
}
