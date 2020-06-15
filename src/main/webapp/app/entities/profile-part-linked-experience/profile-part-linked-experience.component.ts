import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProfilePartLinkedExperience } from 'app/shared/model/profile-part-linked-experience.model';
import { ProfilePartLinkedExperienceService } from './profile-part-linked-experience.service';
import { ProfilePartLinkedExperienceDeleteDialogComponent } from './profile-part-linked-experience-delete-dialog.component';

@Component({
  selector: 'jhi-profile-part-linked-experience',
  templateUrl: './profile-part-linked-experience.component.html',
})
export class ProfilePartLinkedExperienceComponent implements OnInit, OnDestroy {
  profilePartLinkedExperiences?: IProfilePartLinkedExperience[];
  eventSubscriber?: Subscription;

  constructor(
    protected profilePartLinkedExperienceService: ProfilePartLinkedExperienceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.profilePartLinkedExperienceService
      .query()
      .subscribe((res: HttpResponse<IProfilePartLinkedExperience[]>) => (this.profilePartLinkedExperiences = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProfilePartLinkedExperiences();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProfilePartLinkedExperience): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProfilePartLinkedExperiences(): void {
    this.eventSubscriber = this.eventManager.subscribe('profilePartLinkedExperienceListModification', () => this.loadAll());
  }

  delete(profilePartLinkedExperience: IProfilePartLinkedExperience): void {
    const modalRef = this.modalService.open(ProfilePartLinkedExperienceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.profilePartLinkedExperience = profilePartLinkedExperience;
  }
}
