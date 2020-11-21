import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILocalizedNinthStratagemGroup, LocalizedNinthStratagemGroup } from 'app/shared/model/localized-ninth-stratagem-group.model';
import { LocalizedNinthStratagemGroupService } from './localized-ninth-stratagem-group.service';
import { INinthStratagemGroup } from 'app/shared/model/ninth-stratagem-group.model';
import { NinthStratagemGroupService } from 'app/entities/ninth-stratagem-group/ninth-stratagem-group.service';

@Component({
  selector: 'jhi-localized-ninth-stratagem-group-update',
  templateUrl: './localized-ninth-stratagem-group-update.component.html',
})
export class LocalizedNinthStratagemGroupUpdateComponent implements OnInit {
  isSaving = false;
  ninthstratagemgroups: INinthStratagemGroup[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    language: [null, [Validators.required]],
    stratagemGroup: [null, Validators.required],
  });

  constructor(
    protected localizedNinthStratagemGroupService: LocalizedNinthStratagemGroupService,
    protected ninthStratagemGroupService: NinthStratagemGroupService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedNinthStratagemGroup }) => {
      this.updateForm(localizedNinthStratagemGroup);

      this.ninthStratagemGroupService
        .query()
        .subscribe((res: HttpResponse<INinthStratagemGroup[]>) => (this.ninthstratagemgroups = res.body || []));
    });
  }

  updateForm(localizedNinthStratagemGroup: ILocalizedNinthStratagemGroup): void {
    this.editForm.patchValue({
      id: localizedNinthStratagemGroup.id,
      name: localizedNinthStratagemGroup.name,
      language: localizedNinthStratagemGroup.language,
      stratagemGroup: localizedNinthStratagemGroup.stratagemGroup,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const localizedNinthStratagemGroup = this.createFromForm();
    if (localizedNinthStratagemGroup.id !== undefined) {
      this.subscribeToSaveResponse(this.localizedNinthStratagemGroupService.update(localizedNinthStratagemGroup));
    } else {
      this.subscribeToSaveResponse(this.localizedNinthStratagemGroupService.create(localizedNinthStratagemGroup));
    }
  }

  private createFromForm(): ILocalizedNinthStratagemGroup {
    return {
      ...new LocalizedNinthStratagemGroup(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      language: this.editForm.get(['language'])!.value,
      stratagemGroup: this.editForm.get(['stratagemGroup'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocalizedNinthStratagemGroup>>): void {
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

  trackById(index: number, item: INinthStratagemGroup): any {
    return item.id;
  }
}
