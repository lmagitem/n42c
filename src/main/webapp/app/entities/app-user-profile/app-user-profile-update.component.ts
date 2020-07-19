import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAppUserProfile, AppUserProfile } from 'app/shared/model/app-user-profile.model';
import { AppUserProfileService } from './app-user-profile.service';
import { IAppUser } from 'app/shared/model/app-user.model';
import { AppUserService } from 'app/entities/app-user/app-user.service';

@Component({
  selector: 'jhi-app-user-profile-update',
  templateUrl: './app-user-profile-update.component.html',
})
export class AppUserProfileUpdateComponent implements OnInit {
  isSaving = false;
  appusers: IAppUser[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    title: [],
    summary: [],
    headerBackgroundURI: [],
    language: [],
    profiles: [],
  });

  constructor(
    protected appUserProfileService: AppUserProfileService,
    protected appUserService: AppUserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appUserProfile }) => {
      this.updateForm(appUserProfile);

      this.appUserService.query().subscribe((res: HttpResponse<IAppUser[]>) => (this.appusers = res.body || []));
    });
  }

  updateForm(appUserProfile: IAppUserProfile): void {
    this.editForm.patchValue({
      id: appUserProfile.id,
      name: appUserProfile.name,
      title: appUserProfile.title,
      summary: appUserProfile.summary,
      headerBackgroundURI: appUserProfile.headerBackgroundURI,
      language: appUserProfile.language,
      profiles: appUserProfile.profiles,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const appUserProfile = this.createFromForm();
    if (appUserProfile.id !== undefined) {
      this.subscribeToSaveResponse(this.appUserProfileService.update(appUserProfile));
    } else {
      this.subscribeToSaveResponse(this.appUserProfileService.create(appUserProfile));
    }
  }

  private createFromForm(): IAppUserProfile {
    return {
      ...new AppUserProfile(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      title: this.editForm.get(['title'])!.value,
      summary: this.editForm.get(['summary'])!.value,
      headerBackgroundURI: this.editForm.get(['headerBackgroundURI'])!.value,
      language: this.editForm.get(['language'])!.value,
      profiles: this.editForm.get(['profiles'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppUserProfile>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IAppUser): any {
    return item.id;
  }
}