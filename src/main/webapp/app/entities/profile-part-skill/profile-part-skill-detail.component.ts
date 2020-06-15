import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfilePartSkill } from 'app/shared/model/profile-part-skill.model';

@Component({
  selector: 'jhi-profile-part-skill-detail',
  templateUrl: './profile-part-skill-detail.component.html',
})
export class ProfilePartSkillDetailComponent implements OnInit {
  profilePartSkill: IProfilePartSkill | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profilePartSkill }) => (this.profilePartSkill = profilePartSkill));
  }

  previousState(): void {
    window.history.back();
  }
}
