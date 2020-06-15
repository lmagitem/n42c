import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProfilePartSimpleItem, ProfilePartSimpleItem } from 'app/shared/model/profile-part-simple-item.model';
import { ProfilePartSimpleItemService } from './profile-part-simple-item.service';
import { IProfilePart } from 'app/shared/model/profile-part.model';
import { ProfilePartService } from 'app/entities/profile-part/profile-part.service';

@Component({
  selector: 'jhi-profile-part-simple-item-update',
  templateUrl: './profile-part-simple-item-update.component.html',
})
export class ProfilePartSimpleItemUpdateComponent implements OnInit {
  isSaving = false;
  profileparts: IProfilePart[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    subTitle: [],
    date: [null, [Validators.required]],
    content: [],
    simpleItems: [],
  });

  constructor(
    protected profilePartSimpleItemService: ProfilePartSimpleItemService,
    protected profilePartService: ProfilePartService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profilePartSimpleItem }) => {
      if (!profilePartSimpleItem.id) {
        const today = moment().startOf('day');
        profilePartSimpleItem.date = today;
      }

      this.updateForm(profilePartSimpleItem);

      this.profilePartService.query().subscribe((res: HttpResponse<IProfilePart[]>) => (this.profileparts = res.body || []));
    });
  }

  updateForm(profilePartSimpleItem: IProfilePartSimpleItem): void {
    this.editForm.patchValue({
      id: profilePartSimpleItem.id,
      title: profilePartSimpleItem.title,
      subTitle: profilePartSimpleItem.subTitle,
      date: profilePartSimpleItem.date ? profilePartSimpleItem.date.format(DATE_TIME_FORMAT) : null,
      content: profilePartSimpleItem.content,
      simpleItems: profilePartSimpleItem.simpleItems,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const profilePartSimpleItem = this.createFromForm();
    if (profilePartSimpleItem.id !== undefined) {
      this.subscribeToSaveResponse(this.profilePartSimpleItemService.update(profilePartSimpleItem));
    } else {
      this.subscribeToSaveResponse(this.profilePartSimpleItemService.create(profilePartSimpleItem));
    }
  }

  private createFromForm(): IProfilePartSimpleItem {
    return {
      ...new ProfilePartSimpleItem(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      subTitle: this.editForm.get(['subTitle'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      content: this.editForm.get(['content'])!.value,
      simpleItems: this.editForm.get(['simpleItems'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfilePartSimpleItem>>): void {
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

  trackById(index: number, item: IProfilePart): any {
    return item.id;
  }
}
