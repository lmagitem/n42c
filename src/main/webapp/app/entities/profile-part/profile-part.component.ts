import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {JhiEventManager} from 'ng-jhipster';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {IProfilePart} from 'app/shared/model/profile-part.model';
import {ProfilePartService} from './profile-part.service';
import {ProfilePartDeleteDialogComponent} from './profile-part-delete-dialog.component';

@Component({
  selector: 'jhi-profile-part',
  templateUrl: './profile-part.component.html',
})
export class ProfilePartComponent implements OnInit, OnDestroy {
  profileParts?: IProfilePart[];
  eventSubscriber?: Subscription;

  constructor(
    protected profilePartService: ProfilePartService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {
  }

  loadAll(): void {
    this.profilePartService.query().subscribe((res: HttpResponse<IProfilePart[]>) => (this.profileParts = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProfileParts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProfilePart): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProfileParts(): void {
    this.eventSubscriber = this.eventManager.subscribe('profilePartListModification', () => this.loadAll());
  }

  delete(profilePart: IProfilePart): void {
    const modalRef = this.modalService.open(ProfilePartDeleteDialogComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.profilePart = profilePart;
  }
}
