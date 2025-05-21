import { CastMoney } from 'src/infra/decorators/castMoney';

export class ProductsOutputDto {
  product_id: number;
  @CastMoney()
  value: string;
}
