import { IBlogPost } from 'app/shared/model/blog-post.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface ILocalizedPostContent {
  id?: number;
  excerpt?: any;
  content?: any;
  language?: Language;
  post?: IBlogPost;
}

export class LocalizedPostContent implements ILocalizedPostContent {
  constructor(public id?: number, public excerpt?: any, public content?: any, public language?: Language, public post?: IBlogPost) {}
}
