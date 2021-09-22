import { Test, TestingModule } from '@nestjs/testing';
import { ApiResponseHandler } from '../../../src/utils/helpers/ApiResponseHandler';
import { AppModule } from '../../../src/app.module';
import { UsersService } from '../../../src/modules/users/users.service';
import {
  IApiResponse,
  IDeleteResponse,
} from '../../../src/utils/interfaces/apiResponse.interface';
import { IUser } from '../../../src/utils/interfaces/user.interface';
import {
  defaultUser,
  addUserData,
  testingUserId,
  updateUserData,
  existingEmailId,
} from '../../lib/users-data/test-data.users';
import {
  assertAddUser,
  assertEmailAlreadyExists,
  assertGetAllUsers,
  assertGetUserById,
  assertUserDoesNotExist,
  assertUpdateUser,
  assertDeleteUser,
} from '../../lib/assertFunctions/users.assertFunctions';

describe('UsersService', () => {
  let usersService: UsersService;
  let testingModule: TestingModule;
  let createdUserId: string;
  let defaultCreatedUser: any;
  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [UsersService, ApiResponseHandler],
    }).compile();

    usersService = testingModule.get<UsersService>(UsersService);
    defaultCreatedUser = await usersService.createUser(defaultUser);
  });

  afterAll(async () => {
    await usersService.permanentDeleteUser(createdUserId);
    await usersService.permanentDeleteUser(defaultCreatedUser.data?.id);
    await testingModule.close();
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should create a new user', async () => {
    const result: IApiResponse<IUser> = await usersService.createUser(
      addUserData,
    );
    createdUserId = result?.data.id;
    assertAddUser(result);
  });

  it('should not create a user if email already exists', async () => {
    const result: IApiResponse<IUser> = await usersService.createUser(
      addUserData,
    );
    assertEmailAlreadyExists(result);
  });

  it('should get all users', async () => {
    const result: IApiResponse<IUser[]> = await usersService.findAllUsers();
    assertGetAllUsers(result);
  });

  it('should get user by id', async () => {
    const result: IApiResponse<IUser> = await usersService.findUserById(
      createdUserId,
    );
    assertGetUserById(result);
  });

  it('should return error if userId does not exist', async () => {
    const result: IApiResponse<IUser> = await usersService.findUserById(
      testingUserId.id,
    );
    assertUserDoesNotExist(result);
  });

  it('should update user', async () => {
    const dataToUpdate = {
      ...updateUserData,
      id: createdUserId,
    };
    const result: IApiResponse<IUser> = await usersService.updateUser(
      dataToUpdate,
    );
    assertUpdateUser(result);
  });

  it('should not update user if email already exists for another user', async () => {
    const dataToUpdate = {
      ...updateUserData,
      id: createdUserId,
      email: existingEmailId,
    };
    const result: IApiResponse<IUser> = await usersService.updateUser(
      dataToUpdate,
    );
    assertEmailAlreadyExists(result);
  });

  it('should delete user if exists', async () => {
    const result: IApiResponse<IDeleteResponse> = await usersService.deleteUser(
      createdUserId,
    );
    assertDeleteUser(result);
  });

  it('should return error if user does not exists or already deleted', async () => {
    const result: IApiResponse<IDeleteResponse> = await usersService.deleteUser(
      createdUserId,
    );
    assertUserDoesNotExist(result);
  });
});
