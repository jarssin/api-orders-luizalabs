import { Transform } from 'class-transformer';

export const ValueTransform = () => {
  return Transform((data) => {
    const line = data.value;
    if (!line) return;

    return parseInt(line.replace('.', ''));
  });
};
