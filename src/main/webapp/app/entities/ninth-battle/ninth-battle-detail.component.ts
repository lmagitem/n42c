import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INinthBattle } from 'app/shared/model/ninth-battle.model';

@Component({
  selector: 'jhi-ninth-battle-detail',
  templateUrl: './ninth-battle-detail.component.html',
})
export class NinthBattleDetailComponent implements OnInit {
  ninthBattle: INinthBattle | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthBattle }) => (this.ninthBattle = ninthBattle));
  }

  previousState(): void {
    window.history.back();
  }
}
