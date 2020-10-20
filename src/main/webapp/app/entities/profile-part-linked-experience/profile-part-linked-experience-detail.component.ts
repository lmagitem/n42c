import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IProfilePartLinkedExperience } from 'app/shared/model/profile-part-linked-experience.model';

@Component({
  selector: 'jhi-profile-part-linked-experience-detail',
  templateUrl: './profile-part-linked-experience-detail.component.html',
})
export class ProfilePartLinkedExperienceDetailComponent implements OnInit {
  profilePartLinkedExperience: IProfilePartLinkedExperience | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      ({ profilePartLinkedExperience }) => (this.profilePartLinkedExperience = profilePartLinkedExperience)
    );
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
