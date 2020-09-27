import {INinthObjective} from 'app/shared/model/ninth-objective.model';

export interface ILocalizedNinthObjective {
  id?: number;
  name?: string;
  description?: string;
  objective?: INinthObjective;
}

export class LocalizedNinthObjective implements ILocalizedNinthObjective {
  constructor(public id?: number, public name?: string, public description?: string, public objective?: INinthObjective) {}
}
