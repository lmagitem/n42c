import {ILocalizedNinthStratagem} from 'app/shared/model/localized-ninth-stratagem.model';
import {INinthStratagemGroup} from 'app/shared/model/ninth-stratagem-group.model';
import {Faction} from 'app/shared/model/enumerations/faction.model';
import {SubFaction} from 'app/shared/model/enumerations/sub-faction.model';
import {NinthGameTurn} from 'app/shared/model/enumerations/ninth-game-turn.model';
import {NinthGamePhase} from 'app/shared/model/enumerations/ninth-game-phase.model';

export interface INinthStratagem {
  id?: number;
  cost?: number;
  faction?: Faction;
  subfaction?: SubFaction;
  turn?: NinthGameTurn;
  phase?: NinthGamePhase;
  localizations?: ILocalizedNinthStratagem[];
  group?: INinthStratagemGroup;
}

export class NinthStratagem implements INinthStratagem {
  constructor(
    public id?: number,
    public cost?: number,
    public faction?: Faction,
    public subfaction?: SubFaction,
    public turn?: NinthGameTurn,
    public phase?: NinthGamePhase,
    public localizations?: ILocalizedNinthStratagem[],
    public group?: INinthStratagemGroup
  ) {
  }
}
