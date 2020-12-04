import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {DATE_TIME_FORMAT} from 'app/shared/constants/input.constants';
import {BlogPost, IBlogPost} from 'app/shared/model/blog-post.model';
import {IAppUser} from 'app/shared/model/app-user.model';
import {AppUserService} from 'app/entities/app-user/app-user.service';
import {IBlogCategory} from 'app/shared/model/blog-category.model';
import {BlogCategoryService} from 'app/entities/blog-category/blog-category.service';
import {IBlog} from 'app/shared/model/blog.model';
import {BlogService} from 'app/entities/blog/blog.service';
import {BlogPostService} from 'app/entities/blog-post/blog-post.service';

type SelectableEntity = IAppUser | IBlogCategory | IBlog;

type SelectableManyToManyEntity = IAppUser | IBlogCategory;

@Component({
  selector: 'jhi-blog-post-update',
  templateUrl: './blog-post-update.component.html',
})
export class BlogPostUpdateComponent implements OnInit {
  isSaving = false;
  appusers: IAppUser[] = [];
  blogcategories: IBlogCategory[] = [];
  blogs: IBlog[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    published: [null, [Validators.required]],
    modified: [null, [Validators.required]],
    authors: [],
    categories: [],
    blog: [],
  });

  constructor(
    protected blogPostService: BlogPostService,
    protected appUserService: AppUserService,
    protected blogCategoryService: BlogCategoryService,
    protected blogService: BlogService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({blogPost}) => {
      if (!blogPost.id) {
        const today = moment().startOf('day');
        blogPost.published = today;
        blogPost.modified = today;
      }

      this.updateForm(blogPost);

      this.appUserService.query().subscribe((res: HttpResponse<IAppUser[]>) => (this.appusers = res.body || []));

      this.blogCategoryService.query().subscribe((res: HttpResponse<IBlogCategory[]>) => (this.blogcategories = res.body || []));

      this.blogService.query().subscribe((res: HttpResponse<IBlog[]>) => (this.blogs = res.body || []));
    });
  }

  updateForm(blogPost: IBlogPost): void {
    this.editForm.patchValue({
      id: blogPost.id,
      title: blogPost.title,
      published: blogPost.published ? blogPost.published.format(DATE_TIME_FORMAT) : null,
      modified: blogPost.modified ? blogPost.modified.format(DATE_TIME_FORMAT) : null,
      authors: blogPost.authors,
      categories: blogPost.categories,
      blog: blogPost.blog,
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: SelectableManyToManyEntity[], option: SelectableManyToManyEntity): SelectableManyToManyEntity {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
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

  private createFromForm(): IBlogPost {
    return {
      ...new BlogPost(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      published: this.editForm.get(['published'])!.value ? moment(this.editForm.get(['published'])!.value, DATE_TIME_FORMAT) : undefined,
      modified: this.editForm.get(['modified'])!.value ? moment(this.editForm.get(['modified'])!.value, DATE_TIME_FORMAT) : undefined,
      authors: this.editForm.get(['authors'])!.value,
      categories: this.editForm.get(['categories'])!.value,
      blog: this.editForm.get(['blog'])!.value,
    };
  }
}
