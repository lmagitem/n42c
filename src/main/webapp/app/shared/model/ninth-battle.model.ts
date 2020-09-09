import { INinthArmyMoment } from 'app/shared/model/ninth-army-moment.model';
import { INinthCampaignMoment } from 'app/shared/model/ninth-campaign-moment.model';
import { INinthMission } from 'app/shared/model/ninth-mission.model';

export interface INinthBattle {
  id?: number;
  name?: string;
  armies?: INinthArmyMoment[];
  campaignMoment?: INinthCampaignMoment;
  mission?: INinthMission;
}

export class NinthBattle implements INinthBattle {
  constructor(
    public id?: number,
    public name?: string,
    public armies?: INinthArmyMoment[],
    public campaignMoment?: INinthCampaignMoment,
    public mission?: INinthMission
  ) {}
}
