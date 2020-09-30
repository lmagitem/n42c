import { Moment } from 'moment';
import { INinthArmyUnit } from 'app/shared/model/ninth-army-unit.model';
import { INinthObjective } from 'app/shared/model/ninth-objective.model';
import { INinthBattle } from 'app/shared/model/ninth-battle.model';
import { INinthArmy } from 'app/shared/model/ninth-army.model';

export interface INinthArmyMoment {
  id?: number;
  current?: boolean;
  sinceInstant?: Moment;
  majorVictories?: number;
  minorVictories?: number;
  draws?: number;
  minorDefeats?: number;
  majorDefeats?: number;
  requisition?: number;
  supplyLimit?: number;
  supplyUsed?: number;
  objectives?: any;
  notes?: any;
  selectedUnits?: INinthArmyUnit[];
  selectedObjectives?: INinthObjective[];
  battle?: INinthBattle;
  army?: INinthArmy;
}

export class NinthArmyMoment implements INinthArmyMoment {
  constructor(
    public id?: number,
    public current?: boolean,
    public sinceInstant?: Moment,
    public majorVictories?: number,
    public minorVictories?: number,
    public draws?: number,
    public minorDefeats?: number,
    public majorDefeats?: number,
    public requisition?: number,
    public supplyLimit?: number,
    public supplyUsed?: number,
    public objectives?: any,
    public notes?: any,
    public selectedUnits?: INinthArmyUnit[],
    public selectedObjectives?: INinthObjective[],
    public battle?: INinthBattle,
    public army?: INinthArmy
  ) {
    this.current = this.current || false;
  }
}
