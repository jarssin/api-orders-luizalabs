import { CastMoney } from 'src/infra/decorators/castMoney';
import { ProductsOutputDto } from './productsDto';
import { Type } from 'class-transformer';

export class OrdersOutputDto {
  order_id: number;
  @CastMoney()
  total: string;
  date: string;
  @Type(() => ProductsOutputDto)
  products: ProductsOutputDto[];
}
