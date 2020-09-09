import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocalizedNinthStratagemGroup } from 'app/shared/model/localized-ninth-stratagem-group.model';

@Component({
  selector: 'jhi-localized-ninth-stratagem-group-detail',
  templateUrl: './localized-ninth-stratagem-group-detail.component.html',
})
export class LocalizedNinthStratagemGroupDetailComponent implements OnInit {
  localizedNinthStratagemGroup: ILocalizedNinthStratagemGroup | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      ({ localizedNinthStratagemGroup }) => (this.localizedNinthStratagemGroup = localizedNinthStratagemGroup)
    );
  }

  previousState(): void {
    window.history.back();
  }
}
