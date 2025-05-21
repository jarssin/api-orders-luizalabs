import { Transform } from 'class-transformer';

export const DateTransform = () => {
  return Transform((data) => {
    const line = data.value;
    if (!line) return;

    const year = line.substring(0, 4);
    const month = line.substring(4, 6);
    const day = line.substring(6, 8);

    return `${year}-${month}-${day}`;
  });
};
