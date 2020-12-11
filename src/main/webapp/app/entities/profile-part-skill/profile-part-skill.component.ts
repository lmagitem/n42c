import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {JhiEventManager} from 'ng-jhipster';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {IProfilePartSkill} from 'app/shared/model/profile-part-skill.model';
import {ProfilePartSkillService} from './profile-part-skill.service';
import {ProfilePartSkillDeleteDialogComponent} from './profile-part-skill-delete-dialog.component';

@Component({
  selector: 'jhi-profile-part-skill',
  templateUrl: './profile-part-skill.component.html',
})
export class ProfilePartSkillComponent implements OnInit, OnDestroy {
  profilePartSkills?: IProfilePartSkill[];
  eventSubscriber?: Subscription;

  constructor(
    protected profilePartSkillService: ProfilePartSkillService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.profilePartSkillService.query().subscribe((res: HttpResponse<IProfilePartSkill[]>) => (this.profilePartSkills = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProfilePartSkills();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProfilePartSkill): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProfilePartSkills(): void {
    this.eventSubscriber = this.eventManager.subscribe('profilePartSkillListModification', () => this.loadAll());
  }

  delete(profilePartSkill: IProfilePartSkill): void {
    const modalRef = this.modalService.open(ProfilePartSkillDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.profilePartSkill = profilePartSkill;
  }
}
