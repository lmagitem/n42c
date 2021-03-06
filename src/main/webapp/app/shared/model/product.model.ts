import {ILocalizedProduct} from 'app/shared/model/localized-product.model';
import {IAppUser} from 'app/shared/model/app-user.model';
import {IShop} from 'app/shared/model/shop.model';

export interface IProduct {
  id?: number;
  name?: string;
  localizations?: ILocalizedProduct[];
  authors?: IAppUser[];
  shop?: IShop;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public localizations?: ILocalizedProduct[],
    public authors?: IAppUser[],
    public shop?: IShop
  ) {
  }
}
