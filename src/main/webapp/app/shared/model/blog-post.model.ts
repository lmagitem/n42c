import { Moment } from 'moment';
import { ILocalizedBlogPost } from 'app/shared/model/localized-blog-post.model';
import { IAppUser } from 'app/shared/model/app-user.model';
import { IBlogCategory } from 'app/shared/model/blog-category.model';
import { IBlog } from 'app/shared/model/blog.model';

export interface IBlogPost {
  id?: number;
  title?: string;
  published?: Moment;
  modified?: Moment;
  pictureUrl?: string;
  localizations?: ILocalizedBlogPost[];
  authors?: IAppUser[];
  categories?: IBlogCategory[];
  blog?: IBlog;
}

export class BlogPost implements IBlogPost {
  constructor(
    public id?: number,
    public title?: string,
    public published?: Moment,
    public modified?: Moment,
    public pictureUrl?: string,
    public localizations?: ILocalizedBlogPost[],
    public authors?: IAppUser[],
    public categories?: IBlogCategory[],
    public blog?: IBlog
  ) {}
}
