import { Moment } from 'moment';
import { INinthUnit } from 'app/shared/model/ninth-unit.model';

export interface INinthUnitMoment {
  id?: number;
  current?: boolean;
  sinceInstant?: Moment;
  pictureUrl?: string;
  unit?: INinthUnit;
}

export class NinthUnitMoment implements INinthUnitMoment {
  constructor(
    public id?: number,
    public current?: boolean,
    public sinceInstant?: Moment,
    public pictureUrl?: string,
    public unit?: INinthUnit
  ) {
    this.current = this.current || false;
  }
}
