import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiLanguageService, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IBlogPost } from 'app/shared/model/blog-post.model';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { BlogPostDeleteDialogComponent } from './blog-post-delete-dialog.component';
import { BlogPostService } from 'app/entities/blog-post/blog-post.service';
import { LocalizedBlogPostService } from 'app/entities/localized-blog-post/localized-blog-post.service';
import { IItemWithLocalizations, LocalizationUtils } from 'app/shared/util/localization-utils';
import { ActivatedRoute } from '@angular/router';
import { IBlog } from 'app/shared/model/blog.model';
import { ArrayUtils } from 'app/shared/util/arrays-utils';

@Component({
  selector: 'jhi-blog-post',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['../../../content/scss/blog.scss'],
})
export class BlogPostListComponent implements OnInit, OnDestroy {
  blogPosts: IBlogPost[];
  blog: IBlog | null = null;
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;
  locale: string;

  constructor(
    protected blogPostService: BlogPostService,
    protected localizedPostService: LocalizedBlogPostService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks,
    protected languageService: JhiLanguageService,
    protected activatedRoute: ActivatedRoute
  ) {
    this.blogPosts = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'published';
    this.ascending = false;
    this.locale = this.languageService.getCurrentLanguage();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ blog }) => {
      this.blog = blog;
      this.loadAll(blog?.id || undefined);
    });
    this.registerChangeInBlogPosts();
  }

  loadAll(id: number | undefined): void {
    if (id !== undefined && id !== null) {
      this.blogPostService
        .queryFor([id], {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.sort(),
        })
        .subscribe((res: HttpResponse<IBlogPost[]>) => {
          this.paginateBlogPosts(
            LocalizationUtils.withPlaceholderLocalizations(res.body as IItemWithLocalizations[], ['title', 'excerpt']),
            res.headers
          );
          LocalizationUtils.refreshLocalizations(
            this.blogPosts as IItemWithLocalizations[],
            (ids: any[]) => this.localizedPostService.queryFor(ids),
            'post'
          );
        });
    } else {
      this.blogPostService
        .query({
          page: this.page,
          size: this.itemsPerPage,
          sort: this.sort(),
        })
        .subscribe((res: HttpResponse<IBlogPost[]>) => {
          this.paginateBlogPosts(
            LocalizationUtils.withPlaceholderLocalizations(res.body as IItemWithLocalizations[], ['title', 'excerpt']),
            res.headers
          );
          LocalizationUtils.refreshLocalizations(
            this.blogPosts as IItemWithLocalizations[],
            (ids: any[]) => this.localizedPostService.queryFor(ids),
            'post'
          );
        });
    }
  }

  reset(): void {
    this.page = 0;
    this.blogPosts = [];
    this.loadAll(this.blog?.id || undefined);
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll(this.blog?.id || undefined);
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  arrayToString(array: any, field: string): string {
    return ArrayUtils.toStringUsingField(array, field);
  }

  getLocalizedField(item: IBlogPost | IBlog | null | undefined, field: string, alternateField?: string): string {
    return LocalizationUtils.getLocalizedField(
      item as IItemWithLocalizations,
      field,
      alternateField,
      this.languageService.getCurrentLanguage()
    );
  }

  trackId(index: number, item: IBlogPost): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBlogPosts(): void {
    this.eventSubscriber = this.eventManager.subscribe('blogPostListModification', () => this.reset());
  }

  delete(blogPost: IBlogPost): void {
    const modalRef = this.modalService.open(BlogPostDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.blogPost = blogPost;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateBlogPosts(data: IBlogPost[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.blogPosts.push(data[i]);
      }
    }
  }
}
