import { IBlogPost } from 'app/shared/model/blog-post.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface IBlogCategory {
  id?: number;
  name?: string;
  language?: Language;
  blogCategories?: IBlogCategory[];
  categories?: IBlogPost;
  subcategories?: IBlogCategory;
}

export class BlogCategory implements IBlogCategory {
  constructor(
    public id?: number,
    public name?: string,
    public language?: Language,
    public blogCategories?: IBlogCategory[],
    public categories?: IBlogPost,
    public subcategories?: IBlogCategory
  ) {}
}
