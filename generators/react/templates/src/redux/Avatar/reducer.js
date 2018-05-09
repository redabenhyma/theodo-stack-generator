// @flow
import { UPDATE_USERNAME, USER_FETCH_SUCCESS } from './constant';

const initialState = {
  userAvatarUrl: null,
  username: null,
};

export default function reducer(state: AvatarState = initialState, action: UserAction) {
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.payload.username,
      };
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        userAvatarUrl: action.payload.user.avatar_url,
      };
    default:
      return state;
  }
}
