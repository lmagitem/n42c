import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INinthStratagemGroup } from 'app/shared/model/ninth-stratagem-group.model';

@Component({
  selector: 'jhi-ninth-stratagem-group-detail',
  templateUrl: './ninth-stratagem-group-detail.component.html',
})
export class NinthStratagemGroupDetailComponent implements OnInit {
  ninthStratagemGroup: INinthStratagemGroup | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthStratagemGroup }) => (this.ninthStratagemGroup = ninthStratagemGroup));
  }

  previousState(): void {
    window.history.back();
  }
}
