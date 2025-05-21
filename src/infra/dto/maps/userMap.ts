import { OrderMap } from './orderMap';

export class UserMap {
  public name: string;
  public orders: Map<number, OrderMap>;
}
