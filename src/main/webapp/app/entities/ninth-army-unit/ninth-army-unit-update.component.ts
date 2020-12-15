import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import {INinthArmyUnit, NinthArmyUnit} from 'app/shared/model/ninth-army-unit.model';
import {NinthArmyUnitService} from './ninth-army-unit.service';
import {INinthArmy} from 'app/shared/model/ninth-army.model';
import {NinthArmyService} from 'app/entities/ninth-army/ninth-army.service';
import {INinthUnit} from 'app/shared/model/ninth-unit.model';
import {NinthUnitService} from 'app/entities/ninth-unit/ninth-unit.service';

type SelectableEntity = INinthArmy | INinthUnit;

@Component({
  selector: 'jhi-ninth-army-unit-update',
  templateUrl: './ninth-army-unit-update.component.html',
})
export class NinthArmyUnitUpdateComponent implements OnInit {
  isSaving = false;
  nintharmies: INinthArmy[] = [];
  ninthunits: INinthUnit[] = [];

  editForm = this.fb.group({
    id: [],
    selectableKeywords: [],
    army: [],
    unit: [],
  });

  constructor(
    protected ninthArmyUnitService: NinthArmyUnitService,
    protected ninthArmyService: NinthArmyService,
    protected ninthUnitService: NinthUnitService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthArmyUnit }) => {
      this.updateForm(ninthArmyUnit);

      this.ninthArmyService.query().subscribe((res: HttpResponse<INinthArmy[]>) => (this.nintharmies = res.body || []));

      this.ninthUnitService.query().subscribe((res: HttpResponse<INinthUnit[]>) => (this.ninthunits = res.body || []));
    });
  }

  updateForm(ninthArmyUnit: INinthArmyUnit): void {
    this.editForm.patchValue({
      id: ninthArmyUnit.id,
      selectableKeywords: ninthArmyUnit.selectableKeywords,
      army: ninthArmyUnit.army,
      unit: ninthArmyUnit.unit,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ninthArmyUnit = this.createFromForm();
    if (ninthArmyUnit.id !== undefined) {
      this.subscribeToSaveResponse(this.ninthArmyUnitService.update(ninthArmyUnit));
    } else {
      this.subscribeToSaveResponse(this.ninthArmyUnitService.create(ninthArmyUnit));
    }
  }

  private createFromForm(): INinthArmyUnit {
    return {
      ...new NinthArmyUnit(),
      id: this.editForm.get(['id'])!.value,
      selectableKeywords: this.editForm.get(['selectableKeywords'])!.value,
      army: this.editForm.get(['army'])!.value,
      unit: this.editForm.get(['unit'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INinthArmyUnit>>): void {
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
}
