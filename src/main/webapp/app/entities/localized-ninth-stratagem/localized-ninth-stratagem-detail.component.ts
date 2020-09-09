import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocalizedNinthStratagem } from 'app/shared/model/localized-ninth-stratagem.model';

@Component({
  selector: 'jhi-localized-ninth-stratagem-detail',
  templateUrl: './localized-ninth-stratagem-detail.component.html',
})
export class LocalizedNinthStratagemDetailComponent implements OnInit {
  localizedNinthStratagem: ILocalizedNinthStratagem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedNinthStratagem }) => (this.localizedNinthStratagem = localizedNinthStratagem));
  }

  previousState(): void {
    window.history.back();
  }
}
