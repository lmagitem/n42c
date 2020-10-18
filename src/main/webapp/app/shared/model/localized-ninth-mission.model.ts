import { INinthMission } from 'app/shared/model/ninth-mission.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface ILocalizedNinthMission {
  id?: number;
  name?: string;
  briefing?: any;
  language?: Language;
  mission?: INinthMission;
}

export class LocalizedNinthMission implements ILocalizedNinthMission {
  constructor(
    public id?: number,
    public name?: string,
    public briefing?: any,
    public language?: Language,
    public mission?: INinthMission
  ) {}
}
