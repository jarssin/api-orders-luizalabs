import { SliceTransform } from '../decorators/slice';
import { Trim } from '../decorators/trim';
import { RemoveZerosLeft } from '../decorators/removeZerosLeft';
import { DateTransform } from '../decorators/date';
import { ValueTransform } from '../decorators/value';

type Slice = [number, number];

const indexesUserId: Slice = [0, 10];
const indexesName: Slice = [11, 55];
const indexesOrderId: Slice = [56, 65];
const indexesProductId: Slice = [66, 75];
const indexesProductValue: Slice = [76, 87];
const indexesOrderDate: Slice = [87, 95];

export class ParseLineFileDto {
  public parse(line: string): this {
    for (const key of Object.keys(this)) {
      this[key] = line;
    }

    return this;
  }

  @SliceTransform(indexesUserId)
  @RemoveZerosLeft()
  user_id: number;

  @SliceTransform(indexesName)
  @Trim()
  name: string;

  @SliceTransform(indexesOrderId)
  @RemoveZerosLeft()
  order_id: number;

  @SliceTransform(indexesProductId)
  @RemoveZerosLeft()
  product_id: number;

  @SliceTransform(indexesProductValue)
  @Trim()
  @ValueTransform()
  value: number;

  @SliceTransform(indexesOrderDate)
  @DateTransform()
  date: string;
}
