import { IBlogPost } from 'app/shared/model/blog-post.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface ILocalizedPostContent {
  id?: number;
  title?: string;
  excerpt?: any;
  content?: any;
  language?: Language;
  post?: IBlogPost;
}

export class LocalizedPostContent implements ILocalizedPostContent {
  constructor(
    public id?: number,
    public title?: string,
    public excerpt?: any,
    public content?: any,
    public language?: Language,
    public post?: IBlogPost
  ) {}
}
