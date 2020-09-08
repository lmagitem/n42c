import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INinthMissionRule } from 'app/shared/model/ninth-mission-rule.model';

@Component({
  selector: 'jhi-ninth-mission-rule-detail',
  templateUrl: './ninth-mission-rule-detail.component.html',
})
export class NinthMissionRuleDetailComponent implements OnInit {
  ninthMissionRule: INinthMissionRule | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthMissionRule }) => (this.ninthMissionRule = ninthMissionRule));
  }

  previousState(): void {
    window.history.back();
  }
}
