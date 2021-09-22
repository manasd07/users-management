import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class IdParamsDto {
  @ApiProperty({
    type: () => String,
    required: true,
    description: 'Enter Id(uuid) of user',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
