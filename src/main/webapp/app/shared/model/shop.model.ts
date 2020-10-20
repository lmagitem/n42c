import { IProduct } from 'app/shared/model/product.model';

export interface IShop {
  id?: number;
  name?: string;
  products?: IProduct[];
}

export class Shop implements IShop {
  constructor(public id?: number, public name?: string, public products?: IProduct[]) {}
}
