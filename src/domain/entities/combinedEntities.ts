import { Order } from './order';

export interface CombinedEntities {
  user_id: number;
  name: string;
  orders: Order[];
}
