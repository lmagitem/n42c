import { IBlogCategory } from 'app/shared/model/blog-category.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface ILocalizedBlogCategory {
  id?: number;
  name?: string;
  language?: Language;
  category?: IBlogCategory;
}

export class LocalizedBlogCategory implements ILocalizedBlogCategory {
  constructor(public id?: number, public name?: string, public language?: Language, public category?: IBlogCategory) {}
}
