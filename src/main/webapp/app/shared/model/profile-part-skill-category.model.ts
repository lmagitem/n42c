import { IProfilePartSkill } from 'app/shared/model/profile-part-skill.model';
import { IProfilePart } from 'app/shared/model/profile-part.model';

export interface IProfilePartSkillCategory {
  id?: number;
  name?: string;
  index?: number;
  profilePartSkills?: IProfilePartSkill[];
  skillCategories?: IProfilePart;
}

export class ProfilePartSkillCategory implements IProfilePartSkillCategory {
  constructor(
    public id?: number,
    public name?: string,
    public index?: number,
    public profilePartSkills?: IProfilePartSkill[],
    public skillCategories?: IProfilePart
  ) {}
}
