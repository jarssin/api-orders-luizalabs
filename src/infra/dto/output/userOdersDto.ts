import { Type } from 'class-transformer';
import { OrdersOutputDto } from './ordersDto';

export class UserOrderOutputDto {
  user_id: number;
  name: string;
  @Type(() => OrdersOutputDto)
  orders: OrdersOutputDto[];
}
