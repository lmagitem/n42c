import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILocalizedNinthObjective, LocalizedNinthObjective } from 'app/shared/model/localized-ninth-objective.model';
import { LocalizedNinthObjectiveService } from './localized-ninth-objective.service';
import { INinthObjective } from 'app/shared/model/ninth-objective.model';
import { NinthObjectiveService } from 'app/entities/ninth-objective/ninth-objective.service';

@Component({
  selector: 'jhi-localized-ninth-objective-update',
  templateUrl: './localized-ninth-objective-update.component.html',
})
export class LocalizedNinthObjectiveUpdateComponent implements OnInit {
  isSaving = false;
  ninthobjectives: INinthObjective[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    objective: [],
  });

  constructor(
    protected localizedNinthObjectiveService: LocalizedNinthObjectiveService,
    protected ninthObjectiveService: NinthObjectiveService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedNinthObjective }) => {
      this.updateForm(localizedNinthObjective);

      this.ninthObjectiveService.query().subscribe((res: HttpResponse<INinthObjective[]>) => (this.ninthobjectives = res.body || []));
    });
  }

  updateForm(localizedNinthObjective: ILocalizedNinthObjective): void {
    this.editForm.patchValue({
      id: localizedNinthObjective.id,
      name: localizedNinthObjective.name,
      description: localizedNinthObjective.description,
      objective: localizedNinthObjective.objective,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const localizedNinthObjective = this.createFromForm();
    if (localizedNinthObjective.id !== undefined) {
      this.subscribeToSaveResponse(this.localizedNinthObjectiveService.update(localizedNinthObjective));
    } else {
      this.subscribeToSaveResponse(this.localizedNinthObjectiveService.create(localizedNinthObjective));
    }
  }

  private createFromForm(): ILocalizedNinthObjective {
    return {
      ...new LocalizedNinthObjective(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      objective: this.editForm.get(['objective'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocalizedNinthObjective>>): void {
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

  trackById(index: number, item: INinthObjective): any {
    return item.id;
  }
}
