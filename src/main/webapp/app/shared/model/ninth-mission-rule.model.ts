import { ILocalizedNinthMissionRule } from 'app/shared/model/localized-ninth-mission-rule.model';
import { INinthMission } from 'app/shared/model/ninth-mission.model';

export interface INinthMissionRule {
  id?: number;
  localizations?: ILocalizedNinthMissionRule[];
  missions?: INinthMission[];
}

export class NinthMissionRule implements INinthMissionRule {
  constructor(public id?: number, public localizations?: ILocalizedNinthMissionRule[], public missions?: INinthMission[]) {}
}
