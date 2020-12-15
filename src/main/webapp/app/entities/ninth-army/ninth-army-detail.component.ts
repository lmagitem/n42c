import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {INinthArmy} from 'app/shared/model/ninth-army.model';

@Component({
  selector: 'jhi-ninth-army-detail',
  templateUrl: './ninth-army-detail.component.html',
})
export class NinthArmyDetailComponent implements OnInit {
  ninthArmy: INinthArmy | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ninthArmy}) => (this.ninthArmy = ninthArmy));
  }

  previousState(): void {
    window.history.back();
  }
}
