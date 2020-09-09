import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocalizedBlogCategory } from 'app/shared/model/localized-blog-category.model';
import { LocalizedBlogCategoryService } from './localized-blog-category.service';
import { LocalizedBlogCategoryDeleteDialogComponent } from './localized-blog-category-delete-dialog.component';

@Component({
  selector: 'jhi-localized-blog-category',
  templateUrl: './localized-blog-category.component.html',
})
export class LocalizedBlogCategoryComponent implements OnInit, OnDestroy {
  localizedBlogCategories?: ILocalizedBlogCategory[];
  eventSubscriber?: Subscription;

  constructor(
    protected localizedBlogCategoryService: LocalizedBlogCategoryService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.localizedBlogCategoryService
      .query()
      .subscribe((res: HttpResponse<ILocalizedBlogCategory[]>) => (this.localizedBlogCategories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLocalizedBlogCategories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILocalizedBlogCategory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLocalizedBlogCategories(): void {
    this.eventSubscriber = this.eventManager.subscribe('localizedBlogCategoryListModification', () => this.loadAll());
  }

  delete(localizedBlogCategory: ILocalizedBlogCategory): void {
    const modalRef = this.modalService.open(LocalizedBlogCategoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.localizedBlogCategory = localizedBlogCategory;
  }
}
