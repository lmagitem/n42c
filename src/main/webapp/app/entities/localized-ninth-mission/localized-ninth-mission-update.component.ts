import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ILocalizedNinthMission, LocalizedNinthMission } from 'app/shared/model/localized-ninth-mission.model';
import { LocalizedNinthMissionService } from './localized-ninth-mission.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { INinthMission } from 'app/shared/model/ninth-mission.model';
import { NinthMissionService } from 'app/entities/ninth-mission/ninth-mission.service';

@Component({
  selector: 'jhi-localized-ninth-mission-update',
  templateUrl: './localized-ninth-mission-update.component.html',
})
export class LocalizedNinthMissionUpdateComponent implements OnInit {
  isSaving = false;
  ninthmissions: INinthMission[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    briefing: [],
    language: [null, [Validators.required]],
    mission: [null, Validators.required],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected localizedNinthMissionService: LocalizedNinthMissionService,
    protected ninthMissionService: NinthMissionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedNinthMission }) => {
      this.updateForm(localizedNinthMission);

      this.ninthMissionService.query().subscribe((res: HttpResponse<INinthMission[]>) => (this.ninthmissions = res.body || []));
    });
  }

  updateForm(localizedNinthMission: ILocalizedNinthMission): void {
    this.editForm.patchValue({
      id: localizedNinthMission.id,
      name: localizedNinthMission.name,
      briefing: localizedNinthMission.briefing,
      language: localizedNinthMission.language,
      mission: localizedNinthMission.mission,
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
    const localizedNinthMission = this.createFromForm();
    if (localizedNinthMission.id !== undefined) {
      this.subscribeToSaveResponse(this.localizedNinthMissionService.update(localizedNinthMission));
    } else {
      this.subscribeToSaveResponse(this.localizedNinthMissionService.create(localizedNinthMission));
    }
  }

  private createFromForm(): ILocalizedNinthMission {
    return {
      ...new LocalizedNinthMission(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      briefing: this.editForm.get(['briefing'])!.value,
      language: this.editForm.get(['language'])!.value,
      mission: this.editForm.get(['mission'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocalizedNinthMission>>): void {
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

  trackById(index: number, item: INinthMission): any {
    return item.id;
  }
}
