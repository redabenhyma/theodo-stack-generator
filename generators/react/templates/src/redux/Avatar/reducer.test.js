import reducer from './reducer';
import { UPDATE_USER_ID, USER_FETCH_SUCCESS } from './constant';

describe('[Reducer] Avatar reducer', () => {
  it('should return the inital state when passing no state', () => {
    const state = reducer(undefined, {type: 'FAKE_TYPE'});
    expect(state.toJS()).toEqual({
      userAvatarUrl: null,
    });
  });

  it('should set userId', () => {
    const state = reducer(undefined, {type: UPDATE_USER_ID, payload: 16});
    expect(state.toJS()).toEqual({
      userAvatarUrl: null,
      userId: 16,
    });
  });

  it('should set userAvatarUrl', () => {
    const state = reducer(undefined, {type: USER_FETCH_SUCCESS, payload: {avatar_url: 'avatar_url'}});
    expect(state.toJS()).toEqual({
      userAvatarUrl: 'avatar_url',
    });
  });
});
