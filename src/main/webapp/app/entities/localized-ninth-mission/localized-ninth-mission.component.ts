import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocalizedNinthMission } from 'app/shared/model/localized-ninth-mission.model';
import { LocalizedNinthMissionService } from './localized-ninth-mission.service';
import { LocalizedNinthMissionDeleteDialogComponent } from './localized-ninth-mission-delete-dialog.component';

@Component({
  selector: 'jhi-localized-ninth-mission',
  templateUrl: './localized-ninth-mission.component.html',
})
export class LocalizedNinthMissionComponent implements OnInit, OnDestroy {
  localizedNinthMissions?: ILocalizedNinthMission[];
  eventSubscriber?: Subscription;

  constructor(
    protected localizedNinthMissionService: LocalizedNinthMissionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.localizedNinthMissionService
      .query()
      .subscribe((res: HttpResponse<ILocalizedNinthMission[]>) => (this.localizedNinthMissions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLocalizedNinthMissions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILocalizedNinthMission): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLocalizedNinthMissions(): void {
    this.eventSubscriber = this.eventManager.subscribe('localizedNinthMissionListModification', () => this.loadAll());
  }

  delete(localizedNinthMission: ILocalizedNinthMission): void {
    const modalRef = this.modalService.open(LocalizedNinthMissionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.localizedNinthMission = localizedNinthMission;
  }
}
