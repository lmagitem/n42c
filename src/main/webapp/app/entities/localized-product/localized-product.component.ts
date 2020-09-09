import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocalizedProduct } from 'app/shared/model/localized-product.model';
import { LocalizedProductService } from './localized-product.service';
import { LocalizedProductDeleteDialogComponent } from './localized-product-delete-dialog.component';

@Component({
  selector: 'jhi-localized-product',
  templateUrl: './localized-product.component.html',
})
export class LocalizedProductComponent implements OnInit, OnDestroy {
  localizedProducts?: ILocalizedProduct[];
  eventSubscriber?: Subscription;

  constructor(
    protected localizedProductService: LocalizedProductService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.localizedProductService.query().subscribe((res: HttpResponse<ILocalizedProduct[]>) => (this.localizedProducts = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLocalizedProducts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILocalizedProduct): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLocalizedProducts(): void {
    this.eventSubscriber = this.eventManager.subscribe('localizedProductListModification', () => this.loadAll());
  }

  delete(localizedProduct: ILocalizedProduct): void {
    const modalRef = this.modalService.open(LocalizedProductDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.localizedProduct = localizedProduct;
  }
}
