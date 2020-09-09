import { IProfilePartSkill } from 'app/shared/model/profile-part-skill.model';
import { IProfilePart } from 'app/shared/model/profile-part.model';

export interface IProfilePartSkillCategory {
  id?: number;
  name?: string;
  index?: number;
  skills?: IProfilePartSkill[];
  profilePart?: IProfilePart;
}

export class ProfilePartSkillCategory implements IProfilePartSkillCategory {
  constructor(
    public id?: number,
    public name?: string,
    public index?: number,
    public skills?: IProfilePartSkill[],
    public profilePart?: IProfilePart
  ) {}
}
