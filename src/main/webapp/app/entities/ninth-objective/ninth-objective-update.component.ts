import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { INinthObjective, NinthObjective } from 'app/shared/model/ninth-objective.model';
import { NinthObjectiveService } from './ninth-objective.service';

@Component({
  selector: 'jhi-ninth-objective-update',
  templateUrl: './ninth-objective-update.component.html',
})
export class NinthObjectiveUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    shareable: [],
    type: [],
  });

  constructor(protected ninthObjectiveService: NinthObjectiveService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthObjective }) => {
      this.updateForm(ninthObjective);
    });
  }

  updateForm(ninthObjective: INinthObjective): void {
    this.editForm.patchValue({
      id: ninthObjective.id,
      shareable: ninthObjective.shareable,
      type: ninthObjective.type,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ninthObjective = this.createFromForm();
    if (ninthObjective.id !== undefined) {
      this.subscribeToSaveResponse(this.ninthObjectiveService.update(ninthObjective));
    } else {
      this.subscribeToSaveResponse(this.ninthObjectiveService.create(ninthObjective));
    }
  }

  private createFromForm(): INinthObjective {
    return {
      ...new NinthObjective(),
      id: this.editForm.get(['id'])!.value,
      shareable: this.editForm.get(['shareable'])!.value,
      type: this.editForm.get(['type'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INinthObjective>>): void {
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
}
