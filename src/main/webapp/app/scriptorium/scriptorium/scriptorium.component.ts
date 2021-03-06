import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {JhiEventManager} from 'ng-jhipster';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IShop} from 'app/shared/model/shop.model';
import {ScriptoriumService} from './scriptorium.service';

@Component({
  selector: 'jhi-shop',
  templateUrl: './scriptorium.component.html',
})
export class ScriptoriumComponent implements OnInit, OnDestroy {
  shops?: IShop[];
  eventSubscriber?: Subscription;

  constructor(protected shopService: ScriptoriumService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {
  }

  loadAll(): void {
    this.shopService.query().subscribe((res: HttpResponse<IShop[]>) => (this.shops = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInShops();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IShop): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInShops(): void {
    this.eventSubscriber = this.eventManager.subscribe('shopListModification', () => this.loadAll());
  }
}
