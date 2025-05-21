import { Transform } from 'class-transformer';

export function CastMoney() {
  return Transform(({ value }) => {
    if (typeof value === 'number') {
      return (value / 100).toFixed(2);
    }
    if (typeof value === 'string' && !isNaN(Number(value))) {
      return (Number(value) / 100).toFixed(2);
    }
    return value;
  });
}
