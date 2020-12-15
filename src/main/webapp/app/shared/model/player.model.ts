import {IAppUser} from 'app/shared/model/app-user.model';
import {INinthArmy} from 'app/shared/model/ninth-army.model';
import {INinthUnit} from 'app/shared/model/ninth-unit.model';
import {INinthStratagemGroup} from 'app/shared/model/ninth-stratagem-group.model';
import {INinthCampaign} from 'app/shared/model/ninth-campaign.model';

export interface IPlayer {
  id?: number;
  name?: string;
  appUser?: IAppUser;
  lists?: INinthArmy[];
  collections?: INinthUnit[];
  stratagemGroups?: INinthStratagemGroup[];
  authoredCampaigns?: INinthCampaign[];
  campaigns?: INinthCampaign[];
}

export class Player implements IPlayer {
  constructor(
    public id?: number,
    public name?: string,
    public appUser?: IAppUser,
    public lists?: INinthArmy[],
    public collections?: INinthUnit[],
    public stratagemGroups?: INinthStratagemGroup[],
    public authoredCampaigns?: INinthCampaign[],
    public campaigns?: INinthCampaign[]
  ) {
  }
}
