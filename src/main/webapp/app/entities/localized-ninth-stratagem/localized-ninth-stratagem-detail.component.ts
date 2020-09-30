import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ILocalizedNinthStratagem } from 'app/shared/model/localized-ninth-stratagem.model';

@Component({
  selector: 'jhi-localized-ninth-stratagem-detail',
  templateUrl: './localized-ninth-stratagem-detail.component.html',
})
export class LocalizedNinthStratagemDetailComponent implements OnInit {
  localizedNinthStratagem: ILocalizedNinthStratagem | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedNinthStratagem }) => (this.localizedNinthStratagem = localizedNinthStratagem));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
