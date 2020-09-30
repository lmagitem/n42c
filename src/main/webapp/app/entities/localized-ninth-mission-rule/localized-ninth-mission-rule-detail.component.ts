import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ILocalizedNinthMissionRule } from 'app/shared/model/localized-ninth-mission-rule.model';

@Component({
  selector: 'jhi-localized-ninth-mission-rule-detail',
  templateUrl: './localized-ninth-mission-rule-detail.component.html',
})
export class LocalizedNinthMissionRuleDetailComponent implements OnInit {
  localizedNinthMissionRule: ILocalizedNinthMissionRule | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedNinthMissionRule }) => (this.localizedNinthMissionRule = localizedNinthMissionRule));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
