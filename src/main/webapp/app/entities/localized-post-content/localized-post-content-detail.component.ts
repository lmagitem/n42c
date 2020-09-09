import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocalizedPostContent } from 'app/shared/model/localized-post-content.model';

@Component({
  selector: 'jhi-localized-post-content-detail',
  templateUrl: './localized-post-content-detail.component.html',
})
export class LocalizedPostContentDetailComponent implements OnInit {
  localizedPostContent: ILocalizedPostContent | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedPostContent }) => (this.localizedPostContent = localizedPostContent));
  }

  previousState(): void {
    window.history.back();
  }
}
