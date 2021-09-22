import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Logger,
  Put,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdParamsDto } from './dto/id-params.dto';
import {
  IApiResponse,
  IDeleteResponse,
} from '../../utils/interfaces/apiResponse.interface';
import { IUser } from '../../utils/interfaces/user.interface';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users Controller API')
@Controller('users')
export class UsersController {
  private logger: Logger;
  constructor(private readonly usersService: UsersService) {
    this.logger = new Logger('Users Controller');
  }
  /**
   * POST '/users' | [Adds user to database]
   * @param createUserDto
   * @returns createdUser
   */
  @ApiCreatedResponse({
    description: 'User Added successfully',
  })
  @ApiBadRequestResponse({
    description: 'User already exists',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('add')
  public async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IApiResponse<IUser>> {
    this.logger.verbose(`Add user : ${JSON.stringify(createUserDto)}`);
    return await this.usersService.createUser(createUserDto);
  }

  /**
   * GET '/users' | [Gets list of all users]
   * @returns all users
   */
  @ApiOkResponse({
    description: 'Successfully found users',
  })
  @ApiNoContentResponse({
    description: 'No users found in database',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  @Get()
  public findAllUsers(): Promise<IApiResponse<IUser[]>> {
    this.logger.verbose(`Get All Users`);
    return this.usersService.findAllUsers();
  }

  /**
   * GET '/users/:id' | [Gets User by userId]
   * @param id
   * @returns User by id
   */
  @ApiOkResponse({
    description: 'Successfully found user',
  })
  @ApiBadRequestResponse({
    description: 'User not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  @Get(':id')
  public findUserById(
    @Param() params: IdParamsDto,
  ): Promise<IApiResponse<IUser>> {
    this.logger.verbose(`Get User By ID : ${params.id}`);
    return this.usersService.findUserById(params.id);
  }

  /**
   * PUT '/users/:id' | [Update User information]
   * @param updateUserDto
   * @returns Updated User
   */

  @Put('update')
  @ApiOkResponse({
    description: 'Successfully updated user',
  })
  @ApiBadRequestResponse({
    description: 'User with this id does not exist',
  })
  @ApiBadRequestResponse({
    description: 'User with this email already exists',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  public async updateUser(
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IApiResponse<IUser>> {
    this.logger.verbose(`Update User : ${JSON.stringify(updateUserDto)}`);
    return await this.usersService.updateUser(updateUserDto);
  }

  /**
   * DELETE '/users/:id' | [Soft Deletes user from database]
   * @param id
   * @returns IDeleteResponse
   */
  @ApiOkResponse({
    description: 'User Deleted Successfully',
  })
  @ApiBadRequestResponse({
    description: 'User with this id does not exist',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  @Delete(':id')
  public async deleteUser(
    @Param() params: IdParamsDto,
  ): Promise<IApiResponse<IDeleteResponse>> {
    this.logger.verbose(`Delete User with ID : ${params.id}`);
    return await this.usersService.deleteUser(params.id);
  }
}
