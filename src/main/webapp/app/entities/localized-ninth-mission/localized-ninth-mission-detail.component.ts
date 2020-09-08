import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocalizedNinthMission } from 'app/shared/model/localized-ninth-mission.model';

@Component({
  selector: 'jhi-localized-ninth-mission-detail',
  templateUrl: './localized-ninth-mission-detail.component.html',
})
export class LocalizedNinthMissionDetailComponent implements OnInit {
  localizedNinthMission: ILocalizedNinthMission | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedNinthMission }) => (this.localizedNinthMission = localizedNinthMission));
  }

  previousState(): void {
    window.history.back();
  }
}
