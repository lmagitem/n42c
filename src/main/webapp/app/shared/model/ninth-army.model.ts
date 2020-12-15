import {INinthArmyUnit} from 'app/shared/model/ninth-army-unit.model';
import {INinthArmyMoment} from 'app/shared/model/ninth-army-moment.model';
import {IPlayer} from 'app/shared/model/player.model';
import {Faction} from 'app/shared/model/enumerations/faction.model';
import {SubFaction} from 'app/shared/model/enumerations/sub-faction.model';

export interface INinthArmy {
  id?: number;
  name?: string;
  crusade?: boolean;
  faction?: Faction;
  subfaction?: SubFaction;
  units?: INinthArmyUnit[];
  moments?: INinthArmyMoment[];
  author?: IPlayer;
}

export class NinthArmy implements INinthArmy {
  constructor(
    public id?: number,
    public name?: string,
    public crusade?: boolean,
    public faction?: Faction,
    public subfaction?: SubFaction,
    public units?: INinthArmyUnit[],
    public moments?: INinthArmyMoment[],
    public author?: IPlayer
  ) {
    this.crusade = this.crusade || false;
  }
}
