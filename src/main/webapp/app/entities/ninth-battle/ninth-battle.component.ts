import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INinthBattle } from 'app/shared/model/ninth-battle.model';
import { NinthBattleService } from './ninth-battle.service';
import { NinthBattleDeleteDialogComponent } from './ninth-battle-delete-dialog.component';

@Component({
  selector: 'jhi-ninth-battle',
  templateUrl: './ninth-battle.component.html',
})
export class NinthBattleComponent implements OnInit, OnDestroy {
  ninthBattles?: INinthBattle[];
  eventSubscriber?: Subscription;

  constructor(
    protected ninthBattleService: NinthBattleService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.ninthBattleService.query().subscribe((res: HttpResponse<INinthBattle[]>) => (this.ninthBattles = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNinthBattles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INinthBattle): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNinthBattles(): void {
    this.eventSubscriber = this.eventManager.subscribe('ninthBattleListModification', () => this.loadAll());
  }

  delete(ninthBattle: INinthBattle): void {
    const modalRef = this.modalService.open(NinthBattleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ninthBattle = ninthBattle;
  }
}
