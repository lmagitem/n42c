import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfilePartLinkedExperience } from 'app/shared/model/profile-part-linked-experience.model';

@Component({
  selector: 'jhi-profile-part-linked-experience-detail',
  templateUrl: './profile-part-linked-experience-detail.component.html',
})
export class ProfilePartLinkedExperienceDetailComponent implements OnInit {
  profilePartLinkedExperience: IProfilePartLinkedExperience | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      ({ profilePartLinkedExperience }) => (this.profilePartLinkedExperience = profilePartLinkedExperience)
    );
  }

  previousState(): void {
    window.history.back();
  }
}
