import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import {ILocalizedBlog, LocalizedBlog} from 'app/shared/model/localized-blog.model';
import {LocalizedBlogService} from './localized-blog.service';
import {IBlog} from 'app/shared/model/blog.model';
import {BlogService} from 'app/entities/blog/blog.service';

@Component({
  selector: 'jhi-localized-blog-update',
  templateUrl: './localized-blog-update.component.html',
})
export class LocalizedBlogUpdateComponent implements OnInit {
  isSaving = false;
  blogs: IBlog[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    language: [null, [Validators.required]],
    blog: [null, Validators.required],
  });

  constructor(
    protected localizedBlogService: LocalizedBlogService,
    protected blogService: BlogService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({localizedBlog}) => {
      this.updateForm(localizedBlog);

      this.blogService.query().subscribe((res: HttpResponse<IBlog[]>) => (this.blogs = res.body || []));
    });
  }

  updateForm(localizedBlog: ILocalizedBlog): void {
    this.editForm.patchValue({
      id: localizedBlog.id,
      name: localizedBlog.name,
      language: localizedBlog.language,
      blog: localizedBlog.blog,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const localizedBlog = this.createFromForm();
    if (localizedBlog.id !== undefined) {
      this.subscribeToSaveResponse(this.localizedBlogService.update(localizedBlog));
    } else {
      this.subscribeToSaveResponse(this.localizedBlogService.create(localizedBlog));
    }
  }

  trackById(index: number, item: IBlog): any {
    return item.id;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocalizedBlog>>): void {
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

  private createFromForm(): ILocalizedBlog {
    return {
      ...new LocalizedBlog(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      language: this.editForm.get(['language'])!.value,
      blog: this.editForm.get(['blog'])!.value,
    };
  }
}
