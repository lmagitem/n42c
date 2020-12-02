import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { JhiEventManager, JhiLanguageService } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IBlog } from 'app/shared/model/blog.model';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { BlogDeleteDialogComponent } from './blog-delete-dialog.component';
import { BlogService } from 'app/entities/blog/blog.service';
import { LocalizationUtils, IItemWithLocalizations } from 'app/shared/util/localization-utils';
import { LocalizedBlogService } from 'app/entities/localized-blog/localized-blog.service';

@Component({
  selector: 'jhi-blog',
  templateUrl: './blog-list.component.html',
})
export class BlogListComponent implements OnInit, OnDestroy {
  blogs?: IBlog[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected blogService: BlogService,
    protected localizedBlogService: LocalizedBlogService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected languageService: JhiLanguageService,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    this.blogService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IBlog[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.handleNavigation();
    this.registerChangeInBlogs();
  }

  protected handleNavigation(): void {
    combineLatest(this.activatedRoute.data, this.activatedRoute.queryParamMap, (data: Data, params: ParamMap) => {
      const page = params.get('page');
      const pageNumber = page !== null ? +page : 1;
      const sort = (params.get('sort') ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === 'asc';
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    }).subscribe();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  getLocalizedField(item: IBlog | null, field: string, alternateField?: string): string {
    return LocalizationUtils.getLocalizedField(
      item as IItemWithLocalizations,
      field,
      alternateField,
      this.languageService.getCurrentLanguage()
    );
  }

  trackId(index: number, item: IBlog): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBlogs(): void {
    this.eventSubscriber = this.eventManager.subscribe('blogListModification', () => this.loadPage());
  }

  delete(blog: IBlog): void {
    const modalRef = this.modalService.open(BlogDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.blog = blog;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IBlog[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/blog'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.blogs = LocalizationUtils.withPlaceholderLocalizations(data as IItemWithLocalizations[], ['name']) || [];
    this.ngbPaginationPage = this.page;

    LocalizationUtils.refreshLocalizations(
      this.blogs as IItemWithLocalizations[],
      (ids: any[]) => this.localizedBlogService.queryFor(ids),
      'blog'
    );
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
