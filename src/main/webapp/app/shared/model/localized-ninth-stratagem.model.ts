import { INinthStratagem } from 'app/shared/model/ninth-stratagem.model';

export interface ILocalizedNinthStratagem {
  id?: number;
  name?: string;
  summary?: string;
  description?: any;
  keywords?: any;
  stratagem?: INinthStratagem;
}

export class LocalizedNinthStratagem implements ILocalizedNinthStratagem {
  constructor(
    public id?: number,
    public name?: string,
    public summary?: string,
    public description?: any,
    public keywords?: any,
    public stratagem?: INinthStratagem
  ) {}
}
