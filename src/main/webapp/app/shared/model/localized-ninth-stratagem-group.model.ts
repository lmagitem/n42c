import { INinthStratagemGroup } from 'app/shared/model/ninth-stratagem-group.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface ILocalizedNinthStratagemGroup {
  id?: number;
  name?: string;
  language?: Language;
  stratagemGroup?: INinthStratagemGroup;
}

export class LocalizedNinthStratagemGroup implements ILocalizedNinthStratagemGroup {
  constructor(public id?: number, public name?: string, public language?: Language, public stratagemGroup?: INinthStratagemGroup) {}
}
