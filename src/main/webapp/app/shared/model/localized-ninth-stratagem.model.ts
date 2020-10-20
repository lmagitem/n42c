import { INinthStratagem } from 'app/shared/model/ninth-stratagem.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface ILocalizedNinthStratagem {
  id?: number;
  name?: string;
  summary?: string;
  description?: any;
  keywords?: any;
  language?: Language;
  stratagem?: INinthStratagem;
}

export class LocalizedNinthStratagem implements ILocalizedNinthStratagem {
  constructor(
    public id?: number,
    public name?: string,
    public summary?: string,
    public description?: any,
    public keywords?: any,
    public language?: Language,
    public stratagem?: INinthStratagem
  ) {}
}
