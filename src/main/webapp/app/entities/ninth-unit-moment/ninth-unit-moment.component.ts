import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {JhiEventManager, JhiLanguageService} from 'ng-jhipster';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {INinthUnitMoment} from 'app/shared/model/ninth-unit-moment.model';
import {NinthUnitMomentService} from './ninth-unit-moment.service';
import {NinthUnitMomentDeleteDialogComponent} from './ninth-unit-moment-delete-dialog.component';

@Component({
  selector: 'jhi-ninth-unit-moment',
  templateUrl: './ninth-unit-moment.component.html',
})
export class NinthUnitMomentComponent implements OnInit, OnDestroy {
  ninthUnitMoments?: INinthUnitMoment[];
  eventSubscriber?: Subscription;
  locale: string;

  constructor(
    protected ninthUnitMomentService: NinthUnitMomentService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected languageService: JhiLanguageService
  ) {
    this.locale = this.languageService.getCurrentLanguage();
  }

  loadAll(): void {
    this.ninthUnitMomentService.query().subscribe((res: HttpResponse<INinthUnitMoment[]>) => (this.ninthUnitMoments = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNinthUnitMoments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INinthUnitMoment): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNinthUnitMoments(): void {
    this.eventSubscriber = this.eventManager.subscribe('ninthUnitMomentListModification', () => this.loadAll());
  }

  delete(ninthUnitMoment: INinthUnitMoment): void {
    const modalRef = this.modalService.open(NinthUnitMomentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ninthUnitMoment = ninthUnitMoment;
  }
}
