import { INinthMissionRule } from 'app/shared/model/ninth-mission-rule.model';

export interface ILocalizedNinthMissionRule {
  id?: number;
  name?: string;
  description?: any;
  rule?: INinthMissionRule;
}

export class LocalizedNinthMissionRule implements ILocalizedNinthMissionRule {
  constructor(public id?: number, public name?: string, public description?: any, public rule?: INinthMissionRule) {}
}
