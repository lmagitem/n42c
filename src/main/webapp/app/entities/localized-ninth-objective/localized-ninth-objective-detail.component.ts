import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ILocalizedNinthObjective } from 'app/shared/model/localized-ninth-objective.model';

@Component({
  selector: 'jhi-localized-ninth-objective-detail',
  templateUrl: './localized-ninth-objective-detail.component.html',
})
export class LocalizedNinthObjectiveDetailComponent implements OnInit {
  localizedNinthObjective: ILocalizedNinthObjective | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedNinthObjective }) => (this.localizedNinthObjective = localizedNinthObjective));
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
