import { ILocalizedNinthStratagemGroup } from 'app/shared/model/localized-ninth-stratagem-group.model';
import { INinthStratagem } from 'app/shared/model/ninth-stratagem.model';
import { IPlayer } from 'app/shared/model/player.model';
import { INinthCampaign } from 'app/shared/model/ninth-campaign.model';
import { INinthMission } from 'app/shared/model/ninth-mission.model';

export interface INinthStratagemGroup {
  id?: number;
  shareable?: boolean;
  localizations?: ILocalizedNinthStratagemGroup[];
  stratagems?: INinthStratagem[];
  author?: IPlayer;
  campaigns?: INinthCampaign[];
  missions?: INinthMission[];
}

export class NinthStratagemGroup implements INinthStratagemGroup {
  constructor(
    public id?: number,
    public shareable?: boolean,
    public localizations?: ILocalizedNinthStratagemGroup[],
    public stratagems?: INinthStratagem[],
    public author?: IPlayer,
    public campaigns?: INinthCampaign[],
    public missions?: INinthMission[]
  ) {
    this.shareable = this.shareable || false;
  }
}
