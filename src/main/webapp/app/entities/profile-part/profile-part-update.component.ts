import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import {IProfilePart, ProfilePart} from 'app/shared/model/profile-part.model';
import {ProfilePartService} from './profile-part.service';
import {IAppUserProfile} from 'app/shared/model/app-user-profile.model';
import {AppUserProfileService} from 'app/entities/app-user-profile/app-user-profile.service';

@Component({
  selector: 'jhi-profile-part-update',
  templateUrl: './profile-part-update.component.html',
})
export class ProfilePartUpdateComponent implements OnInit {
  isSaving = false;
  appuserprofiles: IAppUserProfile[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    type: [null, [Validators.required]],
    index: [],
    order: [null, [Validators.required]],
    profile: [],
  });

  constructor(
    protected profilePartService: ProfilePartService,
    protected appUserProfileService: AppUserProfileService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({profilePart}) => {
      this.updateForm(profilePart);

      this.appUserProfileService.query().subscribe((res: HttpResponse<IAppUserProfile[]>) => (this.appuserprofiles = res.body || []));
    });
  }

  updateForm(profilePart: IProfilePart): void {
    this.editForm.patchValue({
      id: profilePart.id,
      title: profilePart.title,
      type: profilePart.type,
      index: profilePart.index,
      order: profilePart.order,
      profile: profilePart.profile,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const profilePart = this.createFromForm();
    if (profilePart.id !== undefined) {
      this.subscribeToSaveResponse(this.profilePartService.update(profilePart));
    } else {
      this.subscribeToSaveResponse(this.profilePartService.create(profilePart));
    }
  }

  trackById(index: number, item: IAppUserProfile): any {
    return item.id;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfilePart>>): void {
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

  private createFromForm(): IProfilePart {
    return {
      ...new ProfilePart(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      type: this.editForm.get(['type'])!.value,
      index: this.editForm.get(['index'])!.value,
      order: this.editForm.get(['order'])!.value,
      profile: this.editForm.get(['profile'])!.value,
    };
  }
}
