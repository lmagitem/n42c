import {IProfilePartLinkedExperience} from 'app/shared/model/profile-part-linked-experience.model';
import {IProfilePartSkillCategory} from 'app/shared/model/profile-part-skill-category.model';
import {LevelOfMastery} from 'app/shared/model/enumerations/level-of-mastery.model';

export interface IProfilePartSkill {
  id?: number;
  name?: string;
  index?: number;
  level?: LevelOfMastery;
  linkedSkills?: IProfilePartLinkedExperience[];
  skillCategory?: IProfilePartSkillCategory;
}

export class ProfilePartSkill implements IProfilePartSkill {
  constructor(
    public id?: number,
    public name?: string,
    public index?: number,
    public level?: LevelOfMastery,
    public linkedSkills?: IProfilePartLinkedExperience[],
    public skillCategory?: IProfilePartSkillCategory
  ) {}
}
