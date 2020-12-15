import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import {INinthMissionRule, NinthMissionRule} from 'app/shared/model/ninth-mission-rule.model';
import {NinthMissionRuleService} from './ninth-mission-rule.service';

@Component({
  selector: 'jhi-ninth-mission-rule-update',
  templateUrl: './ninth-mission-rule-update.component.html',
})
export class NinthMissionRuleUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(
    protected ninthMissionRuleService: NinthMissionRuleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthMissionRule }) => {
      this.updateForm(ninthMissionRule);
    });
  }

  updateForm(ninthMissionRule: INinthMissionRule): void {
    this.editForm.patchValue({
      id: ninthMissionRule.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ninthMissionRule = this.createFromForm();
    if (ninthMissionRule.id !== undefined) {
      this.subscribeToSaveResponse(this.ninthMissionRuleService.update(ninthMissionRule));
    } else {
      this.subscribeToSaveResponse(this.ninthMissionRuleService.create(ninthMissionRule));
    }
  }

  private createFromForm(): INinthMissionRule {
    return {
      ...new NinthMissionRule(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INinthMissionRule>>): void {
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
}
