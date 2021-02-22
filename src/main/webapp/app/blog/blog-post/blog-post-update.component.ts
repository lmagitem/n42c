import { Component, NgZone, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { BlogPost, IBlogPost } from 'app/shared/model/blog-post.model';
import { IAppUser } from 'app/shared/model/app-user.model';
import { AppUserService } from 'app/entities/app-user/app-user.service';
import { IBlogCategory } from 'app/shared/model/blog-category.model';
import { BlogCategoryService } from 'app/entities/blog-category/blog-category.service';
import { IBlog } from 'app/shared/model/blog.model';
import { BlogService } from 'app/entities/blog/blog.service';
import { BlogPostService } from 'app/entities/blog-post/blog-post.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LocalizedBlogPost } from 'app/shared/model/localized-blog-post.model';
import { JhiLanguageService } from 'ng-jhipster';
import { LanguageUtils } from 'app/shared/util/language-utils';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import * as _ from 'lodash';

type SelectableEntity = IAppUser | IBlogCategory | IBlog;
type SelectableManyToManyEntity = IAppUser | IBlogCategory;

@Component({
  selector: 'jhi-blog-post-update',
  templateUrl: './blog-post-update.component.html',
  styleUrls: ['../../../content/scss/blog.scss'],
})
export class BlogPostUpdateComponent implements OnInit {
  responses: Array<any>;
  hasBaseDropZoneOver = false;
  uploader: FileUploader = new FileUploader({});
  title: string;
  editor = ClassicEditor;
  isSaving = false;
  page = 0;
  appusers: IAppUser[] = [];
  blogcategories: IBlogCategory[] = [];
  blogs: IBlog[] = [];

  languageKeys = LanguageUtils.getLanguageKeyArray();
  localizationsMap = new Map();
  selectedLanguage = 'EN';

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    published: [null, [Validators.required]],
    modified: [null, [Validators.required]],
    pictureUrl: [],
    authors: [],
    categories: [],
    localizations: [],
    blog: [],
  });

  constructor(
    protected blogPostService: BlogPostService,
    protected appUserService: AppUserService,
    protected blogCategoryService: BlogCategoryService,
    protected blogService: BlogService,
    protected activatedRoute: ActivatedRoute,
    protected languageService: JhiLanguageService,
    private fb: FormBuilder,
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient
  ) {
    LanguageUtils.getLanguageKeyArray().forEach(key => {
      const localization = new LocalizedBlogPost();
      localization.language = LanguageUtils.getLanguageEnumFromKey(key);
      this.localizationsMap.set(key, localization);
    });
    this.selectedLanguage = this.languageService.getCurrentLanguage().toUpperCase();

    this.responses = [];
    this.title = '';
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ blogPost }) => {
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

    this.initPictureUploader();
  }

  /** Create the file uploader, wire it to upload to Cloudinary. */
  private initPictureUploader(): void {
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest',
        },
      ],
    };
    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      // Add built-in and custom tags for displaying the uploaded photo in the list
      const tags = 'blog-post-picture';
      // Add custom tags
      form.append('tags', tags);
      // Add file to upload
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    // Insert or update an entry in the responses array
    const upsertResponse = fileItem => {
      this.zone.run(() => {
        // Clear the queue and delete what was in it to not keep unwanted pictures
        _.cloneDeep(this.responses).forEach(item => {
          const itemIndex = this.responses.findIndex(i => i.file.name === item.file.name);
          if (!!item && !!item?.data?.delete_token && itemIndex > -1) {
            this.deleteImage(item.data, itemIndex);
          }
        });

        // Update existing item with new data or make a clean array with new item
        const existingIndex = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingIndex > -1) {
          this.responses[existingIndex] = _.assign(this.responses[existingIndex], fileItem);
        } else {
          this.responses = [fileItem];
        }

        // Update the entity
        if (this.responses[0]?.data?.secure_url) {
          this.editForm.patchValue({
            pictureUrl: this.responses[0].data.secure_url,
          });
        }
      });
    };

    // Update model on completion of uploading a file
    this.uploader.onCompleteItem = (item: any, response: string, status: number) =>
      upsertResponse({
        file: item.file,
        status,
        data: JSON.parse(response),
      });

    // Update model on upload progress event
    this.uploader.onProgressItem = (fileItem: any, progress: any) =>
      upsertResponse({
        file: fileItem.file,
        progress,
        data: {},
      });
  }

  // Delete an uploaded image
  // Requires setting "Return delete token" to "Yes" in your upload preset configuration
  // See also https://support.cloudinary.com/hc/en-us/articles/202521132-How-to-delete-an-image-from-the-client-side-
  deleteImage(data: any, index: number): void {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/delete_by_token`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      }),
    };
    const body = {
      token: data.delete_token,
    };
    this.http.post(url, body, options).subscribe(response => {
      if (_.has(response, 'result')) {
        // tslint:disable-next-line:no-console
        console.log(`Deleted image - ${data.public_id} ${response['result']}`);
        this.zone.run(() => {
          // Remove deleted item for responses
          this.responses.splice(index, 1);
        });
      }
    });
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getFileProperties(fileProperties: any): Iterable<any> {
    // Transforms Javascript Object to an iterable to be used by *ngFor
    if (!fileProperties) {
      return [];
    }
    return Object.keys(fileProperties).map(key => ({ key, value: fileProperties[key] }));
  }

  updateForm(blogPost: IBlogPost): void {
    this.editForm.patchValue({
      id: blogPost.id,
      title: blogPost.title,
      published: blogPost.published ? blogPost.published.format(DATE_TIME_FORMAT) : null,
      modified: blogPost.modified ? blogPost.modified.format(DATE_TIME_FORMAT) : null,
      pictureUrl: blogPost.pictureUrl,
      authors: blogPost.authors,
      categories: blogPost.categories,
      localizations: blogPost.localizations,
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

  getLanguageTranslationKey(key: string): string {
    return 'n42cApp.Language.' + key;
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
      pictureUrl: this.editForm.get(['pictureUrl'])!.value,
      authors: this.editForm.get(['authors'])!.value,
      categories: this.editForm.get(['categories'])!.value,
      blog: this.editForm.get(['blog'])!.value,
    };
  }
}
