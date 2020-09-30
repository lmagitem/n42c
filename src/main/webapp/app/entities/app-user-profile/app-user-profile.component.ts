import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAppUserProfile } from 'app/shared/model/app-user-profile.model';
import { AppUserProfileService } from './app-user-profile.service';
import { AppUserProfileDeleteDialogComponent } from './app-user-profile-delete-dialog.component';

@Component({
  selector: 'jhi-app-user-profile',
  templateUrl: './app-user-profile.component.html',
})
export class AppUserProfileComponent implements OnInit, OnDestroy {
  appUserProfiles?: IAppUserProfile[];
  eventSubscriber?: Subscription;

  constructor(
    protected appUserProfileService: AppUserProfileService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.appUserProfileService.query().subscribe((res: HttpResponse<IAppUserProfile[]>) => (this.appUserProfiles = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAppUserProfiles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAppUserProfile): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInAppUserProfiles(): void {
    this.eventSubscriber = this.eventManager.subscribe('appUserProfileListModification', () => this.loadAll());
  }

  delete(appUserProfile: IAppUserProfile): void {
    const modalRef = this.modalService.open(AppUserProfileDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.appUserProfile = appUserProfile;
  }
}
