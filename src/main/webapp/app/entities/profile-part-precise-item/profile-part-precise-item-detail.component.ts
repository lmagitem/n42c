import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IProfilePartPreciseItem } from 'app/shared/model/profile-part-precise-item.model';

@Component({
  selector: 'jhi-profile-part-precise-item-detail',
  templateUrl: './profile-part-precise-item-detail.component.html',
})
export class ProfilePartPreciseItemDetailComponent implements OnInit {
  profilePartPreciseItem: IProfilePartPreciseItem | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profilePartPreciseItem }) => (this.profilePartPreciseItem = profilePartPreciseItem));
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
