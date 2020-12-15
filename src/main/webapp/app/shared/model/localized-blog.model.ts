import {IBlog} from 'app/shared/model/blog.model';
import {Language} from 'app/shared/model/enumerations/language.model';

export interface ILocalizedBlog {
  id?: number;
  name?: string;
  language?: Language;
  blog?: IBlog;
}

export class LocalizedBlog implements ILocalizedBlog {
  constructor(public id?: number, public name?: string, public language?: Language, public blog?: IBlog) {
  }
}
