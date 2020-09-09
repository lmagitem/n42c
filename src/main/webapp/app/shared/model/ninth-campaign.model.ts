import { INinthCampaignMoment } from 'app/shared/model/ninth-campaign-moment.model';
import { IPlayer } from 'app/shared/model/player.model';
import { INinthStratagemGroup } from 'app/shared/model/ninth-stratagem-group.model';
import { NinthGameType } from 'app/shared/model/enumerations/ninth-game-type.model';

export interface INinthCampaign {
  id?: number;
  gameType?: NinthGameType;
  usePowerRating?: boolean;
  events?: INinthCampaignMoment[];
  authors?: IPlayer[];
  participants?: IPlayer[];
  campaignStratagems?: INinthStratagemGroup[];
}

export class NinthCampaign implements INinthCampaign {
  constructor(
    public id?: number,
    public gameType?: NinthGameType,
    public usePowerRating?: boolean,
    public events?: INinthCampaignMoment[],
    public authors?: IPlayer[],
    public participants?: IPlayer[],
    public campaignStratagems?: INinthStratagemGroup[]
  ) {
    this.usePowerRating = this.usePowerRating || false;
  }
}
