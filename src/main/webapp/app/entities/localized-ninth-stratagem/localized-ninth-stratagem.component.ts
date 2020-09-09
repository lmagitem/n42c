import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocalizedNinthStratagem } from 'app/shared/model/localized-ninth-stratagem.model';
import { LocalizedNinthStratagemService } from './localized-ninth-stratagem.service';
import { LocalizedNinthStratagemDeleteDialogComponent } from './localized-ninth-stratagem-delete-dialog.component';

@Component({
  selector: 'jhi-localized-ninth-stratagem',
  templateUrl: './localized-ninth-stratagem.component.html',
})
export class LocalizedNinthStratagemComponent implements OnInit, OnDestroy {
  localizedNinthStratagems?: ILocalizedNinthStratagem[];
  eventSubscriber?: Subscription;

  constructor(
    protected localizedNinthStratagemService: LocalizedNinthStratagemService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.localizedNinthStratagemService
      .query()
      .subscribe((res: HttpResponse<ILocalizedNinthStratagem[]>) => (this.localizedNinthStratagems = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLocalizedNinthStratagems();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILocalizedNinthStratagem): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLocalizedNinthStratagems(): void {
    this.eventSubscriber = this.eventManager.subscribe('localizedNinthStratagemListModification', () => this.loadAll());
  }

  delete(localizedNinthStratagem: ILocalizedNinthStratagem): void {
    const modalRef = this.modalService.open(LocalizedNinthStratagemDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.localizedNinthStratagem = localizedNinthStratagem;
  }
}
