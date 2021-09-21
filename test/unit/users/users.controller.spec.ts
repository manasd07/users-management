import { Test, TestingModule } from '@nestjs/testing';
import {
  addUserData,
  addUserResponse,
  allUsersResponse,
  deleteUserResponse,
  getUserByIdResponse,
  testingUserId,
  updateUserData,
  updateUserResponse,
} from '../../lib/users-data/test-data.users';
import { UsersController } from '../../../src/modules/users/users.controller';
import { UsersService } from '../../../src/modules/users/users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useFactory: () => ({
            createUser: jest.fn(() => true),
            findAllUsers: jest.fn(() => true),
            findUserById: jest.fn(() => true),
            updateUser: jest.fn(() => true),
            deleteUser: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    usersController = testingModule.get<UsersController>(UsersController);
    usersService = testingModule.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    testingModule.close();
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should call "createUser" from "UsersService"', async () => {
    jest
      .spyOn(usersService, 'createUser')
      .mockImplementation(async () => addUserResponse);
    expect(await usersController.createUser(addUserData)).toBe(addUserResponse);
    expect(usersService.createUser).toHaveBeenCalledWith(addUserData);
  });

  it('should call "findAllUsers" from "UsersService"', async () => {
    jest
      .spyOn(usersService, 'findAllUsers')
      .mockImplementation(async () => allUsersResponse);
    expect(await usersController.findAllUsers()).toBe(allUsersResponse);
    expect(usersService.findAllUsers).toHaveBeenCalled();
  });

  it('should call "findUserById" from "UsersService"', async () => {
    jest
      .spyOn(usersService, 'findUserById')
      .mockImplementation(async () => getUserByIdResponse);
    expect(await usersController.findUserById(testingUserId)).toBe(
      getUserByIdResponse,
    );
    expect(usersService.findUserById).toHaveBeenCalledWith(testingUserId);
  });

  it('should call "updateUser" from "UsersService"', async () => {
    jest
      .spyOn(usersService, 'updateUser')
      .mockImplementation(async () => updateUserResponse);
    expect(await usersController.updateUser(updateUserData)).toBe(
      updateUserResponse,
    );
    expect(usersService.updateUser).toHaveBeenCalledWith(updateUserData);
  });

  it('should call "deleteUser" from "UsersService"', async () => {
    jest
      .spyOn(usersService, 'deleteUser')
      .mockImplementation(async () => deleteUserResponse);
    expect(await usersController.deleteUser(testingUserId)).toBe(
      deleteUserResponse,
    );
    expect(usersService.deleteUser).toHaveBeenCalledWith(testingUserId);
  });
});
