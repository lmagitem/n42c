import { IBlogPost } from 'app/shared/model/blog-post.model';
import { IAppUser } from 'app/shared/model/app-user.model';

export interface IBlog {
  id?: number;
  name?: string;
  posts?: IBlogPost[];
  author?: IAppUser;
}

export class Blog implements IBlog {
  constructor(public id?: number, public name?: string, public posts?: IBlogPost[], public author?: IAppUser) {}
}
