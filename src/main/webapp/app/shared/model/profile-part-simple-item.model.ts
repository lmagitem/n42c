import {Moment} from 'moment';
import {IProfilePart} from 'app/shared/model/profile-part.model';

export interface IProfilePartSimpleItem {
  id?: number;
  title?: string;
  subTitle?: string;
  date?: Moment;
  content?: string;
  profilePart?: IProfilePart;
}

export class ProfilePartSimpleItem implements IProfilePartSimpleItem {
  constructor(
    public id?: number,
    public title?: string,
    public subTitle?: string,
    public date?: Moment,
    public content?: string,
    public profilePart?: IProfilePart
  ) {
  }
}
