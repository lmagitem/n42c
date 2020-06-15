import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IBlogPost, BlogPost } from 'app/shared/model/blog-post.model';
import { BlogPostService } from './blog-post.service';
import { IAppUser } from 'app/shared/model/app-user.model';
import { AppUserService } from 'app/entities/app-user/app-user.service';

@Component({
  selector: 'jhi-blog-post-update',
  templateUrl: './blog-post-update.component.html',
})
export class BlogPostUpdateComponent implements OnInit {
  isSaving = false;
  appusers: IAppUser[] = [];

  editForm = this.fb.group({
    id: [],
    published: [null, [Validators.required]],
    excerpt: [],
    content: [null, [Validators.required]],
    language: [],
    author: [],
  });

  constructor(
    protected blogPostService: BlogPostService,
    protected appUserService: AppUserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ blogPost }) => {
      if (!blogPost.id) {
        const today = moment().startOf('day');
        blogPost.published = today;
      }

      this.updateForm(blogPost);

      this.appUserService.query().subscribe((res: HttpResponse<IAppUser[]>) => (this.appusers = res.body || []));
    });
  }

  updateForm(blogPost: IBlogPost): void {
    this.editForm.patchValue({
      id: blogPost.id,
      published: blogPost.published ? blogPost.published.format(DATE_TIME_FORMAT) : null,
      excerpt: blogPost.excerpt,
      content: blogPost.content,
      language: blogPost.language,
      author: blogPost.author,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const blogPost = this.createFromForm();
    if (blogPost.id !== undefined) {
      this.subscribeToSaveResponse(this.blogPostService.update(blogPost));
    } else {
      this.subscribeToSaveResponse(this.blogPostService.create(blogPost));
    }
  }

  private createFromForm(): IBlogPost {
    return {
      ...new BlogPost(),
      id: this.editForm.get(['id'])!.value,
      published: this.editForm.get(['published'])!.value ? moment(this.editForm.get(['published'])!.value, DATE_TIME_FORMAT) : undefined,
      excerpt: this.editForm.get(['excerpt'])!.value,
      content: this.editForm.get(['content'])!.value,
      language: this.editForm.get(['language'])!.value,
      author: this.editForm.get(['author'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBlogPost>>): void {
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

  trackById(index: number, item: IAppUser): any {
    return item.id;
  }
}
