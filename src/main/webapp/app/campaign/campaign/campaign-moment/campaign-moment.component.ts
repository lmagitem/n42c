import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NinthCampaignMomentService } from 'app/entities/ninth-campaign-moment/ninth-campaign-moment.service';
import { NinthCampaignService } from 'app/entities/ninth-campaign/ninth-campaign.service';
import { NinthStratagemGroupService } from 'app/entities/ninth-stratagem-group/ninth-stratagem-group.service';
import { PlayerService } from 'app/entities/player/player.service';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { NinthGameSize } from 'app/shared/model/enumerations/ninth-game-size.model';
import { NinthGameType } from 'app/shared/model/enumerations/ninth-game-type.model';
import { LocalizedNinthMission } from 'app/shared/model/localized-ninth-mission.model';
import { NinthArmyMoment } from 'app/shared/model/ninth-army-moment.model';
import { NinthArmy } from 'app/shared/model/ninth-army.model';
import { NinthBattle } from 'app/shared/model/ninth-battle.model';
import { INinthCampaignMoment, NinthCampaignMoment } from 'app/shared/model/ninth-campaign-moment.model';
import { NinthMission } from 'app/shared/model/ninth-mission.model';
import { ImperialDateConverter } from 'app/shared/util/imperial-date-converter';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CampaignService } from '../campaign.service';

@Component({
  selector: 'jhi-campaign-moment',
  templateUrl: './campaign-moment.component.html',
  styleUrls: ['./campaign-moment.component.scss'],
})
export class CampaignMomentComponent implements OnInit {
  isEditing = false;
  isSaving = false;

  battles = [
    new NinthBattle(
      1,
      'Waterloo',
      [
        new NinthArmyMoment(
          1,
          false,
          moment(new Date()),
          2,
          1,
          5,
          6,
          8,
          7,
          4,
          2,
          [],
          'Ceci est une note',
          [],
          [],
          undefined,
          new NinthArmy(1, 'Le nom de mon armée')
        ),
        new NinthArmyMoment(
          2,
          false,
          moment(new Date()),
          7,
          4,
          2,
          2,
          1,
          5,
          6,
          8,
          [],
          'Ceci est une note',
          [],
          [],
          undefined,
          new NinthArmy(2, "Le nom de l'autre armée")
        ),
      ],
      undefined,
      new NinthMission(
        1,
        NinthGameType.CR,
        NinthGameSize.CP,
        false,
        [],
        [new LocalizedNinthMission(1, 'La mission jouée', 'Il faut faire ça', undefined)]
      )
    ),
    new NinthBattle(
      2,
      'Austerlitz',
      [
        new NinthArmyMoment(
          3,
          false,
          moment(new Date()),
          2,
          1,
          5,
          6,
          8,
          7,
          4,
          2,
          [],
          'Ceci est une note',
          [],
          [],
          undefined,
          new NinthArmy(1, 'Le nom de mon armée')
        ),
        new NinthArmyMoment(
          4,
          false,
          moment(new Date()),
          7,
          4,
          2,
          2,
          1,
          5,
          6,
          8,
          [],
          'Ceci est une note',
          [],
          [],
          undefined,
          new NinthArmy(2, "Le nom de l'autre armée")
        ),
      ],
      undefined,
      new NinthMission(
        1,
        NinthGameType.CR,
        NinthGameSize.CP,
        false,
        [],
        [new LocalizedNinthMission(1, 'La mission jouée', 'Il faut faire ça', undefined)]
      )
    ),
  ];

  editForm = this.fb.group({
    id: [],
    current: [null, [Validators.required]],
    sinceInstant: [null, [Validators.required]],
    name: [],
    summary: [],
    description: [],
    battles: [],
    campaign: [],
  });

  constructor(
    protected ninthCampaignService: NinthCampaignService,
    protected ninthCampaignMomentService: NinthCampaignMomentService,
    protected playerService: PlayerService,
    protected ninthStratagemGroupService: NinthStratagemGroupService,
    protected activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private campaignService: CampaignService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Get the current moment and everything that it needs
    this.campaignService.selectedCampaignMoment$.subscribe(ninthCampaignMoment => {
      if (ninthCampaignMoment !== null) {
        this.updateForm(ninthCampaignMoment);
      }
    });

    // Update the editing status
    this.campaignService.currentlyEditingCampaignMoment$.subscribe(status => (this.isEditing = status));
  }

  private createFromForm(): INinthCampaignMoment {
    return {
      ...new NinthCampaignMoment(),
      id: this.editForm.get(['id'])!.value,
      current: this.editForm.get(['current'])!.value,
      sinceInstant: this.editForm.get(['sinceInstant'])!.value
        ? moment(this.editForm.get(['sinceInstant'])!.value, DATE_TIME_FORMAT)
        : undefined,
      name: this.editForm.get(['name'])!.value,
      summary: this.editForm.get(['summary'])!.value,
      description: this.editForm.get(['description'])!.value,
      battles: this.editForm.get(['battles'])!.value,
      campaign: this.editForm.get(['campaign'])!.value,
    };
  }

  updateForm(ninthCampaignMoment: INinthCampaignMoment = new NinthCampaignMoment()): void {
    this.editForm.patchValue({
      id: ninthCampaignMoment.id,
      current: ninthCampaignMoment.current,
      sinceInstant: ninthCampaignMoment.sinceInstant ? ninthCampaignMoment.sinceInstant.format(DATE_TIME_FORMAT) : null,
      name: ninthCampaignMoment.name,
      summary: ninthCampaignMoment.summary,
      description: ninthCampaignMoment.description,
      battles: ninthCampaignMoment.battles,
      campaign: ninthCampaignMoment.campaign,
    });
  }

  cancel(): void {
    this.switchEditingStatus();
  }

  save(): void {
    this.isSaving = true;
    const ninthMoment = this.createFromForm();
    if (ninthMoment.id !== undefined) {
      this.subscribeToSaveResponse(this.ninthCampaignMomentService.update(ninthMoment));
    } else {
      this.subscribeToSaveResponse(this.ninthCampaignMomentService.create(ninthMoment));
    }
  }

  getMomentName(): string {
    let name = this.editForm.get('name')?.value;
    if (name === undefined || name === null || name === '') {
      this.translate
        .get('n42cApp.ninthCampaignMoment.new')
        .pipe(first())
        .subscribe(s => (name = s));
    }
    return this.convertToImperial(this.editForm.get(['sinceInstant'])!.value, this.editForm.get('check')?.value) + ' - ' + name;
  }

  convertToImperial(instant: any, check?: number): string {
    return ImperialDateConverter.convertToImperial(moment(instant, DATE_TIME_FORMAT).toDate(), check);
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.switchEditingStatus();
  }

  protected onSaveError(): void {
    this.isSaving = false;
    this.switchEditingStatus();
  }

  private switchEditingStatus(): void {
    this.campaignService.setCampaignMomentEditingStatus(!this.isEditing);
  }
}
