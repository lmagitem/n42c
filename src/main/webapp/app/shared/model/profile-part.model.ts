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
  profilePartSimpleItems?: IProfilePartSimpleItem[];
  profilePartPreciseItems?: IProfilePartPreciseItem[];
  profilePartSkillCategories?: IProfilePartSkillCategory[];
  categories?: IAppUserProfile;
}

export class ProfilePart implements IProfilePart {
  constructor(
    public id?: number,
    public title?: string,
    public type?: ProfilePartType,
    public index?: number,
    public order?: ProfilePartOrderType,
    public profilePartSimpleItems?: IProfilePartSimpleItem[],
    public profilePartPreciseItems?: IProfilePartPreciseItem[],
    public profilePartSkillCategories?: IProfilePartSkillCategory[],
    public categories?: IAppUserProfile
  ) {}
}
