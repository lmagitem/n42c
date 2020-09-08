import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { INinthArmyUnitMoment, NinthArmyUnitMoment } from 'app/shared/model/ninth-army-unit-moment.model';
import { NinthArmyUnitMomentService } from './ninth-army-unit-moment.service';
import { INinthArmyUnit } from 'app/shared/model/ninth-army-unit.model';
import { NinthArmyUnitService } from 'app/entities/ninth-army-unit/ninth-army-unit.service';

@Component({
  selector: 'jhi-ninth-army-unit-moment-update',
  templateUrl: './ninth-army-unit-moment-update.component.html',
})
export class NinthArmyUnitMomentUpdateComponent implements OnInit {
  isSaving = false;
  nintharmyunits: INinthArmyUnit[] = [];

  editForm = this.fb.group({
    id: [],
    current: [null, [Validators.required]],
    sinceInstant: [null, [Validators.required]],
    pointsCost: [],
    powerRating: [],
    experiencePoints: [],
    crusadePoints: [],
    equipment: [],
    psychicPowers: [],
    warlordTraits: [],
    relics: [],
    otherUpgrades: [],
    battlesPlayed: [],
    battlesSurvived: [],
    rangedKills: [],
    meleeKills: [],
    psychicKills: [],
    crusadeRank: [],
    battleHonours: [],
    battleScars: [],
    armyUnit: [],
  });

  constructor(
    protected ninthArmyUnitMomentService: NinthArmyUnitMomentService,
    protected ninthArmyUnitService: NinthArmyUnitService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthArmyUnitMoment }) => {
      if (!ninthArmyUnitMoment.id) {
        const today = moment().startOf('day');
        ninthArmyUnitMoment.sinceInstant = today;
      }

      this.updateForm(ninthArmyUnitMoment);

      this.ninthArmyUnitService.query().subscribe((res: HttpResponse<INinthArmyUnit[]>) => (this.nintharmyunits = res.body || []));
    });
  }

  updateForm(ninthArmyUnitMoment: INinthArmyUnitMoment): void {
    this.editForm.patchValue({
      id: ninthArmyUnitMoment.id,
      current: ninthArmyUnitMoment.current,
      sinceInstant: ninthArmyUnitMoment.sinceInstant ? ninthArmyUnitMoment.sinceInstant.format(DATE_TIME_FORMAT) : null,
      pointsCost: ninthArmyUnitMoment.pointsCost,
      powerRating: ninthArmyUnitMoment.powerRating,
      experiencePoints: ninthArmyUnitMoment.experiencePoints,
      crusadePoints: ninthArmyUnitMoment.crusadePoints,
      equipment: ninthArmyUnitMoment.equipment,
      psychicPowers: ninthArmyUnitMoment.psychicPowers,
      warlordTraits: ninthArmyUnitMoment.warlordTraits,
      relics: ninthArmyUnitMoment.relics,
      otherUpgrades: ninthArmyUnitMoment.otherUpgrades,
      battlesPlayed: ninthArmyUnitMoment.battlesPlayed,
      battlesSurvived: ninthArmyUnitMoment.battlesSurvived,
      rangedKills: ninthArmyUnitMoment.rangedKills,
      meleeKills: ninthArmyUnitMoment.meleeKills,
      psychicKills: ninthArmyUnitMoment.psychicKills,
      crusadeRank: ninthArmyUnitMoment.crusadeRank,
      battleHonours: ninthArmyUnitMoment.battleHonours,
      battleScars: ninthArmyUnitMoment.battleScars,
      armyUnit: ninthArmyUnitMoment.armyUnit,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ninthArmyUnitMoment = this.createFromForm();
    if (ninthArmyUnitMoment.id !== undefined) {
      this.subscribeToSaveResponse(this.ninthArmyUnitMomentService.update(ninthArmyUnitMoment));
    } else {
      this.subscribeToSaveResponse(this.ninthArmyUnitMomentService.create(ninthArmyUnitMoment));
    }
  }

  private createFromForm(): INinthArmyUnitMoment {
    return {
      ...new NinthArmyUnitMoment(),
      id: this.editForm.get(['id'])!.value,
      current: this.editForm.get(['current'])!.value,
      sinceInstant: this.editForm.get(['sinceInstant'])!.value
        ? moment(this.editForm.get(['sinceInstant'])!.value, DATE_TIME_FORMAT)
        : undefined,
      pointsCost: this.editForm.get(['pointsCost'])!.value,
      powerRating: this.editForm.get(['powerRating'])!.value,
      experiencePoints: this.editForm.get(['experiencePoints'])!.value,
      crusadePoints: this.editForm.get(['crusadePoints'])!.value,
      equipment: this.editForm.get(['equipment'])!.value,
      psychicPowers: this.editForm.get(['psychicPowers'])!.value,
      warlordTraits: this.editForm.get(['warlordTraits'])!.value,
      relics: this.editForm.get(['relics'])!.value,
      otherUpgrades: this.editForm.get(['otherUpgrades'])!.value,
      battlesPlayed: this.editForm.get(['battlesPlayed'])!.value,
      battlesSurvived: this.editForm.get(['battlesSurvived'])!.value,
      rangedKills: this.editForm.get(['rangedKills'])!.value,
      meleeKills: this.editForm.get(['meleeKills'])!.value,
      psychicKills: this.editForm.get(['psychicKills'])!.value,
      crusadeRank: this.editForm.get(['crusadeRank'])!.value,
      battleHonours: this.editForm.get(['battleHonours'])!.value,
      battleScars: this.editForm.get(['battleScars'])!.value,
      armyUnit: this.editForm.get(['armyUnit'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INinthArmyUnitMoment>>): void {
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

  trackById(index: number, item: INinthArmyUnit): any {
    return item.id;
  }
}
