import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ILocalizedNinthMission } from 'app/shared/model/localized-ninth-mission.model';

@Component({
  selector: 'jhi-localized-ninth-mission-detail',
  templateUrl: './localized-ninth-mission-detail.component.html',
})
export class LocalizedNinthMissionDetailComponent implements OnInit {
  localizedNinthMission: ILocalizedNinthMission | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedNinthMission }) => (this.localizedNinthMission = localizedNinthMission));
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
