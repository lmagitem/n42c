import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {JhiDataUtils, JhiEventManager, JhiEventWithContent, JhiFileLoadError} from 'ng-jhipster';

import {ILocalizedBlogPost, LocalizedBlogPost} from 'app/shared/model/localized-blog-post.model';
import {LocalizedBlogPostService} from './localized-blog-post.service';
import {AlertError} from 'app/shared/alert/alert-error.model';
import {IBlogPost} from 'app/shared/model/blog-post.model';
import {BlogPostService} from 'app/entities/blog-post/blog-post.service';

@Component({
  selector: 'jhi-localized-blog-post-update',
  templateUrl: './localized-blog-post-update.component.html',
})
export class LocalizedBlogPostUpdateComponent implements OnInit {
  isSaving = false;
  blogposts: IBlogPost[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    excerpt: [],
    content: [null, [Validators.required]],
    language: [null, [Validators.required]],
    post: [null, Validators.required],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected localizedBlogPostService: LocalizedBlogPostService,
    protected blogPostService: BlogPostService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedBlogPost }) => {
      this.updateForm(localizedBlogPost);

      this.blogPostService.query().subscribe((res: HttpResponse<IBlogPost[]>) => (this.blogposts = res.body || []));
    });
  }

  updateForm(localizedBlogPost: ILocalizedBlogPost): void {
    this.editForm.patchValue({
      id: localizedBlogPost.id,
      title: localizedBlogPost.title,
      excerpt: localizedBlogPost.excerpt,
      content: localizedBlogPost.content,
      language: localizedBlogPost.language,
      post: localizedBlogPost.post,
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
    const localizedBlogPost = this.createFromForm();
    if (localizedBlogPost.id !== undefined) {
      this.subscribeToSaveResponse(this.localizedBlogPostService.update(localizedBlogPost));
    } else {
      this.subscribeToSaveResponse(this.localizedBlogPostService.create(localizedBlogPost));
    }
  }

  private createFromForm(): ILocalizedBlogPost {
    return {
      ...new LocalizedBlogPost(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      excerpt: this.editForm.get(['excerpt'])!.value,
      content: this.editForm.get(['content'])!.value,
      language: this.editForm.get(['language'])!.value,
      post: this.editForm.get(['post'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocalizedBlogPost>>): void {
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

  trackById(index: number, item: IBlogPost): any {
    return item.id;
  }
}
