import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {DATE_TIME_FORMAT} from 'app/shared/constants/input.constants';

import {INinthUnitMoment, NinthUnitMoment} from 'app/shared/model/ninth-unit-moment.model';
import {NinthUnitMomentService} from './ninth-unit-moment.service';
import {INinthUnit} from 'app/shared/model/ninth-unit.model';
import {NinthUnitService} from 'app/entities/ninth-unit/ninth-unit.service';

@Component({
  selector: 'jhi-ninth-unit-moment-update',
  templateUrl: './ninth-unit-moment-update.component.html',
})
export class NinthUnitMomentUpdateComponent implements OnInit {
  isSaving = false;
  ninthunits: INinthUnit[] = [];

  editForm = this.fb.group({
    id: [],
    current: [null, [Validators.required]],
    sinceInstant: [null, [Validators.required]],
    pictureUrl: [],
    unit: [],
  });

  constructor(
    protected ninthUnitMomentService: NinthUnitMomentService,
    protected ninthUnitService: NinthUnitService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthUnitMoment }) => {
      if (!ninthUnitMoment.id) {
        const today = moment().startOf('day');
        ninthUnitMoment.sinceInstant = today;
      }

      this.updateForm(ninthUnitMoment);

      this.ninthUnitService.query().subscribe((res: HttpResponse<INinthUnit[]>) => (this.ninthunits = res.body || []));
    });
  }

  updateForm(ninthUnitMoment: INinthUnitMoment): void {
    this.editForm.patchValue({
      id: ninthUnitMoment.id,
      current: ninthUnitMoment.current,
      sinceInstant: ninthUnitMoment.sinceInstant ? ninthUnitMoment.sinceInstant.format(DATE_TIME_FORMAT) : null,
      pictureUrl: ninthUnitMoment.pictureUrl,
      unit: ninthUnitMoment.unit,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ninthUnitMoment = this.createFromForm();
    if (ninthUnitMoment.id !== undefined) {
      this.subscribeToSaveResponse(this.ninthUnitMomentService.update(ninthUnitMoment));
    } else {
      this.subscribeToSaveResponse(this.ninthUnitMomentService.create(ninthUnitMoment));
    }
  }

  private createFromForm(): INinthUnitMoment {
    return {
      ...new NinthUnitMoment(),
      id: this.editForm.get(['id'])!.value,
      current: this.editForm.get(['current'])!.value,
      sinceInstant: this.editForm.get(['sinceInstant'])!.value
        ? moment(this.editForm.get(['sinceInstant'])!.value, DATE_TIME_FORMAT)
        : undefined,
      pictureUrl: this.editForm.get(['pictureUrl'])!.value,
      unit: this.editForm.get(['unit'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INinthUnitMoment>>): void {
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

  trackById(index: number, item: INinthUnit): any {
    return item.id;
  }
}
