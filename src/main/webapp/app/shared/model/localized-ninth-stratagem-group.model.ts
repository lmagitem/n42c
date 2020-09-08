import { INinthStratagemGroup } from 'app/shared/model/ninth-stratagem-group.model';

export interface ILocalizedNinthStratagemGroup {
  id?: number;
  name?: string;
  stratagemGroup?: INinthStratagemGroup;
}

export class LocalizedNinthStratagemGroup implements ILocalizedNinthStratagemGroup {
  constructor(public id?: number, public name?: string, public stratagemGroup?: INinthStratagemGroup) {}
}
