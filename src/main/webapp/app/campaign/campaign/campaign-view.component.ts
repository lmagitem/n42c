import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { INinthCampaign, NinthCampaign } from 'app/shared/model/ninth-campaign.model';
import { IPlayer } from 'app/shared/model/player.model';
import { PlayerService } from 'app/entities/player/player.service';
import { INinthStratagemGroup } from 'app/shared/model/ninth-stratagem-group.model';
import { NinthStratagemGroupService } from 'app/entities/ninth-stratagem-group/ninth-stratagem-group.service';
import { NinthCampaignService } from 'app/entities/ninth-campaign/ninth-campaign.service';
import { NinthGameType } from 'app/shared/model/enumerations/ninth-game-type.model';
import { TranslationUtils } from 'app/shared/util/translation-utils';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { INinthCampaignMoment, NinthCampaignMoment } from 'app/shared/model/ninth-campaign-moment.model';
import { NinthCampaignMomentService } from 'app/entities/ninth-campaign-moment/ninth-campaign-moment.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';

type SelectableEntity = IPlayer | INinthStratagemGroup;

@Component({
  selector: 'jhi-ninth-campaign-update',
  templateUrl: './campaign-view.component.html',
})
export class CampaignViewComponent implements OnInit {
  isEditingCampaign = false;
  isEditingMoment = false;
  isSaving = false;
  players: IPlayer[] = [];
  ninthstratagemgroups: INinthStratagemGroup[] = [];
  ninthCampaignsMomentsIds?: number[];
  selectedNinthCampaignMomentId = -1;

  campaignEditForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    gameType: [null, [Validators.required]],
    usePowerRating: [null, [Validators.required]],
    authors: [],
    participants: [],
    campaignStratagems: [],
  });

  momentEditForm = this.fb.group({
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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthCampaign }) => {
      this.updateCampaignForm(ninthCampaign);

      this.playerService.query().subscribe((res: HttpResponse<IPlayer[]>) => (this.players = res.body || []));

      this.ninthStratagemGroupService
        .query()
        .subscribe((res: HttpResponse<INinthStratagemGroup[]>) => (this.ninthstratagemgroups = res.body || []));

      this.loadMoments(ninthCampaign.id, true);
    });
  }

  loadMoments(id: number, changeSelected = false): void {
    this.ninthCampaignService
      .queryMomentsIds(id)
      .pipe(first())
      .subscribe((res: HttpResponse<number[]>) => {
        this.ninthCampaignsMomentsIds = res.body || [-1];
        if (changeSelected) {
          this.selectedNinthCampaignMomentId = this.ninthCampaignsMomentsIds.length - 1;
        }
        if (this.ninthCampaignsMomentsIds.length > 0) {
          this.selectNewMoment(this.selectedNinthCampaignMomentId);
        }
      });
  }

  selectNewMoment(id: number): void {
    this.selectedNinthCampaignMomentId = id;
    if (this.selectedNinthCampaignMomentId === -1) {
      this.updateMomentForm({});
    } else {
      this.ninthCampaignMomentService.find(id).subscribe(resp => {
        this.updateMomentForm(resp.body || {});
      });
    }
  }

  updateCampaignForm(ninthCampaign: INinthCampaign): void {
    this.campaignEditForm.patchValue({
      id: ninthCampaign.id,
      name: ninthCampaign.name,
      gameType: ninthCampaign.gameType,
      usePowerRating: ninthCampaign.usePowerRating,
      authors: ninthCampaign.authors,
      participants: ninthCampaign.participants,
      campaignStratagems: ninthCampaign.campaignStratagems,
    });
  }

  updateMomentForm(ninthCampaignMoment: INinthCampaignMoment): void {
    this.momentEditForm.patchValue({
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

  getMomentName(): string {
    let name = this.momentEditForm.get('name')?.value;
    if (name === undefined || name === null || name === '') {
      this.translate
        .get('n42cApp.ninthCampaignMoment.new')
        .pipe(first())
        .subscribe(s => (name = s));
    }
    const date = this.momentEditForm.get('sinceInstant')?.value || '????';
    return date + ' - ' + name;
  }

  getGameTypeTranslationPath(type: NinthGameType | string): string {
    return TranslationUtils.getGameTypeTranslationPath(type);
  }

  previousState(): void {
    window.history.back();
  }

  cancel(isCampaign = true): void {
    if (isCampaign) {
      this.isEditingCampaign = false;
    } else {
      this.isEditingMoment = false;
    }
  }

  saveCampaign(): void {
    this.isSaving = true;
    const ninthCampaign = this.createFromCampaignForm();
    if (ninthCampaign.id !== undefined) {
      this.subscribeToSaveResponse(this.ninthCampaignService.update(ninthCampaign), true);
    } else {
      this.subscribeToSaveResponse(this.ninthCampaignService.create(ninthCampaign), true);
    }
  }

  saveMoment(): void {
    this.isSaving = true;
    const ninthMoment = this.createFromMomentForm();
    if (ninthMoment.id !== undefined) {
      this.subscribeToSaveResponse(this.ninthCampaignMomentService.update(ninthMoment), false);
    } else {
      this.subscribeToSaveResponse(this.ninthCampaignMomentService.create(ninthMoment), false);
    }
  }

  private createFromCampaignForm(): INinthCampaign {
    return {
      ...new NinthCampaign(),
      id: this.campaignEditForm.get(['id'])!.value,
      name: this.campaignEditForm.get(['name'])!.value,
      gameType: this.campaignEditForm.get(['gameType'])!.value,
      usePowerRating: this.campaignEditForm.get(['usePowerRating'])!.value,
      authors: this.campaignEditForm.get(['authors'])!.value,
      participants: this.campaignEditForm.get(['participants'])!.value,
      campaignStratagems: this.campaignEditForm.get(['campaignStratagems'])!.value,
    };
  }

  private createFromMomentForm(): INinthCampaignMoment {
    return {
      ...new NinthCampaignMoment(),
      id: this.momentEditForm.get(['id'])!.value,
      current: this.momentEditForm.get(['current'])!.value,
      sinceInstant: this.momentEditForm.get(['sinceInstant'])!.value
        ? moment(this.momentEditForm.get(['sinceInstant'])!.value, DATE_TIME_FORMAT)
        : undefined,
      name: this.momentEditForm.get(['name'])!.value,
      summary: this.momentEditForm.get(['summary'])!.value,
      description: this.momentEditForm.get(['description'])!.value,
      battles: this.momentEditForm.get(['battles'])!.value,
      campaign: this.momentEditForm.get(['campaign'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>, isCampaign: boolean): void {
    if (isCampaign) {
      result.subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    } else {
      result.subscribe(
        () => this.onSaveSuccess(result),
        () => this.onSaveError(false)
      );
    }
  }

  protected onSaveSuccess(result?: Observable<HttpResponse<INinthCampaignMoment>>): void {
    this.isSaving = false;
    if (result !== undefined) {
      result.pipe(first()).subscribe(resp => {
        const id = resp?.body?.id || -1;
        if (id !== this.selectedNinthCampaignMomentId) {
          this.selectNewMoment(id);
        }
      });
      this.isEditingMoment = false;
    } else {
      this.isEditingCampaign = false;
    }
  }

  protected onSaveError(isCampaign = true): void {
    this.isSaving = false;
    if (isCampaign) {
      this.isEditingCampaign = false;
    } else {
      this.isEditingMoment = false;
    }
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
