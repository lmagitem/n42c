import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {JhiEventManager} from 'ng-jhipster';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {INinthMissionRule} from 'app/shared/model/ninth-mission-rule.model';
import {NinthMissionRuleService} from './ninth-mission-rule.service';
import {NinthMissionRuleDeleteDialogComponent} from './ninth-mission-rule-delete-dialog.component';

@Component({
  selector: 'jhi-ninth-mission-rule',
  templateUrl: './ninth-mission-rule.component.html',
})
export class NinthMissionRuleComponent implements OnInit, OnDestroy {
  ninthMissionRules?: INinthMissionRule[];
  eventSubscriber?: Subscription;

  constructor(
    protected ninthMissionRuleService: NinthMissionRuleService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.ninthMissionRuleService.query().subscribe((res: HttpResponse<INinthMissionRule[]>) => (this.ninthMissionRules = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNinthMissionRules();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INinthMissionRule): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNinthMissionRules(): void {
    this.eventSubscriber = this.eventManager.subscribe('ninthMissionRuleListModification', () => this.loadAll());
  }

  delete(ninthMissionRule: INinthMissionRule): void {
    const modalRef = this.modalService.open(NinthMissionRuleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ninthMissionRule = ninthMissionRule;
  }
}
