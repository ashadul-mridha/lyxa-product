import { IsOptional, IsString } from 'class-validator';
import { IPaginate } from 'src/common/dtos/query.dto';

export class QueryProductDto extends IPaginate {
  @IsOptional()
  @IsString()
  search?: string;
}
