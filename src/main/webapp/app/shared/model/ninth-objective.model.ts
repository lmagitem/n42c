import { ILocalizedNinthObjective } from 'app/shared/model/localized-ninth-objective.model';
import { INinthArmyMoment } from 'app/shared/model/ninth-army-moment.model';
import { INinthMission } from 'app/shared/model/ninth-mission.model';
import { NinthObjectiveType } from 'app/shared/model/enumerations/ninth-objective-type.model';

export interface INinthObjective {
  id?: number;
  shareable?: boolean;
  type?: NinthObjectiveType;
  localizations?: ILocalizedNinthObjective[];
  selections?: INinthArmyMoment[];
  allowedAsPrimaries?: INinthMission[];
  allowedAsSecondaries?: INinthMission[];
}

export class NinthObjective implements INinthObjective {
  constructor(
    public id?: number,
    public shareable?: boolean,
    public type?: NinthObjectiveType,
    public localizations?: ILocalizedNinthObjective[],
    public selections?: INinthArmyMoment[],
    public allowedAsPrimaries?: INinthMission[],
    public allowedAsSecondaries?: INinthMission[]
  ) {
    this.shareable = this.shareable || false;
  }
}
