import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocalizedBlogCategory } from 'app/shared/model/localized-blog-category.model';

@Component({
  selector: 'jhi-localized-blog-category-detail',
  templateUrl: './localized-blog-category-detail.component.html',
})
export class LocalizedBlogCategoryDetailComponent implements OnInit {
  localizedBlogCategory: ILocalizedBlogCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedBlogCategory }) => (this.localizedBlogCategory = localizedBlogCategory));
  }

  previousState(): void {
    window.history.back();
  }
}
