import { INinthObjective } from 'app/shared/model/ninth-objective.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface ILocalizedNinthObjective {
  id?: number;
  name?: string;
  description?: any;
  language?: Language;
  objective?: INinthObjective;
}

export class LocalizedNinthObjective implements ILocalizedNinthObjective {
  constructor(
    public id?: number,
    public name?: string,
    public description?: any,
    public language?: Language,
    public objective?: INinthObjective
  ) {}
}
