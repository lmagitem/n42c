import {ILocalizedBlogCategory} from 'app/shared/model/localized-blog-category.model';
import {IBlogPost} from 'app/shared/model/blog-post.model';

export interface IBlogCategory {
  id?: number;
  name?: string;
  subcategories?: IBlogCategory[];
  localizations?: ILocalizedBlogCategory[];
  parentCategory?: IBlogCategory;
  posts?: IBlogPost[];
}

export class BlogCategory implements IBlogCategory {
  constructor(
    public id?: number,
    public name?: string,
    public subcategories?: IBlogCategory[],
    public localizations?: ILocalizedBlogCategory[],
    public parentCategory?: IBlogCategory,
    public posts?: IBlogPost[]
  ) {
  }
}
