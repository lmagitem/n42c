import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiLanguageService, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IBlogPost } from 'app/shared/model/blog-post.model';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { BlogPostDeleteDialogComponent } from './blog-post-delete-dialog.component';
import { BlogPostService } from 'app/entities/blog-post/blog-post.service';
import { LocalizedPostContentService } from 'app/entities/localized-post-content/localized-post-content.service';
import { IItemWithLocalizations, LocalizationUtils } from 'app/shared/util/localization-utils';

@Component({
  selector: 'jhi-blog-post',
  templateUrl: './blog-post-list.component.html',
})
export class BlogPostListComponent implements OnInit, OnDestroy {
  blogPosts: IBlogPost[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected blogPostService: BlogPostService,
    protected localizedPostService: LocalizedPostContentService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks,
    protected languageService: JhiLanguageService
  ) {
    this.blogPosts = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.blogPostService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IBlogPost[]>) => {
        this.paginateBlogPosts(
          LocalizationUtils.withPlaceholderLocalizations(res.body as IItemWithLocalizations[], ['excerpt']),
          res.headers
        );
        LocalizationUtils.refreshLocalizations(
          this.blogPosts as IItemWithLocalizations[],
          (ids: any[]) => this.localizedPostService.queryFor(ids),
          'post'
        );
      });
  }

  reset(): void {
    this.page = 0;
    this.blogPosts = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBlogPosts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  getLocalizedExcerpt(item: IBlogPost): string {
    return LocalizationUtils.getLocalizedField(item as IItemWithLocalizations, 'excerpt', this.languageService.getCurrentLanguage());
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