import {ILocalizedNinthDeploymentMap} from 'app/shared/model/localized-ninth-deployment-map.model';
import {INinthMission} from 'app/shared/model/ninth-mission.model';

export interface INinthDeploymentMap {
  id?: number;
  url?: string;
  shareable?: boolean;
  localizations?: ILocalizedNinthDeploymentMap[];
  usedInMissions?: INinthMission[];
}

export class NinthDeploymentMap implements INinthDeploymentMap {
  constructor(
    public id?: number,
    public url?: string,
    public shareable?: boolean,
    public localizations?: ILocalizedNinthDeploymentMap[],
    public usedInMissions?: INinthMission[]
  ) {
    this.shareable = this.shareable || false;
  }
}
