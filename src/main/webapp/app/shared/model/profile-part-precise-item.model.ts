import { Moment } from 'moment';
import { IProfilePartLinkedExperience } from 'app/shared/model/profile-part-linked-experience.model';
import { IProfilePart } from 'app/shared/model/profile-part.model';

export interface IProfilePartPreciseItem {
  id?: number;
  title?: string;
  subTitle?: string;
  start?: Moment;
  end?: Moment;
  locationName?: string;
  locationLat?: number;
  locationLong?: number;
  content?: string;
  profilePartLinkedExperiences?: IProfilePartLinkedExperience[];
  preciseItems?: IProfilePart;
}

export class ProfilePartPreciseItem implements IProfilePartPreciseItem {
  constructor(
    public id?: number,
    public title?: string,
    public subTitle?: string,
    public start?: Moment,
    public end?: Moment,
    public locationName?: string,
    public locationLat?: number,
    public locationLong?: number,
    public content?: string,
    public profilePartLinkedExperiences?: IProfilePartLinkedExperience[],
    public preciseItems?: IProfilePart
  ) {}
}
