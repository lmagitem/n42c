import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IBlogPost} from 'app/shared/model/blog-post.model';
import {IBlog} from 'app/shared/model/blog.model';
import {ArrayUtils} from 'app/shared/util/arrays-utils';
import {IItemWithLocalizations, LocalizationUtils} from 'app/shared/util/localization-utils';
import {JhiLanguageService} from 'ng-jhipster';

@Component({
  selector: 'jhi-blog-post-detail',
  templateUrl: './blog-post.component.html',
})
export class BlogPostComponent implements OnInit {
  blogPost: IBlogPost | null = null;
  locale: string;

  constructor(protected activatedRoute: ActivatedRoute, protected languageService: JhiLanguageService) {
    this.locale = this.languageService.getCurrentLanguage();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({blogPost}) => (this.blogPost = blogPost));
    /* eslint-disable no-console */
    console.log(this.blogPost);
    /* eslint-enable no-console */
  }

  previousState(): void {
    window.history.back();
  }

  arrayToString(array: any, field: string): string {
    return ArrayUtils.toStringUsingField(array, field);
  }

  getLocalizedField(item: IBlogPost | IBlog | null | undefined, field: string, alternateField?: string): string {
    return LocalizationUtils.getLocalizedField(
      item as IItemWithLocalizations,
      field,
      alternateField,
      this.languageService.getCurrentLanguage()
    );
  }
}
