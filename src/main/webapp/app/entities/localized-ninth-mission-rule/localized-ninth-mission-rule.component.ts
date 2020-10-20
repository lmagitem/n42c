import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocalizedNinthMissionRule } from 'app/shared/model/localized-ninth-mission-rule.model';
import { LocalizedNinthMissionRuleService } from './localized-ninth-mission-rule.service';
import { LocalizedNinthMissionRuleDeleteDialogComponent } from './localized-ninth-mission-rule-delete-dialog.component';

@Component({
  selector: 'jhi-localized-ninth-mission-rule',
  templateUrl: './localized-ninth-mission-rule.component.html',
})
export class LocalizedNinthMissionRuleComponent implements OnInit, OnDestroy {
  localizedNinthMissionRules?: ILocalizedNinthMissionRule[];
  eventSubscriber?: Subscription;

  constructor(
    protected localizedNinthMissionRuleService: LocalizedNinthMissionRuleService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.localizedNinthMissionRuleService
      .query()
      .subscribe((res: HttpResponse<ILocalizedNinthMissionRule[]>) => (this.localizedNinthMissionRules = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLocalizedNinthMissionRules();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILocalizedNinthMissionRule): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInLocalizedNinthMissionRules(): void {
    this.eventSubscriber = this.eventManager.subscribe('localizedNinthMissionRuleListModification', () => this.loadAll());
  }

  delete(localizedNinthMissionRule: ILocalizedNinthMissionRule): void {
    const modalRef = this.modalService.open(LocalizedNinthMissionRuleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.localizedNinthMissionRule = localizedNinthMissionRule;
  }
}
