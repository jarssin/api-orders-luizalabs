import { plainToInstance } from 'class-transformer';
import { ParseLineFileDto } from '../../../src/infra/dto/parseLineFileDto';

describe('ParseLineFileDto', () => {
  it('should parse a line with spaces between fields correctly', () => {
    const line =
      '0000000070                              Palmer Prosacco00000007530000000003     1009.5420210308';
    const parser = plainToInstance(
      ParseLineFileDto,
      new ParseLineFileDto().parse(line),
    );
    expect(parser.user_id).toBe(70);
    expect(parser.name).toBe('Palmer Prosacco');
    expect(parser.order_id).toBe(753);
    expect(parser.product_id).toBe(3);
    expect(parser.value).toBe(100954);
    expect(parser.date).toBe('2021-03-08');
  });

  it('should handle empty or invalid lines gracefully', () => {
    const line = '';
    const parser = plainToInstance(
      ParseLineFileDto,
      new ParseLineFileDto().parse(line),
    );
    expect(parser.user_id).toBeUndefined();
    expect(parser.name).toBeUndefined();
    expect(parser.order_id).toBeUndefined();
    expect(parser.product_id).toBeUndefined();
    expect(parser.value).toBeUndefined();
    expect(parser.date).toBeUndefined();
  });
});
