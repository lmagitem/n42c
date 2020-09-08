import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INinthArmyUnitMoment } from 'app/shared/model/ninth-army-unit-moment.model';

@Component({
  selector: 'jhi-ninth-army-unit-moment-detail',
  templateUrl: './ninth-army-unit-moment-detail.component.html',
})
export class NinthArmyUnitMomentDetailComponent implements OnInit {
  ninthArmyUnitMoment: INinthArmyUnitMoment | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthArmyUnitMoment }) => (this.ninthArmyUnitMoment = ninthArmyUnitMoment));
  }

  previousState(): void {
    window.history.back();
  }
}
