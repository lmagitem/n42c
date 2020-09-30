import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { INinthArmyMoment, NinthArmyMoment } from 'app/shared/model/ninth-army-moment.model';
import { NinthArmyMomentService } from './ninth-army-moment.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { INinthArmyUnit } from 'app/shared/model/ninth-army-unit.model';
import { NinthArmyUnitService } from 'app/entities/ninth-army-unit/ninth-army-unit.service';
import { INinthObjective } from 'app/shared/model/ninth-objective.model';
import { NinthObjectiveService } from 'app/entities/ninth-objective/ninth-objective.service';
import { INinthBattle } from 'app/shared/model/ninth-battle.model';
import { NinthBattleService } from 'app/entities/ninth-battle/ninth-battle.service';
import { INinthArmy } from 'app/shared/model/ninth-army.model';
import { NinthArmyService } from 'app/entities/ninth-army/ninth-army.service';

type SelectableEntity = INinthArmyUnit | INinthObjective | INinthBattle | INinthArmy;

type SelectableManyToManyEntity = INinthArmyUnit | INinthObjective;

@Component({
  selector: 'jhi-ninth-army-moment-update',
  templateUrl: './ninth-army-moment-update.component.html',
})
export class NinthArmyMomentUpdateComponent implements OnInit {
  isSaving = false;
  nintharmyunits: INinthArmyUnit[] = [];
  ninthobjectives: INinthObjective[] = [];
  ninthbattles: INinthBattle[] = [];
  nintharmies: INinthArmy[] = [];

  editForm = this.fb.group({
    id: [],
    current: [null, [Validators.required]],
    sinceInstant: [null, [Validators.required]],
    majorVictories: [],
    minorVictories: [],
    draws: [],
    minorDefeats: [],
    majorDefeats: [],
    requisition: [],
    supplyLimit: [],
    supplyUsed: [],
    objectives: [],
    notes: [],
    selectedUnits: [],
    selectedObjectives: [],
    battle: [],
    army: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected ninthArmyMomentService: NinthArmyMomentService,
    protected ninthArmyUnitService: NinthArmyUnitService,
    protected ninthObjectiveService: NinthObjectiveService,
    protected ninthBattleService: NinthBattleService,
    protected ninthArmyService: NinthArmyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthArmyMoment }) => {
      if (!ninthArmyMoment.id) {
        const today = moment().startOf('day');
        ninthArmyMoment.sinceInstant = today;
      }

      this.updateForm(ninthArmyMoment);

      this.ninthArmyUnitService.query().subscribe((res: HttpResponse<INinthArmyUnit[]>) => (this.nintharmyunits = res.body || []));

      this.ninthObjectiveService.query().subscribe((res: HttpResponse<INinthObjective[]>) => (this.ninthobjectives = res.body || []));

      this.ninthBattleService.query().subscribe((res: HttpResponse<INinthBattle[]>) => (this.ninthbattles = res.body || []));

      this.ninthArmyService.query().subscribe((res: HttpResponse<INinthArmy[]>) => (this.nintharmies = res.body || []));
    });
  }

  updateForm(ninthArmyMoment: INinthArmyMoment): void {
    this.editForm.patchValue({
      id: ninthArmyMoment.id,
      current: ninthArmyMoment.current,
      sinceInstant: ninthArmyMoment.sinceInstant ? ninthArmyMoment.sinceInstant.format(DATE_TIME_FORMAT) : null,
      majorVictories: ninthArmyMoment.majorVictories,
      minorVictories: ninthArmyMoment.minorVictories,
      draws: ninthArmyMoment.draws,
      minorDefeats: ninthArmyMoment.minorDefeats,
      majorDefeats: ninthArmyMoment.majorDefeats,
      requisition: ninthArmyMoment.requisition,
      supplyLimit: ninthArmyMoment.supplyLimit,
      supplyUsed: ninthArmyMoment.supplyUsed,
      objectives: ninthArmyMoment.objectives,
      notes: ninthArmyMoment.notes,
      selectedUnits: ninthArmyMoment.selectedUnits,
      selectedObjectives: ninthArmyMoment.selectedObjectives,
      battle: ninthArmyMoment.battle,
      army: ninthArmyMoment.army,
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
    const ninthArmyMoment = this.createFromForm();
    if (ninthArmyMoment.id !== undefined) {
      this.subscribeToSaveResponse(this.ninthArmyMomentService.update(ninthArmyMoment));
    } else {
      this.subscribeToSaveResponse(this.ninthArmyMomentService.create(ninthArmyMoment));
    }
  }

  private createFromForm(): INinthArmyMoment {
    return {
      ...new NinthArmyMoment(),
      id: this.editForm.get(['id'])!.value,
      current: this.editForm.get(['current'])!.value,
      sinceInstant: this.editForm.get(['sinceInstant'])!.value
        ? moment(this.editForm.get(['sinceInstant'])!.value, DATE_TIME_FORMAT)
        : undefined,
      majorVictories: this.editForm.get(['majorVictories'])!.value,
      minorVictories: this.editForm.get(['minorVictories'])!.value,
      draws: this.editForm.get(['draws'])!.value,
      minorDefeats: this.editForm.get(['minorDefeats'])!.value,
      majorDefeats: this.editForm.get(['majorDefeats'])!.value,
      requisition: this.editForm.get(['requisition'])!.value,
      supplyLimit: this.editForm.get(['supplyLimit'])!.value,
      supplyUsed: this.editForm.get(['supplyUsed'])!.value,
      objectives: this.editForm.get(['objectives'])!.value,
      notes: this.editForm.get(['notes'])!.value,
      selectedUnits: this.editForm.get(['selectedUnits'])!.value,
      selectedObjectives: this.editForm.get(['selectedObjectives'])!.value,
      battle: this.editForm.get(['battle'])!.value,
      army: this.editForm.get(['army'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INinthArmyMoment>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: SelectableManyToManyEntity[], option: SelectableManyToManyEntity): SelectableManyToManyEntity {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
