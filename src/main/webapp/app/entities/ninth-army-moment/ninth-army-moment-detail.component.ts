import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INinthArmyMoment } from 'app/shared/model/ninth-army-moment.model';

@Component({
  selector: 'jhi-ninth-army-moment-detail',
  templateUrl: './ninth-army-moment-detail.component.html',
})
export class NinthArmyMomentDetailComponent implements OnInit {
  ninthArmyMoment: INinthArmyMoment | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthArmyMoment }) => (this.ninthArmyMoment = ninthArmyMoment));
  }

  previousState(): void {
    window.history.back();
  }
}
