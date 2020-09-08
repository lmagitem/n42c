import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INinthStratagem } from 'app/shared/model/ninth-stratagem.model';
import { NinthStratagemService } from './ninth-stratagem.service';
import { NinthStratagemDeleteDialogComponent } from './ninth-stratagem-delete-dialog.component';

@Component({
  selector: 'jhi-ninth-stratagem',
  templateUrl: './ninth-stratagem.component.html',
})
export class NinthStratagemComponent implements OnInit, OnDestroy {
  ninthStratagems?: INinthStratagem[];
  eventSubscriber?: Subscription;

  constructor(
    protected ninthStratagemService: NinthStratagemService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.ninthStratagemService.query().subscribe((res: HttpResponse<INinthStratagem[]>) => (this.ninthStratagems = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNinthStratagems();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INinthStratagem): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNinthStratagems(): void {
    this.eventSubscriber = this.eventManager.subscribe('ninthStratagemListModification', () => this.loadAll());
  }

  delete(ninthStratagem: INinthStratagem): void {
    const modalRef = this.modalService.open(NinthStratagemDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ninthStratagem = ninthStratagem;
  }
}
