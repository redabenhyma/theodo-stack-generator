// @flow
import { fromJS } from 'immutable';
import { UPDATE_USER_ID, USER_FETCH_SUCCESS } from './constant';

const initialState = fromJS({
  userAvatarUrl: null,
});

export default function reducer(state: AvatarStore = initialState, action: UserAction) {
  switch (action.type) {
    case UPDATE_USER_ID:
      return state.set('userId', action.payload);
    case USER_FETCH_SUCCESS:
      return state.set('userAvatarUrl', action.payload.avatar_url);
    default:
      return state;
  }
}
