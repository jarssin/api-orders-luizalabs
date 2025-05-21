import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, IsString, Matches } from 'class-validator';

export class OrderFilterDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  order_id?: number;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  start_date?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  end_date?: string;
}
