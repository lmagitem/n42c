import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {INinthArmyUnit} from 'app/shared/model/ninth-army-unit.model';

@Component({
  selector: 'jhi-ninth-army-unit-detail',
  templateUrl: './ninth-army-unit-detail.component.html',
})
export class NinthArmyUnitDetailComponent implements OnInit {
  ninthArmyUnit: INinthArmyUnit | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthArmyUnit }) => (this.ninthArmyUnit = ninthArmyUnit));
  }

  previousState(): void {
    window.history.back();
  }
}
