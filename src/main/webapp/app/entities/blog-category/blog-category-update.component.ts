import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBlogCategory, BlogCategory } from 'app/shared/model/blog-category.model';
import { BlogCategoryService } from './blog-category.service';
import { IBlogPost } from 'app/shared/model/blog-post.model';
import { BlogPostService } from 'app/entities/blog-post/blog-post.service';

type SelectableEntity = IBlogPost | IBlogCategory;

@Component({
  selector: 'jhi-blog-category-update',
  templateUrl: './blog-category-update.component.html',
})
export class BlogCategoryUpdateComponent implements OnInit {
  isSaving = false;
  blogposts: IBlogPost[] = [];
  blogcategories: IBlogCategory[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    language: [],
    categories: [],
    subcategories: [],
  });

  constructor(
    protected blogCategoryService: BlogCategoryService,
    protected blogPostService: BlogPostService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ blogCategory }) => {
      this.updateForm(blogCategory);

      this.blogPostService.query().subscribe((res: HttpResponse<IBlogPost[]>) => (this.blogposts = res.body || []));

      this.blogCategoryService.query().subscribe((res: HttpResponse<IBlogCategory[]>) => (this.blogcategories = res.body || []));
    });
  }

  updateForm(blogCategory: IBlogCategory): void {
    this.editForm.patchValue({
      id: blogCategory.id,
      name: blogCategory.name,
      language: blogCategory.language,
      categories: blogCategory.categories,
      subcategories: blogCategory.subcategories,
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

  private createFromForm(): IBlogCategory {
    return {
      ...new BlogCategory(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      language: this.editForm.get(['language'])!.value,
      categories: this.editForm.get(['categories'])!.value,
      subcategories: this.editForm.get(['subcategories'])!.value,
    };
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
