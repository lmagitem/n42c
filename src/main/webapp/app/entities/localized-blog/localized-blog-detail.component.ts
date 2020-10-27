import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocalizedBlog } from 'app/shared/model/localized-blog.model';

@Component({
  selector: 'jhi-localized-blog-detail',
  templateUrl: './localized-blog-detail.component.html',
})
export class LocalizedBlogDetailComponent implements OnInit {
  localizedBlog: ILocalizedBlog | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedBlog }) => (this.localizedBlog = localizedBlog));
  }

  previousState(): void {
    window.history.back();
  }
}
