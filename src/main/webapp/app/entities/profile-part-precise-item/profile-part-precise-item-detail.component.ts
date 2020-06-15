import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfilePartPreciseItem } from 'app/shared/model/profile-part-precise-item.model';

@Component({
  selector: 'jhi-profile-part-precise-item-detail',
  templateUrl: './profile-part-precise-item-detail.component.html',
})
export class ProfilePartPreciseItemDetailComponent implements OnInit {
  profilePartPreciseItem: IProfilePartPreciseItem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profilePartPreciseItem }) => (this.profilePartPreciseItem = profilePartPreciseItem));
  }

  previousState(): void {
    window.history.back();
  }
}
