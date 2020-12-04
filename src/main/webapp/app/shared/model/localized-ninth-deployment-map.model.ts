import {INinthDeploymentMap} from 'app/shared/model/ninth-deployment-map.model';
import {Language} from 'app/shared/model/enumerations/language.model';

export interface ILocalizedNinthDeploymentMap {
  id?: number;
  name?: string;
  description?: any;
  language?: Language;
  deploymentMap?: INinthDeploymentMap;
}

export class LocalizedNinthDeploymentMap implements ILocalizedNinthDeploymentMap {
  constructor(
    public id?: number,
    public name?: string,
    public description?: any,
    public language?: Language,
    public deploymentMap?: INinthDeploymentMap
  ) {
  }
}
