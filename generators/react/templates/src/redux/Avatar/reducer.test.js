// @flow
import { fromJS } from 'immutable';

import reducer from './reducer';
import { UPDATE_USERNAME, USER_FETCH_SUCCESS } from './constant';

describe('[Reducer] Avatar reducer', () => {
  it('should set the usename if passing an empty state', () => {
    const state = reducer(fromJS({ userAvatarUrl: null }), {
      type: UPDATE_USERNAME,
      payload: { username: 'juste_leblanc' },
    });
    expect(state.toJS()).toEqual({
      userAvatarUrl: null,
      username: 'juste_leblanc',
    });
  });

  it('should set username when passing no state', () => {
    const state = reducer(fromJS(undefined), {
      type: UPDATE_USERNAME,
      payload: { username: 'juste_leblanc' },
    });
    expect(state.toJS()).toEqual({
      userAvatarUrl: null,
      username: 'juste_leblanc',
    });
  });

  it('should set userAvatarUrl', () => {
    const state = reducer(fromJS(undefined), {
      type: USER_FETCH_SUCCESS,
      payload: { user: { avatar_url: 'avatar_url' } },
    });
    expect(state.toJS()).toEqual({
      userAvatarUrl: 'avatar_url',
    });
  });
});
