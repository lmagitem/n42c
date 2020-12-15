import {Moment} from 'moment';
import {INinthBattle} from 'app/shared/model/ninth-battle.model';
import {INinthCampaign} from 'app/shared/model/ninth-campaign.model';

export interface INinthCampaignMoment {
  id?: number;
  current?: boolean;
  sinceInstant?: Moment;
  name?: string;
  summary?: any;
  description?: any;
  battles?: INinthBattle[];
  campaign?: INinthCampaign;
}

export class NinthCampaignMoment implements INinthCampaignMoment {
  constructor(
    public id?: number,
    public current?: boolean,
    public sinceInstant?: Moment,
    public name?: string,
    public summary?: any,
    public description?: any,
    public battles?: INinthBattle[],
    public campaign?: INinthCampaign
  ) {
    this.current = this.current || false;
  }
}
