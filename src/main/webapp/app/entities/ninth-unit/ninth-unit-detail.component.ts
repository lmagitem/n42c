import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {INinthUnit} from 'app/shared/model/ninth-unit.model';

@Component({
  selector: 'jhi-ninth-unit-detail',
  templateUrl: './ninth-unit-detail.component.html',
})
export class NinthUnitDetailComponent implements OnInit {
  ninthUnit: INinthUnit | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ninthUnit}) => (this.ninthUnit = ninthUnit));
  }

  previousState(): void {
    window.history.back();
  }
}
