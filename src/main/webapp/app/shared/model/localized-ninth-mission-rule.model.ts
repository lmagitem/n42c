import {INinthMissionRule} from 'app/shared/model/ninth-mission-rule.model';
import {Language} from 'app/shared/model/enumerations/language.model';

export interface ILocalizedNinthMissionRule {
  id?: number;
  name?: string;
  description?: any;
  language?: Language;
  rule?: INinthMissionRule;
}

export class LocalizedNinthMissionRule implements ILocalizedNinthMissionRule {
  constructor(
    public id?: number,
    public name?: string,
    public description?: any,
    public language?: Language,
    public rule?: INinthMissionRule
  ) {
  }
}
