import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocalizedNinthMissionRule } from 'app/shared/model/localized-ninth-mission-rule.model';

@Component({
  selector: 'jhi-localized-ninth-mission-rule-detail',
  templateUrl: './localized-ninth-mission-rule-detail.component.html',
})
export class LocalizedNinthMissionRuleDetailComponent implements OnInit {
  localizedNinthMissionRule: ILocalizedNinthMissionRule | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedNinthMissionRule }) => (this.localizedNinthMissionRule = localizedNinthMissionRule));
  }

  previousState(): void {
    window.history.back();
  }
}
