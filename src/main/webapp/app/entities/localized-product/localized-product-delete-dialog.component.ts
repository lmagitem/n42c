import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocalizedProduct } from 'app/shared/model/localized-product.model';
import { LocalizedProductService } from './localized-product.service';

@Component({
  templateUrl: './localized-product-delete-dialog.component.html',
})
export class LocalizedProductDeleteDialogComponent {
  localizedProduct?: ILocalizedProduct;

  constructor(
    protected localizedProductService: LocalizedProductService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.localizedProductService.delete(id).subscribe(() => {
      this.eventManager.broadcast('localizedProductListModification');
      this.activeModal.close();
    });
  }
}
