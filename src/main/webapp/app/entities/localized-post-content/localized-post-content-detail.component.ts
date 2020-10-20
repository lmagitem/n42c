import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ILocalizedPostContent } from 'app/shared/model/localized-post-content.model';

@Component({
  selector: 'jhi-localized-post-content-detail',
  templateUrl: './localized-post-content-detail.component.html',
})
export class LocalizedPostContentDetailComponent implements OnInit {
  localizedPostContent: ILocalizedPostContent | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedPostContent }) => (this.localizedPostContent = localizedPostContent));
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
