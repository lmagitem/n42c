import {Moment} from 'moment';
import {INinthBattle} from 'app/shared/model/ninth-battle.model';
import {INinthCampaign} from 'app/shared/model/ninth-campaign.model';

export interface INinthCampaignMoment {
  id?: number;
  current?: boolean;
  sinceInstant?: Moment;
  name?: string;
  summary?: string;
  description?: string;
  battles?: INinthBattle[];
  campaign?: INinthCampaign;
}

export class NinthCampaignMoment implements INinthCampaignMoment {
  constructor(
    public id?: number,
    public current?: boolean,
    public sinceInstant?: Moment,
    public name?: string,
    public summary?: string,
    public description?: string,
    public battles?: INinthBattle[],
    public campaign?: INinthCampaign
  ) {
    this.current = this.current || false;
  }
}
