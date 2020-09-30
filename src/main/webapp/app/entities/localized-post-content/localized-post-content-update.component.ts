import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ILocalizedPostContent, LocalizedPostContent } from 'app/shared/model/localized-post-content.model';
import { LocalizedPostContentService } from './localized-post-content.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IBlogPost } from 'app/shared/model/blog-post.model';
import { BlogPostService } from 'app/entities/blog-post/blog-post.service';

@Component({
  selector: 'jhi-localized-post-content-update',
  templateUrl: './localized-post-content-update.component.html',
})
export class LocalizedPostContentUpdateComponent implements OnInit {
  isSaving = false;
  blogposts: IBlogPost[] = [];

  editForm = this.fb.group({
    id: [],
    excerpt: [],
    content: [null, [Validators.required]],
    language: [null, [Validators.required]],
    post: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected localizedPostContentService: LocalizedPostContentService,
    protected blogPostService: BlogPostService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedPostContent }) => {
      this.updateForm(localizedPostContent);

      this.blogPostService.query().subscribe((res: HttpResponse<IBlogPost[]>) => (this.blogposts = res.body || []));
    });
  }

  updateForm(localizedPostContent: ILocalizedPostContent): void {
    this.editForm.patchValue({
      id: localizedPostContent.id,
      excerpt: localizedPostContent.excerpt,
      content: localizedPostContent.content,
      language: localizedPostContent.language,
      post: localizedPostContent.post,
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
    const localizedPostContent = this.createFromForm();
    if (localizedPostContent.id !== undefined) {
      this.subscribeToSaveResponse(this.localizedPostContentService.update(localizedPostContent));
    } else {
      this.subscribeToSaveResponse(this.localizedPostContentService.create(localizedPostContent));
    }
  }

  private createFromForm(): ILocalizedPostContent {
    return {
      ...new LocalizedPostContent(),
      id: this.editForm.get(['id'])!.value,
      excerpt: this.editForm.get(['excerpt'])!.value,
      content: this.editForm.get(['content'])!.value,
      language: this.editForm.get(['language'])!.value,
      post: this.editForm.get(['post'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocalizedPostContent>>): void {
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
