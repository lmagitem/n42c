import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INinthMission } from 'app/shared/model/ninth-mission.model';

@Component({
  selector: 'jhi-ninth-mission-detail',
  templateUrl: './ninth-mission-detail.component.html',
})
export class NinthMissionDetailComponent implements OnInit {
  ninthMission: INinthMission | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthMission }) => (this.ninthMission = ninthMission));
  }

  previousState(): void {
    window.history.back();
  }
}
