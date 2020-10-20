import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProfilePartPreciseItem } from 'app/shared/model/profile-part-precise-item.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ProfilePartPreciseItemService } from './profile-part-precise-item.service';
import { ProfilePartPreciseItemDeleteDialogComponent } from './profile-part-precise-item-delete-dialog.component';

@Component({
  selector: 'jhi-profile-part-precise-item',
  templateUrl: './profile-part-precise-item.component.html',
})
export class ProfilePartPreciseItemComponent implements OnInit, OnDestroy {
  profilePartPreciseItems: IProfilePartPreciseItem[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected profilePartPreciseItemService: ProfilePartPreciseItemService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.profilePartPreciseItems = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.profilePartPreciseItemService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IProfilePartPreciseItem[]>) => this.paginateProfilePartPreciseItems(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.profilePartPreciseItems = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProfilePartPreciseItems();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProfilePartPreciseItem): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInProfilePartPreciseItems(): void {
    this.eventSubscriber = this.eventManager.subscribe('profilePartPreciseItemListModification', () => this.reset());
  }

  delete(profilePartPreciseItem: IProfilePartPreciseItem): void {
    const modalRef = this.modalService.open(ProfilePartPreciseItemDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.profilePartPreciseItem = profilePartPreciseItem;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateProfilePartPreciseItems(data: IProfilePartPreciseItem[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.profilePartPreciseItems.push(data[i]);
      }
    }
  }
}
