import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../../repositories/users.repository';
import { ApiResponseHandler } from '../../utils/helpers/ApiResponseHandler';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController],
  providers: [UsersService, ApiResponseHandler],
})
export class UsersModule {}
