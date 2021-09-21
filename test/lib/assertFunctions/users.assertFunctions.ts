import {
  IApiResponse,
  IDeleteResponse,
} from '../../../src/utils/interfaces/apiResponse.interface';
import { IUser } from '../../../src/utils/interfaces/user.interface';
import { addUserData } from '../users-data/test-data.users';

export const assertAddUser = (result: IApiResponse<IUser>) => {
  expect(result.success).toEqual(true);
  expect(result.status).toEqual(201);
  expect(result.message).toEqual('Successfully added User to database');
  expect(result).toHaveProperty('data');
};

export const assertEmailAlreadyExists = (result: IApiResponse<IUser>) => {
  expect(result.success).toEqual(false);
  expect(result.status).toEqual(400);
  expect(result.message).toEqual('User with this email already exists');
  expect(result).toHaveProperty('error');
  expect(result.error).toHaveProperty('existingUserDetails');
  expect(result.error.existingUserDetails.email).toEqual(addUserData.email);
};

export const assertGetAllUsers = (result: IApiResponse<IUser[]>) => {
  expect(result.success).toEqual(true);
  expect(result.status).toEqual(200);
  expect(result.message).toEqual('Successfully found users');
  expect(result).toHaveProperty('data');
  expect(result.data).toBeInstanceOf(Array);
};

export const assertGetUserById = (result: IApiResponse<IUser>) => {
  expect(result.success).toEqual(true);
  expect(result.status).toEqual(200);
  expect(result.message).toEqual('Successfully found user');
  expect(result).toHaveProperty('data');
  expect(result.data.email).toEqual(addUserData.email);
};

export const assertUserDoesNotExist = (
  result: IApiResponse<IUser | IDeleteResponse>,
) => {
  expect(result.success).toEqual(false);
  expect(result.status).toEqual(400);
  expect(result).toHaveProperty('error');
};

export const assertUpdateUser = (result: IApiResponse<IUser>) => {
  expect(result.success).toEqual(true);
  expect(result.status).toEqual(200);
  expect(result.message).toEqual('Successfully updated User');
  expect(result).toHaveProperty('data');
};

export const assertDeleteUser = (result: IApiResponse<IDeleteResponse>) => {
  expect(result.success).toEqual(true);
  expect(result.status).toEqual(200);
  expect(result.message).toEqual('User Deleted Successfully');
  expect(result.data.affected).toEqual(1);
};

export const assertUserNotExistsOrDeleted = (
  result: IApiResponse<IDeleteResponse>,
) => {
  expect(result.success).toEqual(false);
  expect(result.status).toEqual(400);
  expect(result.message).toEqual('User with this id does not exist');
  expect(result.error).toBe(null);
};
