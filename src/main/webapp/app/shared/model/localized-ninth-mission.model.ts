import { INinthMission } from 'app/shared/model/ninth-mission.model';

export interface ILocalizedNinthMission {
  id?: number;
  name?: string;
  briefing?: string;
  mission?: INinthMission;
}

export class LocalizedNinthMission implements ILocalizedNinthMission {
  constructor(public id?: number, public name?: string, public briefing?: string, public mission?: INinthMission) {}
}
