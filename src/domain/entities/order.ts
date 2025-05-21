import { Products } from './products';

export interface Order {
  order_id: number;
  total: number;
  date: string;
  products: Products[];
}
