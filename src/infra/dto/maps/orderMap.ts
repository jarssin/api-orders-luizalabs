import { ProductMap } from './productMap';

export class OrderMap {
  public order_id: number;
  public date: string;
  public total: number;
  public products: ProductMap[];
}
