import { IProduct } from 'app/shared/model/product.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface ILocalizedProduct {
  id?: number;
  excerpt?: string;
  pictureUrl?: string;
  content?: any;
  language?: Language;
  product?: IProduct;
}

export class LocalizedProduct implements ILocalizedProduct {
  constructor(
    public id?: number,
    public excerpt?: string,
    public pictureUrl?: string,
    public content?: any,
    public language?: Language,
    public product?: IProduct
  ) {}
}
