import {INinthDeploymentMap} from 'app/shared/model/ninth-deployment-map.model';

export interface ILocalizedNinthDeploymentMap {
  id?: number;
  name?: string;
  description?: string;
  deploymentMap?: INinthDeploymentMap;
}

export class LocalizedNinthDeploymentMap implements ILocalizedNinthDeploymentMap {
  constructor(public id?: number, public name?: string, public description?: string, public deploymentMap?: INinthDeploymentMap) {}
}
