import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {JhiDataUtils, JhiEventManager} from 'ng-jhipster';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ILocalizedBlogPost} from 'app/shared/model/localized-blog-post.model';
import {LocalizedBlogPostService} from './localized-blog-post.service';
import {LocalizedBlogPostDeleteDialogComponent} from './localized-blog-post-delete-dialog.component';

@Component({
  selector: 'jhi-localized-blog-post',
  templateUrl: './localized-blog-post.component.html',
})
export class LocalizedBlogPostComponent implements OnInit, OnDestroy {
  localizedBlogPosts?: ILocalizedBlogPost[];
  eventSubscriber?: Subscription;

  constructor(
    protected localizedBlogPostService: LocalizedBlogPostService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.localizedBlogPostService
      .query()
      .subscribe((res: HttpResponse<ILocalizedBlogPost[]>) => (this.localizedBlogPosts = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLocalizedBlogPosts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILocalizedBlogPost): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInLocalizedBlogPosts(): void {
    this.eventSubscriber = this.eventManager.subscribe('localizedBlogPostListModification', () => this.loadAll());
  }

  delete(localizedBlogPost: ILocalizedBlogPost): void {
    const modalRef = this.modalService.open(LocalizedBlogPostDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.localizedBlogPost = localizedBlogPost;
  }
}
