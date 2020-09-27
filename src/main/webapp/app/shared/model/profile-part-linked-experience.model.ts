import {Moment} from 'moment';
import {IProfilePartPreciseItem} from 'app/shared/model/profile-part-precise-item.model';
import {IProfilePartSkill} from 'app/shared/model/profile-part-skill.model';

export interface IProfilePartLinkedExperience {
  id?: number;
  title?: string;
  subTitle?: string;
  date?: Moment;
  content?: string;
  linkedItem?: IProfilePartPreciseItem;
  linkedExperiences?: IProfilePartSkill[];
}

export class ProfilePartLinkedExperience implements IProfilePartLinkedExperience {
  constructor(
    public id?: number,
    public title?: string,
    public subTitle?: string,
    public date?: Moment,
    public content?: string,
    public linkedItem?: IProfilePartPreciseItem,
    public linkedExperiences?: IProfilePartSkill[]
  ) {}
}
