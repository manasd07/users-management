import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Logger,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  IApiResponse,
  IDeleteResponse,
} from '../../utils/interfaces/apiResponse.interface';
import { IUser } from '../../utils/interfaces/user.interface';

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
  @Get(':id')
  public findUserById(@Param('id') id: string): Promise<IApiResponse<IUser>> {
    this.logger.verbose(`Get User By ID : ${id}`);
    return this.usersService.findUserById(id);
  }

  /**
   * PUT '/users/:id' | [Update User information]
   * @param updateUserDto
   * @returns Updated User
   */
  @Put('update')
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
  @Delete(':id')
  public async deleteUser(
    @Param('id') id: string,
  ): Promise<IApiResponse<IDeleteResponse>> {
    this.logger.verbose(`Delete User with ID : ${id}`);
    return await this.usersService.deleteUser(id);
  }
}
