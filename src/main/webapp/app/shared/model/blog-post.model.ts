import { Moment } from 'moment';
import { IBlogCategory } from 'app/shared/model/blog-category.model';
import { IAppUser } from 'app/shared/model/app-user.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface IBlogPost {
  id?: number;
  published?: Moment;
  excerpt?: string;
  content?: string;
  language?: Language;
  blogCategories?: IBlogCategory[];
  author?: IAppUser;
}

export class BlogPost implements IBlogPost {
  constructor(
    public id?: number,
    public published?: Moment,
    public excerpt?: string,
    public content?: string,
    public language?: Language,
    public blogCategories?: IBlogCategory[],
    public author?: IAppUser
  ) {}
}
