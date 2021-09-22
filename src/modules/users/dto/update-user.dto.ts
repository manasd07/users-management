import { IntersectionType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IdParamsDto } from './id-params.dto';

/**
 * DTO For Update User API
 */
export class UpdateUserDto extends IntersectionType(
  PartialType(CreateUserDto),
  IdParamsDto,
) {}
