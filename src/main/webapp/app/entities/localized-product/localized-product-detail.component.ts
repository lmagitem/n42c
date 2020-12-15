import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JhiDataUtils} from 'ng-jhipster';

import {ILocalizedProduct} from 'app/shared/model/localized-product.model';

@Component({
  selector: 'jhi-localized-product-detail',
  templateUrl: './localized-product-detail.component.html',
})
export class LocalizedProductDetailComponent implements OnInit {
  localizedProduct: ILocalizedProduct | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedProduct }) => (this.localizedProduct = localizedProduct));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
