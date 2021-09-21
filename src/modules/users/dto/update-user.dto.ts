import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

/**
 * DTO For Update User API
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ type: () => String })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
