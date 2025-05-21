import { Transform } from 'class-transformer';

export const SliceTransform = ([start, end]: [number, number]) => {
  return Transform((data) => {
    const line = data.value;
    if (!line) return;

    return line.slice(start, end);
  });
};
