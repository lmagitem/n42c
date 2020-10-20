import {INinthBattle} from 'app/shared/model/ninth-battle.model';
import {ILocalizedNinthMission} from 'app/shared/model/localized-ninth-mission.model';
import {INinthStratagemGroup} from 'app/shared/model/ninth-stratagem-group.model';
import {INinthObjective} from 'app/shared/model/ninth-objective.model';
import {INinthMissionRule} from 'app/shared/model/ninth-mission-rule.model';
import {INinthDeploymentMap} from 'app/shared/model/ninth-deployment-map.model';
import {NinthGameType} from 'app/shared/model/enumerations/ninth-game-type.model';
import {NinthGameSize} from 'app/shared/model/enumerations/ninth-game-size.model';

export interface INinthMission {
  id?: number;
  gameType?: NinthGameType;
  gameSize?: NinthGameSize;
  shareable?: boolean;
  battles?: INinthBattle[];
  localizations?: ILocalizedNinthMission[];
  missionStratagems?: INinthStratagemGroup[];
  primaryObjectives?: INinthObjective[];
  allowedSecondaries?: INinthObjective[];
  rules?: INinthMissionRule[];
  missionDeployments?: INinthDeploymentMap[];
}

export class NinthMission implements INinthMission {
  constructor(
    public id?: number,
    public gameType?: NinthGameType,
    public gameSize?: NinthGameSize,
    public shareable?: boolean,
    public battles?: INinthBattle[],
    public localizations?: ILocalizedNinthMission[],
    public missionStratagems?: INinthStratagemGroup[],
    public primaryObjectives?: INinthObjective[],
    public allowedSecondaries?: INinthObjective[],
    public rules?: INinthMissionRule[],
    public missionDeployments?: INinthDeploymentMap[]
  ) {
    this.shareable = this.shareable || false;
  }
}
