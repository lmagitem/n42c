import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILocalizedProduct, LocalizedProduct } from 'app/shared/model/localized-product.model';
import { LocalizedProductService } from './localized-product.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';

@Component({
  selector: 'jhi-localized-product-update',
  templateUrl: './localized-product-update.component.html',
})
export class LocalizedProductUpdateComponent implements OnInit {
  isSaving = false;
  products: IProduct[] = [];

  editForm = this.fb.group({
    id: [],
    excerpt: [],
    pictureUrl: [],
    content: [null, [Validators.required]],
    language: [null, [Validators.required]],
    product: [],
  });

  constructor(
    protected localizedProductService: LocalizedProductService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedProduct }) => {
      this.updateForm(localizedProduct);

      this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));
    });
  }

  updateForm(localizedProduct: ILocalizedProduct): void {
    this.editForm.patchValue({
      id: localizedProduct.id,
      excerpt: localizedProduct.excerpt,
      pictureUrl: localizedProduct.pictureUrl,
      content: localizedProduct.content,
      language: localizedProduct.language,
      product: localizedProduct.product,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const localizedProduct = this.createFromForm();
    if (localizedProduct.id !== undefined) {
      this.subscribeToSaveResponse(this.localizedProductService.update(localizedProduct));
    } else {
      this.subscribeToSaveResponse(this.localizedProductService.create(localizedProduct));
    }
  }

  private createFromForm(): ILocalizedProduct {
    return {
      ...new LocalizedProduct(),
      id: this.editForm.get(['id'])!.value,
      excerpt: this.editForm.get(['excerpt'])!.value,
      pictureUrl: this.editForm.get(['pictureUrl'])!.value,
      content: this.editForm.get(['content'])!.value,
      language: this.editForm.get(['language'])!.value,
      product: this.editForm.get(['product'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocalizedProduct>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IProduct): any {
    return item.id;
  }
}
