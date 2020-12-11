import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {JhiDataUtils, JhiEventManager, JhiEventWithContent, JhiFileLoadError} from 'ng-jhipster';

import {ILocalizedProduct, LocalizedProduct} from 'app/shared/model/localized-product.model';
import {LocalizedProductService} from './localized-product.service';
import {AlertError} from 'app/shared/alert/alert-error.model';
import {IProduct} from 'app/shared/model/product.model';
import {ProductService} from 'app/entities/product/product.service';

@Component({
  selector: 'jhi-localized-product-update',
  templateUrl: './localized-product-update.component.html',
})
export class LocalizedProductUpdateComponent implements OnInit {
  isSaving = false;
  products: IProduct[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    excerpt: [],
    pictureUrl: [],
    content: [null, [Validators.required]],
    language: [null, [Validators.required]],
    product: [null, Validators.required],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
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
      name: localizedProduct.name,
      excerpt: localizedProduct.excerpt,
      pictureUrl: localizedProduct.pictureUrl,
      content: localizedProduct.content,
      language: localizedProduct.language,
      product: localizedProduct.product,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('n42cApp.error', { ...err, key: 'error.file.' + err.key })
      );
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
      name: this.editForm.get(['name'])!.value,
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
