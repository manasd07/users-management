import { IApiResponse } from 'src/utils/interfaces/apiResponse.interface';
import { IUser } from 'src/utils/interfaces/user.interface';
import { IdParamsDto } from '../../../src/modules/users/dto/id-params.dto';

export const addUserData = {
  email: 'test@gmail.com',
  givenName: 'Testing first name',
  familyName: 'Testing last name',
};

export const testingUserId: IdParamsDto = {
  id: 'e3ac94fd-2b97-49d1-a8ba-ba2318c92145',
};

export const existingEmailId = 'testUser@gmail.com';

export const defaultUser = {
  email: existingEmailId,
  givenName: 'Default',
  familyName: 'Default',
};

export const updateUserData = {
  ...addUserData,
  id: testingUserId.id,
  givenName: 'Updated first Name',
  familyName: 'Updated last Name',
};

export const commonUserData = {
  email: addUserData.email,
  givenName: addUserData.givenName,
  familyName: addUserData.familyName,
  deletedAt: null,
  id: testingUserId.id,
  createdAt: '2021-09-20T11:56:14.291Z',
  updatedAt: '2021-09-20T11:56:14.291Z',
};

export const addUserResponse = {
  success: true,
  message: 'Successfully added User to database',
  data: commonUserData,
  status: 201,
};

export const allUsersResponse: IApiResponse<IUser[]> = {
  success: true,
  message: 'Successfully found users',
  data: [commonUserData],
  status: 200,
};

export const getUserByIdResponse = {
  success: true,
  message: 'Successfully found user',
  data: commonUserData,
  status: 200,
};

export const updateUserResponse = {
  success: true,
  message: 'Successfully updated User',
  data: Object.assign(commonUserData, { givenName: 'Updated Name' }),
  status: 200,
};

export const deleteUserResponse = {
  success: true,
  message: 'User Deleted Successfully',
  data: {
    generatedMaps: [],
    raw: [],
    affected: 1,
  },
  status: 200,
};
