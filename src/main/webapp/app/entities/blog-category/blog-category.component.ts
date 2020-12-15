import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {JhiEventManager} from 'ng-jhipster';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {IBlogCategory} from 'app/shared/model/blog-category.model';
import {BlogCategoryService} from './blog-category.service';
import {BlogCategoryDeleteDialogComponent} from './blog-category-delete-dialog.component';

@Component({
  selector: 'jhi-blog-category',
  templateUrl: './blog-category.component.html',
})
export class BlogCategoryComponent implements OnInit, OnDestroy {
  blogCategories?: IBlogCategory[];
  eventSubscriber?: Subscription;

  constructor(
    protected blogCategoryService: BlogCategoryService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {
  }

  loadAll(): void {
    this.blogCategoryService.query().subscribe((res: HttpResponse<IBlogCategory[]>) => (this.blogCategories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBlogCategories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBlogCategory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBlogCategories(): void {
    this.eventSubscriber = this.eventManager.subscribe('blogCategoryListModification', () => this.loadAll());
  }

  delete(blogCategory: IBlogCategory): void {
    const modalRef = this.modalService.open(BlogCategoryDeleteDialogComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.blogCategory = blogCategory;
  }
}
