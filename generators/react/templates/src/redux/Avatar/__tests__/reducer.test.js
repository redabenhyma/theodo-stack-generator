import reducer from '../reducer';
import { UPDATE_USERNAME, USER_FETCH_SUCCESS } from '../constant';

describe('[Reducer] Avatar reducer', () => {
  const previousState = {
    username: null,
    userAvatarUrl: null,
  };

  it('should return the inital state when passing no state', () => {
    const state = reducer(undefined, { type: 'FAKE_TYPE' });
    expect(state).toEqual({
      userAvatarUrl: null,
      username: null,
    });
  });

  describe('UPDATE_USERNAME case', () => {
    const payload = {
      username: 'juste_leblanc',
    };
    const action = { type: UPDATE_USERNAME, payload };

    it('should set username', () => {
      const state = reducer(undefined, action);
      expect(state).toEqual({
        userAvatarUrl: null,
        username: 'juste_leblanc',
      });
    });

    it('should modify state immutably', () => {
      const state = reducer(previousState, action);
      expect(state).not.toBe(previousState);
    });
  });

  describe('USER_FETCH_SUCCESS case', () => {
    const action = {
      type: USER_FETCH_SUCCESS,
      payload: { user: { avatar_url: 'avatar_url', username: null } },
    };

    it('should set userAvatarUrl', () => {
      const state = reducer(undefined, action);
      expect(state).toEqual({
        userAvatarUrl: 'avatar_url',
        username: null,
      });
    });

    it('should modify state immutably', () => {
      const state = reducer(previousState, action);
      expect(state).not.toBe(previousState);
    });
  });
});
