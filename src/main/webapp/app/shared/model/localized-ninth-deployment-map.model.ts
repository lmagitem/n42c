import { INinthDeploymentMap } from 'app/shared/model/ninth-deployment-map.model';

export interface ILocalizedNinthDeploymentMap {
  id?: number;
  name?: string;
  description?: any;
  deploymentMap?: INinthDeploymentMap;
}

export class LocalizedNinthDeploymentMap implements ILocalizedNinthDeploymentMap {
  constructor(public id?: number, public name?: string, public description?: any, public deploymentMap?: INinthDeploymentMap) {}
}
