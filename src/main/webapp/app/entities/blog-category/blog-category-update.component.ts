import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import {BlogCategory, IBlogCategory} from 'app/shared/model/blog-category.model';
import {BlogCategoryService} from './blog-category.service';

@Component({
  selector: 'jhi-blog-category-update',
  templateUrl: './blog-category-update.component.html',
})
export class BlogCategoryUpdateComponent implements OnInit {
  isSaving = false;
  blogcategories: IBlogCategory[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    parentCategory: [],
  });

  constructor(protected blogCategoryService: BlogCategoryService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({blogCategory}) => {
      this.updateForm(blogCategory);

      this.blogCategoryService.query().subscribe((res: HttpResponse<IBlogCategory[]>) => (this.blogcategories = res.body || []));
    });
  }

  updateForm(blogCategory: IBlogCategory): void {
    this.editForm.patchValue({
      id: blogCategory.id,
      name: blogCategory.name,
      parentCategory: blogCategory.parentCategory,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const blogCategory = this.createFromForm();
    if (blogCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.blogCategoryService.update(blogCategory));
    } else {
      this.subscribeToSaveResponse(this.blogCategoryService.create(blogCategory));
    }
  }

  trackById(index: number, item: IBlogCategory): any {
    return item.id;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBlogCategory>>): void {
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

  private createFromForm(): IBlogCategory {
    return {
      ...new BlogCategory(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      parentCategory: this.editForm.get(['parentCategory'])!.value,
    };
  }
}
