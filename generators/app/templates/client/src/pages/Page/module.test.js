import { call, put } from 'redux-saga/effects';
import * as module from './module';
import request from '../../services/networking/request';

describe('[Action] Page module', () => {
  describe('updateUserId', () => {
    it('should return an action', () => {
      expect(module.updateUserId('github')).toEqual({
        type: module.UPDATE_USER_ID,
        payload: 'github',
      });
    });
  });

  describe('fetchUserRequest', () => {
    it('should return an action', () => {
      expect(module.fetchUserRequest('github')).toEqual({
        type: module.USER_FETCH_REQUEST,
        payload: { userId: 'github' },
      });
    });
  });

  describe('fetchUserSuccess', () => {
    it('should return an action', () => {
      const user = { name: 'me' };
      expect(module.fetchUserSuccess(user)).toEqual({
        type: module.USER_FETCH_SUCCESS,
        payload: user,
      });
    });
  });

  describe('fetchUserError', () => {
    it('should return an action', () => {
      const error = { message: 'unauthorized' };
      expect(module.fetchUserError(error)).toEqual({
        type: module.USER_FETCH_ERROR,
        payload: error.message,
      });
    });
  });
});

describe('[Saga] Page module', () => {
  describe('fetchUser', () => {
    describe('when request is a success', () => {
      const action = module.fetchUserRequest('me');
      const gen = module.fetchUser(action);

      it('should call the github api', () => {
        const url = 'https://api.github.com/users/me';
        expect(gen.next().value).toEqual(call(request, url));
      });

      it('should call the success action when request is a success', () => {
        const outputMock = {};
        expect(gen.next(outputMock).value).toEqual(put(module.fetchUserSuccess(outputMock)));
      });
    });

    describe('when request fails', () => {
      const action = module.fetchUserRequest('me');
      const gen = module.fetchUser(action);

      it('should call the error action', () => {
        const url = 'https://api.github.com/users/me';
        expect(gen.next().value).toEqual(call(request, url));
        expect(gen.throw({ message: 'error' }).value).toEqual(
          put(module.fetchUserError({ message: 'error' })),
        );
      });
    });
  });
});
