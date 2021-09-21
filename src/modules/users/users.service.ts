import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../../repositories/users.repository';
import { ApiResponseHandler } from '../../utils/helpers/ApiResponseHandler';
import {
  IApiResponse,
  IDeleteResponse,
} from '../../utils/interfaces/apiResponse.interface';
import { IUser } from '../../utils/interfaces/user.interface';
import { Connection, Not } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private logger: Logger;
  /**
   * User Repository Import
   */
  private userRepository: UserRepository;

  constructor(
    private readonly connection: Connection,
    private readonly apiResponseHandler: ApiResponseHandler,
  ) {
    this.logger = new Logger('Users Service', { timestamp: true });
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  /**
   * Function to create user in database
   * @param createUserDto
   * @returns Created User
   */
  public async createUser(
    createUserDto: CreateUserDto,
  ): Promise<IApiResponse<IUser>> {
    try {
      const { email } = createUserDto;
      // Check for existing user with same email
      const isExistingUser = await this.userRepository.findOne({ email });
      if (isExistingUser) {
        return this.apiResponseHandler.handleFailed(
          'User with this email already exists',
          { existingUserDetails: isExistingUser },
          HttpStatus.BAD_REQUEST,
        );
      }
      // Add new user to database
      const addedUser = await this.userRepository.addUser(createUserDto);
      return this.apiResponseHandler.handleSuccess(
        'Successfully added User to database',
        addedUser,
        HttpStatus.CREATED,
      );
    } catch (error) {
      this.logger.error(`${error}`);
      return this.apiResponseHandler.handleFailed(
        'Internal Server Error',
        {},
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Function to Get All Users
   * @returns IUser[] [List of Users]
   */
  public async findAllUsers(): Promise<IApiResponse<IUser[]>> {
    try {
      // Get list of all users
      const users = await this.userRepository.getAllUsers();
      if (!users) {
        return this.apiResponseHandler.handleSuccess(
          'No users found in database',
          [],
          HttpStatus.NO_CONTENT,
        );
      }
      return this.apiResponseHandler.handleSuccess(
        'Successfully found users',
        users,
        HttpStatus.OK,
      );
    } catch (error) {
      this.logger.error(`${error}`);
      return this.apiResponseHandler.handleFailed(
        'Internal Server Error',
        {},
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Function to Get user by id
   * @param id
   * @returns User where id matches
   */
  public async findUserById(id: string): Promise<IApiResponse<IUser>> {
    try {
      // Get User by Id (if exists)
      const user = await this.userRepository.getUserById(id);
      if (!user) {
        return this.apiResponseHandler.handleFailed(
          `User Not Found with id ${id}`,
          null,
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.apiResponseHandler.handleSuccess(
        'Successfully found user',
        user,
        HttpStatus.OK,
      );
    } catch (error) {
      this.logger.error(`${error}`);
      return this.apiResponseHandler.handleFailed(
        'Internal Server Error',
        {},
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Function to update user details
   * @param updateUserDto
   * @returns Updated User
   */
  public async updateUser(
    updateUserDto: UpdateUserDto,
  ): Promise<IApiResponse<IUser>> {
    try {
      // Check for existing user by ID
      const { id, email } = updateUserDto;
      const isExistingUser = await this.userRepository.getUserById(id);
      if (!isExistingUser) {
        return this.apiResponseHandler.handleFailed(
          'User with this id does not exist',
          null,
          HttpStatus.BAD_REQUEST,
        );
      }
      // Check for existing email ID
      const isExistingEmail = await this.userRepository.findOne({
        where: { email: email, deletedAt: null, id: Not(id) },
      });
      if (isExistingEmail) {
        return this.apiResponseHandler.handleFailed(
          'User with this email already exists',
          { existingUserDetails: isExistingUser },
          HttpStatus.BAD_REQUEST,
        );
      }
      // Update user
      const updatedUser = await this.userRepository.updateUser(updateUserDto);
      return this.apiResponseHandler.handleSuccess(
        'Successfully updated User',
        updatedUser,
        HttpStatus.OK,
      );
    } catch (error) {
      this.logger.error(`${error}`);
      return this.apiResponseHandler.handleFailed(
        'Internal Server Error',
        {},
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async deleteUser(id: string): Promise<IApiResponse<IDeleteResponse>> {
    try {
      // Check for existing user by id
      const isExistingUser = await this.userRepository.getUserById(id);
      if (!isExistingUser) {
        return this.apiResponseHandler.handleFailed(
          'User with this id does not exist',
          {},
          HttpStatus.BAD_REQUEST,
        );
      }
      // Soft-Delete User
      const deleteResponse = await this.userRepository.deleteUser(id);
      if (deleteResponse && deleteResponse.affected > 0) {
        return this.apiResponseHandler.handleSuccess(
          'User Deleted Successfully',
          deleteResponse,
          HttpStatus.OK,
        );
      }
    } catch (error) {
      this.logger.error(`${error}`);
      return this.apiResponseHandler.handleFailed(
        'Internal Server Error',
        {},
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Function to permanently delete user from database
   * NOTE : This method is only intended for use with tests
   * @param id
   * @returns Deleted User id
   */
  public async permanentDeleteUser(id: string): Promise<IApiResponse<any>> {
    try {
      const deleteResponse = await this.userRepository.permanentDeleteUser(id);
      if (!deleteResponse) {
        return this.apiResponseHandler.handleFailed(
          'User with this id does not exist',
          {},
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.apiResponseHandler.handleSuccess(
        'User permanently deleted successfully',
        { id },
        HttpStatus.OK,
      );
    } catch (error) {
      this.logger.error(`${error}`);
      return this.apiResponseHandler.handleFailed(
        'Internal Server Error',
        {},
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
