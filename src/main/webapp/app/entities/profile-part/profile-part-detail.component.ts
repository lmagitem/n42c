import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfilePart } from 'app/shared/model/profile-part.model';

@Component({
  selector: 'jhi-profile-part-detail',
  templateUrl: './profile-part-detail.component.html',
})
export class ProfilePartDetailComponent implements OnInit {
  profilePart: IProfilePart | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profilePart }) => (this.profilePart = profilePart));
  }

  previousState(): void {
    window.history.back();
  }
}
