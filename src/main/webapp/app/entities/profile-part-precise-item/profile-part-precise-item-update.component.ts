import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IProfilePartPreciseItem, ProfilePartPreciseItem } from 'app/shared/model/profile-part-precise-item.model';
import { ProfilePartPreciseItemService } from './profile-part-precise-item.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IProfilePart } from 'app/shared/model/profile-part.model';
import { ProfilePartService } from 'app/entities/profile-part/profile-part.service';

@Component({
  selector: 'jhi-profile-part-precise-item-update',
  templateUrl: './profile-part-precise-item-update.component.html',
})
export class ProfilePartPreciseItemUpdateComponent implements OnInit {
  isSaving = false;
  profileparts: IProfilePart[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    subTitle: [],
    start: [null, [Validators.required]],
    end: [],
    locationName: [],
    locationLat: [],
    locationLong: [],
    content: [],
    profilePart: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected profilePartPreciseItemService: ProfilePartPreciseItemService,
    protected profilePartService: ProfilePartService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profilePartPreciseItem }) => {
      if (!profilePartPreciseItem.id) {
        const today = moment().startOf('day');
        profilePartPreciseItem.start = today;
        profilePartPreciseItem.end = today;
      }

      this.updateForm(profilePartPreciseItem);

      this.profilePartService.query().subscribe((res: HttpResponse<IProfilePart[]>) => (this.profileparts = res.body || []));
    });
  }

  updateForm(profilePartPreciseItem: IProfilePartPreciseItem): void {
    this.editForm.patchValue({
      id: profilePartPreciseItem.id,
      title: profilePartPreciseItem.title,
      subTitle: profilePartPreciseItem.subTitle,
      start: profilePartPreciseItem.start ? profilePartPreciseItem.start.format(DATE_TIME_FORMAT) : null,
      end: profilePartPreciseItem.end ? profilePartPreciseItem.end.format(DATE_TIME_FORMAT) : null,
      locationName: profilePartPreciseItem.locationName,
      locationLat: profilePartPreciseItem.locationLat,
      locationLong: profilePartPreciseItem.locationLong,
      content: profilePartPreciseItem.content,
      profilePart: profilePartPreciseItem.profilePart,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('n42cApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const profilePartPreciseItem = this.createFromForm();
    if (profilePartPreciseItem.id !== undefined) {
      this.subscribeToSaveResponse(this.profilePartPreciseItemService.update(profilePartPreciseItem));
    } else {
      this.subscribeToSaveResponse(this.profilePartPreciseItemService.create(profilePartPreciseItem));
    }
  }

  private createFromForm(): IProfilePartPreciseItem {
    return {
      ...new ProfilePartPreciseItem(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      subTitle: this.editForm.get(['subTitle'])!.value,
      start: this.editForm.get(['start'])!.value ? moment(this.editForm.get(['start'])!.value, DATE_TIME_FORMAT) : undefined,
      end: this.editForm.get(['end'])!.value ? moment(this.editForm.get(['end'])!.value, DATE_TIME_FORMAT) : undefined,
      locationName: this.editForm.get(['locationName'])!.value,
      locationLat: this.editForm.get(['locationLat'])!.value,
      locationLong: this.editForm.get(['locationLong'])!.value,
      content: this.editForm.get(['content'])!.value,
      profilePart: this.editForm.get(['profilePart'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfilePartPreciseItem>>): void {
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
