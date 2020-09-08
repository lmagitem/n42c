import { Moment } from 'moment';
import { ILocalizedPostContent } from 'app/shared/model/localized-post-content.model';
import { IAppUser } from 'app/shared/model/app-user.model';
import { IBlogCategory } from 'app/shared/model/blog-category.model';
import { IBlog } from 'app/shared/model/blog.model';

export interface IBlogPost {
  id?: number;
  published?: Moment;
  modified?: Moment;
  localizations?: ILocalizedPostContent[];
  authors?: IAppUser[];
  categories?: IBlogCategory[];
  blog?: IBlog;
}

export class BlogPost implements IBlogPost {
  constructor(
    public id?: number,
    public published?: Moment,
    public modified?: Moment,
    public localizations?: ILocalizedPostContent[],
    public authors?: IAppUser[],
    public categories?: IBlogCategory[],
    public blog?: IBlog
  ) {}
}
