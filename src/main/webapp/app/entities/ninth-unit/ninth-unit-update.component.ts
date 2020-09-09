import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { INinthUnit, NinthUnit } from 'app/shared/model/ninth-unit.model';
import { NinthUnitService } from './ninth-unit.service';
import { IPlayer } from 'app/shared/model/player.model';
import { PlayerService } from 'app/entities/player/player.service';

@Component({
  selector: 'jhi-ninth-unit-update',
  templateUrl: './ninth-unit-update.component.html',
})
export class NinthUnitUpdateComponent implements OnInit {
  isSaving = false;
  players: IPlayer[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    datasheet: [],
    faction: [],
    subfaction: [],
    battlefieldRole: [],
    keywords: [],
    owner: [],
  });

  constructor(
    protected ninthUnitService: NinthUnitService,
    protected playerService: PlayerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthUnit }) => {
      this.updateForm(ninthUnit);

      this.playerService.query().subscribe((res: HttpResponse<IPlayer[]>) => (this.players = res.body || []));
    });
  }

  updateForm(ninthUnit: INinthUnit): void {
    this.editForm.patchValue({
      id: ninthUnit.id,
      name: ninthUnit.name,
      datasheet: ninthUnit.datasheet,
      faction: ninthUnit.faction,
      subfaction: ninthUnit.subfaction,
      battlefieldRole: ninthUnit.battlefieldRole,
      keywords: ninthUnit.keywords,
      owner: ninthUnit.owner,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ninthUnit = this.createFromForm();
    if (ninthUnit.id !== undefined) {
      this.subscribeToSaveResponse(this.ninthUnitService.update(ninthUnit));
    } else {
      this.subscribeToSaveResponse(this.ninthUnitService.create(ninthUnit));
    }
  }

  private createFromForm(): INinthUnit {
    return {
      ...new NinthUnit(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      datasheet: this.editForm.get(['datasheet'])!.value,
      faction: this.editForm.get(['faction'])!.value,
      subfaction: this.editForm.get(['subfaction'])!.value,
      battlefieldRole: this.editForm.get(['battlefieldRole'])!.value,
      keywords: this.editForm.get(['keywords'])!.value,
      owner: this.editForm.get(['owner'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INinthUnit>>): void {
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

  trackById(index: number, item: IPlayer): any {
    return item.id;
  }
}
