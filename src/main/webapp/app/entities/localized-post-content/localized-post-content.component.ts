import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocalizedPostContent } from 'app/shared/model/localized-post-content.model';
import { LocalizedPostContentService } from './localized-post-content.service';
import { LocalizedPostContentDeleteDialogComponent } from './localized-post-content-delete-dialog.component';

@Component({
  selector: 'jhi-localized-post-content',
  templateUrl: './localized-post-content.component.html',
})
export class LocalizedPostContentComponent implements OnInit, OnDestroy {
  localizedPostContents?: ILocalizedPostContent[];
  eventSubscriber?: Subscription;

  constructor(
    protected localizedPostContentService: LocalizedPostContentService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.localizedPostContentService
      .query()
      .subscribe((res: HttpResponse<ILocalizedPostContent[]>) => (this.localizedPostContents = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLocalizedPostContents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILocalizedPostContent): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInLocalizedPostContents(): void {
    this.eventSubscriber = this.eventManager.subscribe('localizedPostContentListModification', () => this.loadAll());
  }

  delete(localizedPostContent: ILocalizedPostContent): void {
    const modalRef = this.modalService.open(LocalizedPostContentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.localizedPostContent = localizedPostContent;
  }
}
