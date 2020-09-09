import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { INinthMission, NinthMission } from 'app/shared/model/ninth-mission.model';
import { NinthMissionService } from './ninth-mission.service';
import { INinthStratagemGroup } from 'app/shared/model/ninth-stratagem-group.model';
import { NinthStratagemGroupService } from 'app/entities/ninth-stratagem-group/ninth-stratagem-group.service';
import { INinthObjective } from 'app/shared/model/ninth-objective.model';
import { NinthObjectiveService } from 'app/entities/ninth-objective/ninth-objective.service';
import { INinthMissionRule } from 'app/shared/model/ninth-mission-rule.model';
import { NinthMissionRuleService } from 'app/entities/ninth-mission-rule/ninth-mission-rule.service';

type SelectableEntity = INinthStratagemGroup | INinthObjective | INinthMissionRule;

@Component({
  selector: 'jhi-ninth-mission-update',
  templateUrl: './ninth-mission-update.component.html',
})
export class NinthMissionUpdateComponent implements OnInit {
  isSaving = false;
  ninthstratagemgroups: INinthStratagemGroup[] = [];
  ninthobjectives: INinthObjective[] = [];
  ninthmissionrules: INinthMissionRule[] = [];

  editForm = this.fb.group({
    id: [],
    gameType: [],
    gameSize: [],
    shareable: [],
    missionStratagems: [],
    primaryObjectives: [],
    allowedSecondaries: [],
    rules: [],
  });

  constructor(
    protected ninthMissionService: NinthMissionService,
    protected ninthStratagemGroupService: NinthStratagemGroupService,
    protected ninthObjectiveService: NinthObjectiveService,
    protected ninthMissionRuleService: NinthMissionRuleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthMission }) => {
      this.updateForm(ninthMission);

      this.ninthStratagemGroupService
        .query()
        .subscribe((res: HttpResponse<INinthStratagemGroup[]>) => (this.ninthstratagemgroups = res.body || []));

      this.ninthObjectiveService.query().subscribe((res: HttpResponse<INinthObjective[]>) => (this.ninthobjectives = res.body || []));

      this.ninthMissionRuleService.query().subscribe((res: HttpResponse<INinthMissionRule[]>) => (this.ninthmissionrules = res.body || []));
    });
  }

  updateForm(ninthMission: INinthMission): void {
    this.editForm.patchValue({
      id: ninthMission.id,
      gameType: ninthMission.gameType,
      gameSize: ninthMission.gameSize,
      shareable: ninthMission.shareable,
      missionStratagems: ninthMission.missionStratagems,
      primaryObjectives: ninthMission.primaryObjectives,
      allowedSecondaries: ninthMission.allowedSecondaries,
      rules: ninthMission.rules,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ninthMission = this.createFromForm();
    if (ninthMission.id !== undefined) {
      this.subscribeToSaveResponse(this.ninthMissionService.update(ninthMission));
    } else {
      this.subscribeToSaveResponse(this.ninthMissionService.create(ninthMission));
    }
  }

  private createFromForm(): INinthMission {
    return {
      ...new NinthMission(),
      id: this.editForm.get(['id'])!.value,
      gameType: this.editForm.get(['gameType'])!.value,
      gameSize: this.editForm.get(['gameSize'])!.value,
      shareable: this.editForm.get(['shareable'])!.value,
      missionStratagems: this.editForm.get(['missionStratagems'])!.value,
      primaryObjectives: this.editForm.get(['primaryObjectives'])!.value,
      allowedSecondaries: this.editForm.get(['allowedSecondaries'])!.value,
      rules: this.editForm.get(['rules'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INinthMission>>): void {
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

  getSelected(selectedVals: SelectableEntity[], option: SelectableEntity): SelectableEntity {
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
