import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JhiDataUtils} from 'ng-jhipster';

import {ILocalizedBlogPost} from 'app/shared/model/localized-blog-post.model';

@Component({
  selector: 'jhi-localized-blog-post-detail',
  templateUrl: './localized-blog-post-detail.component.html',
})
export class LocalizedBlogPostDetailComponent implements OnInit {
  localizedBlogPost: ILocalizedBlogPost | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedBlogPost }) => (this.localizedBlogPost = localizedBlogPost));
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
