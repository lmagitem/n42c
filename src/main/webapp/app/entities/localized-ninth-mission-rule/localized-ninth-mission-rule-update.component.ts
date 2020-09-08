import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILocalizedNinthMissionRule, LocalizedNinthMissionRule } from 'app/shared/model/localized-ninth-mission-rule.model';
import { LocalizedNinthMissionRuleService } from './localized-ninth-mission-rule.service';
import { INinthMissionRule } from 'app/shared/model/ninth-mission-rule.model';
import { NinthMissionRuleService } from 'app/entities/ninth-mission-rule/ninth-mission-rule.service';

@Component({
  selector: 'jhi-localized-ninth-mission-rule-update',
  templateUrl: './localized-ninth-mission-rule-update.component.html',
})
export class LocalizedNinthMissionRuleUpdateComponent implements OnInit {
  isSaving = false;
  ninthmissionrules: INinthMissionRule[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    rule: [],
  });

  constructor(
    protected localizedNinthMissionRuleService: LocalizedNinthMissionRuleService,
    protected ninthMissionRuleService: NinthMissionRuleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedNinthMissionRule }) => {
      this.updateForm(localizedNinthMissionRule);

      this.ninthMissionRuleService.query().subscribe((res: HttpResponse<INinthMissionRule[]>) => (this.ninthmissionrules = res.body || []));
    });
  }

  updateForm(localizedNinthMissionRule: ILocalizedNinthMissionRule): void {
    this.editForm.patchValue({
      id: localizedNinthMissionRule.id,
      name: localizedNinthMissionRule.name,
      description: localizedNinthMissionRule.description,
      rule: localizedNinthMissionRule.rule,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const localizedNinthMissionRule = this.createFromForm();
    if (localizedNinthMissionRule.id !== undefined) {
      this.subscribeToSaveResponse(this.localizedNinthMissionRuleService.update(localizedNinthMissionRule));
    } else {
      this.subscribeToSaveResponse(this.localizedNinthMissionRuleService.create(localizedNinthMissionRule));
    }
  }

  private createFromForm(): ILocalizedNinthMissionRule {
    return {
      ...new LocalizedNinthMissionRule(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      rule: this.editForm.get(['rule'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocalizedNinthMissionRule>>): void {
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

  trackById(index: number, item: INinthMissionRule): any {
    return item.id;
  }
}
