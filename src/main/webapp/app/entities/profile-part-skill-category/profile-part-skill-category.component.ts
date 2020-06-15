import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProfilePartSkillCategory } from 'app/shared/model/profile-part-skill-category.model';
import { ProfilePartSkillCategoryService } from './profile-part-skill-category.service';
import { ProfilePartSkillCategoryDeleteDialogComponent } from './profile-part-skill-category-delete-dialog.component';

@Component({
  selector: 'jhi-profile-part-skill-category',
  templateUrl: './profile-part-skill-category.component.html',
})
export class ProfilePartSkillCategoryComponent implements OnInit, OnDestroy {
  profilePartSkillCategories?: IProfilePartSkillCategory[];
  eventSubscriber?: Subscription;

  constructor(
    protected profilePartSkillCategoryService: ProfilePartSkillCategoryService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.profilePartSkillCategoryService
      .query()
      .subscribe((res: HttpResponse<IProfilePartSkillCategory[]>) => (this.profilePartSkillCategories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProfilePartSkillCategories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProfilePartSkillCategory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProfilePartSkillCategories(): void {
    this.eventSubscriber = this.eventManager.subscribe('profilePartSkillCategoryListModification', () => this.loadAll());
  }

  delete(profilePartSkillCategory: IProfilePartSkillCategory): void {
    const modalRef = this.modalService.open(ProfilePartSkillCategoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.profilePartSkillCategory = profilePartSkillCategory;
  }
}
