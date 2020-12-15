import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {IAppUserProfile} from 'app/shared/model/app-user-profile.model';

@Component({
  selector: 'jhi-app-user-profile-detail',
  templateUrl: './app-user-profile-detail.component.html',
})
export class AppUserProfileDetailComponent implements OnInit {
  appUserProfile: IAppUserProfile | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({appUserProfile}) => (this.appUserProfile = appUserProfile));
  }

  previousState(): void {
    window.history.back();
  }
}
