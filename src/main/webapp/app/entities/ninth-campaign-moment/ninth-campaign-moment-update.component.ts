import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {DATE_TIME_FORMAT} from 'app/shared/constants/input.constants';
import {JhiDataUtils, JhiEventManager, JhiEventWithContent, JhiFileLoadError} from 'ng-jhipster';

import {INinthCampaignMoment, NinthCampaignMoment} from 'app/shared/model/ninth-campaign-moment.model';
import {NinthCampaignMomentService} from './ninth-campaign-moment.service';
import {AlertError} from 'app/shared/alert/alert-error.model';
import {INinthCampaign} from 'app/shared/model/ninth-campaign.model';
import {NinthCampaignService} from 'app/entities/ninth-campaign/ninth-campaign.service';

@Component({
  selector: 'jhi-ninth-campaign-moment-update',
  templateUrl: './ninth-campaign-moment-update.component.html',
})
export class NinthCampaignMomentUpdateComponent implements OnInit {
  isSaving = false;
  ninthcampaigns: INinthCampaign[] = [];

  editForm = this.fb.group({
    id: [],
    current: [null, [Validators.required]],
    sinceInstant: [null, [Validators.required]],
    name: [],
    summary: [],
    description: [],
    campaign: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected ninthCampaignMomentService: NinthCampaignMomentService,
    protected ninthCampaignService: NinthCampaignService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthCampaignMoment }) => {
      if (!ninthCampaignMoment.id) {
        const today = moment().startOf('day');
        ninthCampaignMoment.sinceInstant = today;
      }

      this.updateForm(ninthCampaignMoment);

      this.ninthCampaignService.query().subscribe((res: HttpResponse<INinthCampaign[]>) => (this.ninthcampaigns = res.body || []));
    });
  }

  updateForm(ninthCampaignMoment: INinthCampaignMoment): void {
    this.editForm.patchValue({
      id: ninthCampaignMoment.id,
      current: ninthCampaignMoment.current,
      sinceInstant: ninthCampaignMoment.sinceInstant ? ninthCampaignMoment.sinceInstant.format(DATE_TIME_FORMAT) : null,
      name: ninthCampaignMoment.name,
      summary: ninthCampaignMoment.summary,
      description: ninthCampaignMoment.description,
      campaign: ninthCampaignMoment.campaign,
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
    const ninthCampaignMoment = this.createFromForm();
    if (ninthCampaignMoment.id !== undefined) {
      this.subscribeToSaveResponse(this.ninthCampaignMomentService.update(ninthCampaignMoment));
    } else {
      this.subscribeToSaveResponse(this.ninthCampaignMomentService.create(ninthCampaignMoment));
    }
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
      campaign: this.editForm.get(['campaign'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INinthCampaignMoment>>): void {
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

  trackById(index: number, item: INinthCampaign): any {
    return item.id;
  }
}
