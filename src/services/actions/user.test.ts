import { USER_SET_CREDENTIALS, setUserCredentials } from './user';

describe('Action creators', () => {
  it('should create an action with correct user credentials', () => {
    const user = {
      email: 'test@example.com',
      name: 'test',
    };

    const expectedAction = {
      type: USER_SET_CREDENTIALS,
      user,
    };

    expect(setUserCredentials(user)).toEqual(expectedAction);
  });
});
