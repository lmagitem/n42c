import {INinthArmyUnit} from 'app/shared/model/ninth-army-unit.model';
import {INinthUnitMoment} from 'app/shared/model/ninth-unit-moment.model';
import {IPlayer} from 'app/shared/model/player.model';
import {Faction} from 'app/shared/model/enumerations/faction.model';
import {SubFaction} from 'app/shared/model/enumerations/sub-faction.model';
import {NinthBattlefieldRole} from 'app/shared/model/enumerations/ninth-battlefield-role.model';

export interface INinthUnit {
  id?: number;
  name?: string;
  datasheet?: string;
  faction?: Faction;
  subfaction?: SubFaction;
  battlefieldRole?: NinthBattlefieldRole;
  keywords?: string;
  selections?: INinthArmyUnit[];
  moments?: INinthUnitMoment[];
  owner?: IPlayer;
}

export class NinthUnit implements INinthUnit {
  constructor(
    public id?: number,
    public name?: string,
    public datasheet?: string,
    public faction?: Faction,
    public subfaction?: SubFaction,
    public battlefieldRole?: NinthBattlefieldRole,
    public keywords?: string,
    public selections?: INinthArmyUnit[],
    public moments?: INinthUnitMoment[],
    public owner?: IPlayer
  ) {
  }
}
