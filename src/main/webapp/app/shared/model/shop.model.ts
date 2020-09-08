import { IProduct } from 'app/shared/model/product.model';

export interface IShop {
  id?: number;
  products?: IProduct[];
}

export class Shop implements IShop {
  constructor(public id?: number, public products?: IProduct[]) {}
}
