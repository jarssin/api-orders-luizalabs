import { Transform } from 'class-transformer';

export function RemoveZerosLeft() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return Number(value.replace(/^0+/, ''));
    }

    return value;
  });
}
