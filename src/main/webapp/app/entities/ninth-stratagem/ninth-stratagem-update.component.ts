import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import {INinthStratagem, NinthStratagem} from 'app/shared/model/ninth-stratagem.model';
import {NinthStratagemService} from './ninth-stratagem.service';
import {INinthStratagemGroup} from 'app/shared/model/ninth-stratagem-group.model';
import {NinthStratagemGroupService} from 'app/entities/ninth-stratagem-group/ninth-stratagem-group.service';

@Component({
  selector: 'jhi-ninth-stratagem-update',
  templateUrl: './ninth-stratagem-update.component.html',
})
export class NinthStratagemUpdateComponent implements OnInit {
  isSaving = false;
  ninthstratagemgroups: INinthStratagemGroup[] = [];

  editForm = this.fb.group({
    id: [],
    cost: [],
    faction: [],
    subfaction: [],
    turn: [],
    phase: [],
    group: [],
  });

  constructor(
    protected ninthStratagemService: NinthStratagemService,
    protected ninthStratagemGroupService: NinthStratagemGroupService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthStratagem }) => {
      this.updateForm(ninthStratagem);

      this.ninthStratagemGroupService
        .query()
        .subscribe((res: HttpResponse<INinthStratagemGroup[]>) => (this.ninthstratagemgroups = res.body || []));
    });
  }

  updateForm(ninthStratagem: INinthStratagem): void {
    this.editForm.patchValue({
      id: ninthStratagem.id,
      cost: ninthStratagem.cost,
      faction: ninthStratagem.faction,
      subfaction: ninthStratagem.subfaction,
      turn: ninthStratagem.turn,
      phase: ninthStratagem.phase,
      group: ninthStratagem.group,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ninthStratagem = this.createFromForm();
    if (ninthStratagem.id !== undefined) {
      this.subscribeToSaveResponse(this.ninthStratagemService.update(ninthStratagem));
    } else {
      this.subscribeToSaveResponse(this.ninthStratagemService.create(ninthStratagem));
    }
  }

  private createFromForm(): INinthStratagem {
    return {
      ...new NinthStratagem(),
      id: this.editForm.get(['id'])!.value,
      cost: this.editForm.get(['cost'])!.value,
      faction: this.editForm.get(['faction'])!.value,
      subfaction: this.editForm.get(['subfaction'])!.value,
      turn: this.editForm.get(['turn'])!.value,
      phase: this.editForm.get(['phase'])!.value,
      group: this.editForm.get(['group'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INinthStratagem>>): void {
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
