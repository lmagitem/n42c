import { IProfilePartSimpleItem } from 'app/shared/model/profile-part-simple-item.model';
import { IProfilePartPreciseItem } from 'app/shared/model/profile-part-precise-item.model';
import { IProfilePartSkillCategory } from 'app/shared/model/profile-part-skill-category.model';
import { IAppUserProfile } from 'app/shared/model/app-user-profile.model';
import { ProfilePartType } from 'app/shared/model/enumerations/profile-part-type.model';
import { ProfilePartOrderType } from 'app/shared/model/enumerations/profile-part-order-type.model';

export interface IProfilePart {
  id?: number;
  title?: string;
  type?: ProfilePartType;
  index?: number;
  order?: ProfilePartOrderType;
  simpleItems?: IProfilePartSimpleItem[];
  preciseItems?: IProfilePartPreciseItem[];
  skillCategories?: IProfilePartSkillCategory[];
  profile?: IAppUserProfile;
}

export class ProfilePart implements IProfilePart {
  constructor(
    public id?: number,
    public title?: string,
    public type?: ProfilePartType,
    public index?: number,
    public order?: ProfilePartOrderType,
    public simpleItems?: IProfilePartSimpleItem[],
    public preciseItems?: IProfilePartPreciseItem[],
    public skillCategories?: IProfilePartSkillCategory[],
    public profile?: IAppUserProfile
  ) {}
}
