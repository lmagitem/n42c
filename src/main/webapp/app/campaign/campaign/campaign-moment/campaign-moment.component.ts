import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NinthCampaignMomentService } from 'app/entities/ninth-campaign-moment/ninth-campaign-moment.service';
import { NinthCampaignService } from 'app/entities/ninth-campaign/ninth-campaign.service';
import { NinthStratagemGroupService } from 'app/entities/ninth-stratagem-group/ninth-stratagem-group.service';
import { PlayerService } from 'app/entities/player/player.service';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { INinthCampaignMoment, NinthCampaignMoment } from 'app/shared/model/ninth-campaign-moment.model';
import { NinthCampaign } from 'app/shared/model/ninth-campaign.model';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'jhi-campaign-moment',
  templateUrl: './campaign-moment.component.html',
  styleUrls: ['./campaign-moment.component.scss'],
})
export class CampaignMomentComponent implements OnInit {
  isEditing = false;
  isSaving = false;

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
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthCampaignMoment }) => {
      this.updateForm(ninthCampaignMoment);
    });
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
    const date = this.editForm.get('sinceInstant')?.value || '????';
    return date + ' - ' + name;
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

  private switchEditingStatus(): void {}
}
