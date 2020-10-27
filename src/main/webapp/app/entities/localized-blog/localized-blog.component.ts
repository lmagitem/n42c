import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocalizedBlog } from 'app/shared/model/localized-blog.model';
import { LocalizedBlogService } from './localized-blog.service';
import { LocalizedBlogDeleteDialogComponent } from './localized-blog-delete-dialog.component';

@Component({
  selector: 'jhi-localized-blog',
  templateUrl: './localized-blog.component.html',
})
export class LocalizedBlogComponent implements OnInit, OnDestroy {
  localizedBlogs?: ILocalizedBlog[];
  eventSubscriber?: Subscription;

  constructor(
    protected localizedBlogService: LocalizedBlogService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.localizedBlogService.query().subscribe((res: HttpResponse<ILocalizedBlog[]>) => (this.localizedBlogs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLocalizedBlogs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILocalizedBlog): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLocalizedBlogs(): void {
    this.eventSubscriber = this.eventManager.subscribe('localizedBlogListModification', () => this.loadAll());
  }

  delete(localizedBlog: ILocalizedBlog): void {
    const modalRef = this.modalService.open(LocalizedBlogDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.localizedBlog = localizedBlog;
  }
}
