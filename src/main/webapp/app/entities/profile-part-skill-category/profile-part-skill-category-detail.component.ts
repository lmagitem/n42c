import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfilePartSkillCategory } from 'app/shared/model/profile-part-skill-category.model';

@Component({
  selector: 'jhi-profile-part-skill-category-detail',
  templateUrl: './profile-part-skill-category-detail.component.html',
})
export class ProfilePartSkillCategoryDetailComponent implements OnInit {
  profilePartSkillCategory: IProfilePartSkillCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profilePartSkillCategory }) => (this.profilePartSkillCategory = profilePartSkillCategory));
  }

  previousState(): void {
    window.history.back();
  }
}
