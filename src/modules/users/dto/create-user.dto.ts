import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * DTO For Create User API
 */
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform((email) => email.value.toLowerCase())
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  givenName: string;

  @ApiPropertyOptional()
  @IsString()
  familyName: string;
}
