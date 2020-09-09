import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocalizedProduct } from 'app/shared/model/localized-product.model';

@Component({
  selector: 'jhi-localized-product-detail',
  templateUrl: './localized-product-detail.component.html',
})
export class LocalizedProductDetailComponent implements OnInit {
  localizedProduct: ILocalizedProduct | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedProduct }) => (this.localizedProduct = localizedProduct));
  }

  previousState(): void {
    window.history.back();
  }
}
