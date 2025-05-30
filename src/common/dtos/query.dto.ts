import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class IPaginate {
  @IsOptional()
  @IsNumberString()
  perPage?: number;

  @IsOptional()
  @IsNumberString()
  currentPage?: number;
}

export class CommonQueryDto extends IPaginate {
  @IsOptional()
  @IsEnum({ ASC: 'ASC', DESC: 'DESC' })
  sort?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;
}

export class MongoIdParams {
  @IsNotEmpty()
  @IsMongoId()
  id: Types.ObjectId;
}
