import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {IProfilePartSkill} from 'app/shared/model/profile-part-skill.model';
import {ProfilePartSkillService} from './profile-part-skill.service';

@Component({
  templateUrl: './profile-part-skill-delete-dialog.component.html',
})
export class ProfilePartSkillDeleteDialogComponent {
  profilePartSkill?: IProfilePartSkill;

  constructor(
    protected profilePartSkillService: ProfilePartSkillService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.profilePartSkillService.delete(id).subscribe(() => {
      this.eventManager.broadcast('profilePartSkillListModification');
      this.activeModal.close();
    });
  }
}
