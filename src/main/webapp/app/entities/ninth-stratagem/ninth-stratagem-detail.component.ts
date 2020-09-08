import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INinthStratagem } from 'app/shared/model/ninth-stratagem.model';

@Component({
  selector: 'jhi-ninth-stratagem-detail',
  templateUrl: './ninth-stratagem-detail.component.html',
})
export class NinthStratagemDetailComponent implements OnInit {
  ninthStratagem: INinthStratagem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthStratagem }) => (this.ninthStratagem = ninthStratagem));
  }

  previousState(): void {
    window.history.back();
  }
}
