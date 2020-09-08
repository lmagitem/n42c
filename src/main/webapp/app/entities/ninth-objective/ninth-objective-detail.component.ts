import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INinthObjective } from 'app/shared/model/ninth-objective.model';

@Component({
  selector: 'jhi-ninth-objective-detail',
  templateUrl: './ninth-objective-detail.component.html',
})
export class NinthObjectiveDetailComponent implements OnInit {
  ninthObjective: INinthObjective | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthObjective }) => (this.ninthObjective = ninthObjective));
  }

  previousState(): void {
    window.history.back();
  }
}
