import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {INinthUnitMoment} from 'app/shared/model/ninth-unit-moment.model';

@Component({
  selector: 'jhi-ninth-unit-moment-detail',
  templateUrl: './ninth-unit-moment-detail.component.html',
})
export class NinthUnitMomentDetailComponent implements OnInit {
  ninthUnitMoment: INinthUnitMoment | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthUnitMoment }) => (this.ninthUnitMoment = ninthUnitMoment));
  }

  previousState(): void {
    window.history.back();
  }
}
