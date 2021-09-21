import { CreateUserDto } from '../modules/users/dto/create-user.dto';
import { UpdateUserDto } from '../modules/users/dto/update-user.dto';
import { User } from '../modules/users/entities/user.entity';
import { IUser } from '../utils/interfaces/user.interface';
import { IDeleteResponse } from '../utils/interfaces/apiResponse.interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * Function to add new User to database
   * @param createUserDto
   * @returns User(Created)
   */
  public async addUser(createUserDto: CreateUserDto): Promise<IUser> {
    const user = new User();
    Object.assign(user, createUserDto);
    return await user.save();
  }

  /**
   * Function to get all users
   * @returns List of Users
   */
  public async getAllUsers(): Promise<IUser[]> {
    return await this.find();
  }

  /**
   * Function to get user by id
   * @param userId
   * @returns User by userId
   */
  public async getUserById(userId: string): Promise<IUser> {
    return await this.findOne({ id: userId });
  }

  /**
   * Function to update user details
   * @param updateUserDto
   * @returns User(updated)
   */
  public async updateUser(updateUserDto: UpdateUserDto): Promise<IUser> {
    const user = await this.findOne(updateUserDto.id);
    if (user) {
      Object.assign(user, updateUserDto);
      await this.save(user);
    }
    return user;
  }

  /**
   * Function to soft delete users
   * @param userId
   * @returns
   */
  public async deleteUser(userId: string): Promise<IDeleteResponse> {
    return await this.softDelete({ id: userId });
  }

  /**
   * Function to permanently delete user from database
   * NOTE : This method is only intended for use with tests
   * @param id
   * @returns Deleted User id
   */
  public async permanentDeleteUser(userId: string): Promise<any> {
    return await this.delete({ id: userId });
  }
}
