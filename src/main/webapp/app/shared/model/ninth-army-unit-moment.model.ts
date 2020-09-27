import {Moment} from 'moment';
import {INinthArmyUnit} from 'app/shared/model/ninth-army-unit.model';
import {NinthCrusadeRank} from 'app/shared/model/enumerations/ninth-crusade-rank.model';

export interface INinthArmyUnitMoment {
  id?: number;
  current?: boolean;
  sinceInstant?: Moment;
  pointsCost?: number;
  powerRating?: number;
  experiencePoints?: number;
  crusadePoints?: number;
  equipment?: string;
  psychicPowers?: string;
  warlordTraits?: string;
  relics?: string;
  otherUpgrades?: string;
  battlesPlayed?: number;
  battlesSurvived?: number;
  rangedKills?: number;
  meleeKills?: number;
  psychicKills?: number;
  crusadeRank?: NinthCrusadeRank;
  battleHonours?: string;
  battleScars?: string;
  armyUnit?: INinthArmyUnit;
}

export class NinthArmyUnitMoment implements INinthArmyUnitMoment {
  constructor(
    public id?: number,
    public current?: boolean,
    public sinceInstant?: Moment,
    public pointsCost?: number,
    public powerRating?: number,
    public experiencePoints?: number,
    public crusadePoints?: number,
    public equipment?: string,
    public psychicPowers?: string,
    public warlordTraits?: string,
    public relics?: string,
    public otherUpgrades?: string,
    public battlesPlayed?: number,
    public battlesSurvived?: number,
    public rangedKills?: number,
    public meleeKills?: number,
    public psychicKills?: number,
    public crusadeRank?: NinthCrusadeRank,
    public battleHonours?: string,
    public battleScars?: string,
    public armyUnit?: INinthArmyUnit
  ) {
    this.current = this.current || false;
  }
}
