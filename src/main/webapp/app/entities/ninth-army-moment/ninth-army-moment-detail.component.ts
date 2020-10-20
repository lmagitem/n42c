import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { INinthArmyMoment } from 'app/shared/model/ninth-army-moment.model';

@Component({
  selector: 'jhi-ninth-army-moment-detail',
  templateUrl: './ninth-army-moment-detail.component.html',
})
export class NinthArmyMomentDetailComponent implements OnInit {
  ninthArmyMoment: INinthArmyMoment | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthArmyMoment }) => (this.ninthArmyMoment = ninthArmyMoment));
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
