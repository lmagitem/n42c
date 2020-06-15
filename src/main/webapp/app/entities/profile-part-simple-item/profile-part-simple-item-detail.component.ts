import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfilePartSimpleItem } from 'app/shared/model/profile-part-simple-item.model';

@Component({
  selector: 'jhi-profile-part-simple-item-detail',
  templateUrl: './profile-part-simple-item-detail.component.html',
})
export class ProfilePartSimpleItemDetailComponent implements OnInit {
  profilePartSimpleItem: IProfilePartSimpleItem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profilePartSimpleItem }) => (this.profilePartSimpleItem = profilePartSimpleItem));
  }

  previousState(): void {
    window.history.back();
  }
}
