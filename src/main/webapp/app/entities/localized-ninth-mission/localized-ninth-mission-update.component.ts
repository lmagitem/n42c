import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILocalizedNinthMission, LocalizedNinthMission } from 'app/shared/model/localized-ninth-mission.model';
import { LocalizedNinthMissionService } from './localized-ninth-mission.service';
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
    mission: [],
  });

  constructor(
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
      mission: localizedNinthMission.mission,
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
