import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProfilePartSkillCategory } from 'app/shared/model/profile-part-skill-category.model';
import { ProfilePartSkillCategoryService } from './profile-part-skill-category.service';

@Component({
  templateUrl: './profile-part-skill-category-delete-dialog.component.html',
})
export class ProfilePartSkillCategoryDeleteDialogComponent {
  profilePartSkillCategory?: IProfilePartSkillCategory;

  constructor(
    protected profilePartSkillCategoryService: ProfilePartSkillCategoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.profilePartSkillCategoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('profilePartSkillCategoryListModification');
      this.activeModal.close();
    });
  }
}
