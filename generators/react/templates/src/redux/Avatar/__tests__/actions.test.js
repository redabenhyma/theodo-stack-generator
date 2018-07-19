// @flow
import * as actions from '../actions';
import * as cst from '../constant';

describe('[Action] Avatar', () => {
  describe('updateUsername', () => {
    it('should return an action', () => {
      expect(actions.updateUsername('juste_leblanc')).toEqual({
        type: cst.UPDATE_USERNAME,
        payload: { username: 'juste_leblanc' },
      });
    });
  });

  describe('fetchUserRequest', () => {
    it('should return an action', () => {
      expect(actions.fetchUserRequest('juste_leblanc')).toEqual({
        type: cst.USER_FETCH_REQUEST,
        payload: { username: 'juste_leblanc' },
      });
    });
  });

  describe('fetchUserSuccess', () => {
    it('should return an action', () => {
      const user = { name: 'me' };
      expect(actions.fetchUserSuccess(user)).toEqual({
        type: cst.USER_FETCH_SUCCESS,
        payload: { user },
      });
    });
  });

  describe('fetchUserError', () => {
    it('should return an action', () => {
      const error = { message: 'unauthorized' };
      expect(actions.fetchUserError(error)).toEqual({
        type: cst.USER_FETCH_ERROR,
        payload: { error: error.message },
      });
    });
  });
});
