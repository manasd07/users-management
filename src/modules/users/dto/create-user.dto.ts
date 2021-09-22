import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

/**
 * DTO For Create User API
 */
export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'email id of user',
    example: 'test@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform((email) => email.value.toLowerCase())
  email: string;

  @ApiProperty({
    required: true,
    description: 'Given Name or First Name of user',
    example: 'test_given_name',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  givenName: string;

  @ApiProperty({
    required: true,
    description: 'Family Name or Last Name of user',
    example: 'test_family_name',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  familyName: string;
}
