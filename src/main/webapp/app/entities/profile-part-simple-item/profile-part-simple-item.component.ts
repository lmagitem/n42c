import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiLanguageService, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProfilePartSimpleItem } from 'app/shared/model/profile-part-simple-item.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ProfilePartSimpleItemService } from './profile-part-simple-item.service';
import { ProfilePartSimpleItemDeleteDialogComponent } from './profile-part-simple-item-delete-dialog.component';

@Component({
  selector: 'jhi-profile-part-simple-item',
  templateUrl: './profile-part-simple-item.component.html',
})
export class ProfilePartSimpleItemComponent implements OnInit, OnDestroy {
  profilePartSimpleItems: IProfilePartSimpleItem[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;
  locale: string;

  constructor(
    protected profilePartSimpleItemService: ProfilePartSimpleItemService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks,
    protected languageService: JhiLanguageService
  ) {
    this.profilePartSimpleItems = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
    this.locale = this.languageService.getCurrentLanguage();
  }

  loadAll(): void {
    this.profilePartSimpleItemService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IProfilePartSimpleItem[]>) => this.paginateProfilePartSimpleItems(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.profilePartSimpleItems = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProfilePartSimpleItems();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProfilePartSimpleItem): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProfilePartSimpleItems(): void {
    this.eventSubscriber = this.eventManager.subscribe('profilePartSimpleItemListModification', () => this.reset());
  }

  delete(profilePartSimpleItem: IProfilePartSimpleItem): void {
    const modalRef = this.modalService.open(ProfilePartSimpleItemDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.profilePartSimpleItem = profilePartSimpleItem;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateProfilePartSimpleItems(data: IProfilePartSimpleItem[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.profilePartSimpleItems.push(data[i]);
      }
    }
  }
}
