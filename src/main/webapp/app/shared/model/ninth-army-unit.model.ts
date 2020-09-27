import {INinthArmyUnitMoment} from 'app/shared/model/ninth-army-unit-moment.model';
import {INinthArmy} from 'app/shared/model/ninth-army.model';
import {INinthUnit} from 'app/shared/model/ninth-unit.model';
import {INinthArmyMoment} from 'app/shared/model/ninth-army-moment.model';

export interface INinthArmyUnit {
  id?: number;
  selectableKeywords?: string;
  moments?: INinthArmyUnitMoment[];
  army?: INinthArmy;
  unit?: INinthUnit;
  selections?: INinthArmyMoment[];
}

export class NinthArmyUnit implements INinthArmyUnit {
  constructor(
    public id?: number,
    public selectableKeywords?: string,
    public moments?: INinthArmyUnitMoment[],
    public army?: INinthArmy,
    public unit?: INinthUnit,
    public selections?: INinthArmyMoment[]
  ) {}
}
