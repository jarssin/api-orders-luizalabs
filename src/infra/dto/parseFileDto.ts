import { ParseLineFileDto } from './parseLineFileDto';
import { plainToClass } from 'class-transformer';

export class ParseFileDto {
  public static parse(fileContent: string) {
    const lines = fileContent.split('\n');
    const lineParsed: ParseLineFileDto[] = [];

    const userParserDto = new ParseLineFileDto();

    lines.forEach((line) => {
      const dirtyLine = userParserDto.parse(line);
      lineParsed.push(plainToClass(ParseLineFileDto, dirtyLine));
    });

    return lineParsed;
  }
}
