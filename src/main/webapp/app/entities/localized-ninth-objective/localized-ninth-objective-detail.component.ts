import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocalizedNinthObjective } from 'app/shared/model/localized-ninth-objective.model';

@Component({
  selector: 'jhi-localized-ninth-objective-detail',
  templateUrl: './localized-ninth-objective-detail.component.html',
})
export class LocalizedNinthObjectiveDetailComponent implements OnInit {
  localizedNinthObjective: ILocalizedNinthObjective | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedNinthObjective }) => (this.localizedNinthObjective = localizedNinthObjective));
  }

  previousState(): void {
    window.history.back();
  }
}
