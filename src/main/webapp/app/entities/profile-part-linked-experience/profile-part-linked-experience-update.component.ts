import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IProfilePartLinkedExperience, ProfilePartLinkedExperience } from 'app/shared/model/profile-part-linked-experience.model';
import { ProfilePartLinkedExperienceService } from './profile-part-linked-experience.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IProfilePartPreciseItem } from 'app/shared/model/profile-part-precise-item.model';
import { ProfilePartPreciseItemService } from 'app/entities/profile-part-precise-item/profile-part-precise-item.service';

@Component({
  selector: 'jhi-profile-part-linked-experience-update',
  templateUrl: './profile-part-linked-experience-update.component.html',
})
export class ProfilePartLinkedExperienceUpdateComponent implements OnInit {
  isSaving = false;
  profilepartpreciseitems: IProfilePartPreciseItem[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    subTitle: [],
    date: [null, [Validators.required]],
    content: [],
    linkedItem: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected profilePartLinkedExperienceService: ProfilePartLinkedExperienceService,
    protected profilePartPreciseItemService: ProfilePartPreciseItemService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profilePartLinkedExperience }) => {
      if (!profilePartLinkedExperience.id) {
        const today = moment().startOf('day');
        profilePartLinkedExperience.date = today;
      }

      this.updateForm(profilePartLinkedExperience);

      this.profilePartPreciseItemService
        .query()
        .subscribe((res: HttpResponse<IProfilePartPreciseItem[]>) => (this.profilepartpreciseitems = res.body || []));
    });
  }

  updateForm(profilePartLinkedExperience: IProfilePartLinkedExperience): void {
    this.editForm.patchValue({
      id: profilePartLinkedExperience.id,
      title: profilePartLinkedExperience.title,
      subTitle: profilePartLinkedExperience.subTitle,
      date: profilePartLinkedExperience.date ? profilePartLinkedExperience.date.format(DATE_TIME_FORMAT) : null,
      content: profilePartLinkedExperience.content,
      linkedItem: profilePartLinkedExperience.linkedItem,
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
    const profilePartLinkedExperience = this.createFromForm();
    if (profilePartLinkedExperience.id !== undefined) {
      this.subscribeToSaveResponse(this.profilePartLinkedExperienceService.update(profilePartLinkedExperience));
    } else {
      this.subscribeToSaveResponse(this.profilePartLinkedExperienceService.create(profilePartLinkedExperience));
    }
  }

  private createFromForm(): IProfilePartLinkedExperience {
    return {
      ...new ProfilePartLinkedExperience(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      subTitle: this.editForm.get(['subTitle'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      content: this.editForm.get(['content'])!.value,
      linkedItem: this.editForm.get(['linkedItem'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfilePartLinkedExperience>>): void {
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

  trackById(index: number, item: IProfilePartPreciseItem): any {
    return item.id;
  }
}
