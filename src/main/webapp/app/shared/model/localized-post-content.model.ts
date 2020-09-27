import {IBlogPost} from 'app/shared/model/blog-post.model';
import {Language} from 'app/shared/model/enumerations/language.model';

export interface ILocalizedPostContent {
  id?: number;
  excerpt?: string;
  content?: string;
  language?: Language;
  post?: IBlogPost;
}

export class LocalizedPostContent implements ILocalizedPostContent {
  constructor(public id?: number, public excerpt?: string, public content?: string, public language?: Language, public post?: IBlogPost) {}
}
