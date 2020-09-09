import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILocalizedBlogCategory, LocalizedBlogCategory } from 'app/shared/model/localized-blog-category.model';
import { LocalizedBlogCategoryService } from './localized-blog-category.service';
import { IBlogCategory } from 'app/shared/model/blog-category.model';
import { BlogCategoryService } from 'app/entities/blog-category/blog-category.service';

@Component({
  selector: 'jhi-localized-blog-category-update',
  templateUrl: './localized-blog-category-update.component.html',
})
export class LocalizedBlogCategoryUpdateComponent implements OnInit {
  isSaving = false;
  blogcategories: IBlogCategory[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    language: [null, [Validators.required]],
    category: [],
  });

  constructor(
    protected localizedBlogCategoryService: LocalizedBlogCategoryService,
    protected blogCategoryService: BlogCategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedBlogCategory }) => {
      this.updateForm(localizedBlogCategory);

      this.blogCategoryService.query().subscribe((res: HttpResponse<IBlogCategory[]>) => (this.blogcategories = res.body || []));
    });
  }

  updateForm(localizedBlogCategory: ILocalizedBlogCategory): void {
    this.editForm.patchValue({
      id: localizedBlogCategory.id,
      name: localizedBlogCategory.name,
      language: localizedBlogCategory.language,
      category: localizedBlogCategory.category,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const localizedBlogCategory = this.createFromForm();
    if (localizedBlogCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.localizedBlogCategoryService.update(localizedBlogCategory));
    } else {
      this.subscribeToSaveResponse(this.localizedBlogCategoryService.create(localizedBlogCategory));
    }
  }

  private createFromForm(): ILocalizedBlogCategory {
    return {
      ...new LocalizedBlogCategory(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      language: this.editForm.get(['language'])!.value,
      category: this.editForm.get(['category'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocalizedBlogCategory>>): void {
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

  trackById(index: number, item: IBlogCategory): any {
    return item.id;
  }
}
