// @flow
import { call, put, takeEvery } from 'redux-saga/effects';
import { makeGetRequest } from 'services/networking/request';
import fetchUserSaga, { fetchUser } from '../sagas';
import { fetchUserRequest, fetchUserSuccess, fetchUserError } from '../actions';
import { USER_FETCH_REQUEST } from '../constant';

describe('[Saga] Avatar redux', () => {
  describe('fetchUser', () => {
    describe('when request is a success', () => {
      const action = fetchUserRequest('juste_leblanc');
      const gen = fetchUser(action);

      it('should call the github api', () => {
        const endpoint = '/users/juste_leblanc';
        expect(gen.next().value).toEqual(call(makeGetRequest, endpoint));
      });

      it('should call the success action when request is a success', () => {
        const githubUser = { avatar_url: 'https://google.com' };
        const outputMock = { body: githubUser };
        expect(gen.next(outputMock).value).toEqual(put(fetchUserSuccess(githubUser)));
      });
    });

    describe('when request fails', () => {
      const action = fetchUserRequest('juste_leblanc');
      const gen = fetchUser(action);

      it('should call the error action', () => {
        const endpoint = '/users/juste_leblanc';
        expect(gen.next().value).toEqual(call(makeGetRequest, endpoint));
        expect(gen.throw({ message: 'error' }).value).toEqual(
          put(fetchUserError({ message: 'error' })),
        );
      });
    });
  });

  describe('fetchUserSaga', () => {
    it('should take every USER_FETCH_REQUEST actions', () => {
      const gen = fetchUserSaga();
      expect(gen.next().value).toEqual(takeEvery(USER_FETCH_REQUEST, fetchUser));
    });
  });
});
