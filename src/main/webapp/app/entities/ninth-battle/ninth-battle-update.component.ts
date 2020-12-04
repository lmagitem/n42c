import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import {INinthBattle, NinthBattle} from 'app/shared/model/ninth-battle.model';
import {NinthBattleService} from './ninth-battle.service';
import {INinthCampaignMoment} from 'app/shared/model/ninth-campaign-moment.model';
import {NinthCampaignMomentService} from 'app/entities/ninth-campaign-moment/ninth-campaign-moment.service';
import {INinthMission} from 'app/shared/model/ninth-mission.model';
import {NinthMissionService} from 'app/entities/ninth-mission/ninth-mission.service';

type SelectableEntity = INinthCampaignMoment | INinthMission;

@Component({
  selector: 'jhi-ninth-battle-update',
  templateUrl: './ninth-battle-update.component.html',
})
export class NinthBattleUpdateComponent implements OnInit {
  isSaving = false;
  ninthcampaignmoments: INinthCampaignMoment[] = [];
  ninthmissions: INinthMission[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    resolved: [null, [Validators.required]],
    campaignMoment: [],
    mission: [],
  });

  constructor(
    protected ninthBattleService: NinthBattleService,
    protected ninthCampaignMomentService: NinthCampaignMomentService,
    protected ninthMissionService: NinthMissionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ninthBattle}) => {
      this.updateForm(ninthBattle);

      this.ninthCampaignMomentService
        .query()
        .subscribe((res: HttpResponse<INinthCampaignMoment[]>) => (this.ninthcampaignmoments = res.body || []));

      this.ninthMissionService.query().subscribe((res: HttpResponse<INinthMission[]>) => (this.ninthmissions = res.body || []));
    });
  }

  updateForm(ninthBattle: INinthBattle): void {
    this.editForm.patchValue({
      id: ninthBattle.id,
      name: ninthBattle.name,
      resolved: ninthBattle.resolved,
      campaignMoment: ninthBattle.campaignMoment,
      mission: ninthBattle.mission,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ninthBattle = this.createFromForm();
    if (ninthBattle.id !== undefined) {
      this.subscribeToSaveResponse(this.ninthBattleService.update(ninthBattle));
    } else {
      this.subscribeToSaveResponse(this.ninthBattleService.create(ninthBattle));
    }
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INinthBattle>>): void {
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

  private createFromForm(): INinthBattle {
    return {
      ...new NinthBattle(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      resolved: this.editForm.get(['resolved'])!.value,
      campaignMoment: this.editForm.get(['campaignMoment'])!.value,
      mission: this.editForm.get(['mission'])!.value,
    };
  }
}
