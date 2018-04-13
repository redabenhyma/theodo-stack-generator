// @flow
import { UPDATE_USERNAME, USER_FETCH_SUCCESS } from './constant';

const initialState = {
  userAvatarUrl: null,
  userId: null,
};

export default function reducer(state: AvatarState = initialState, action: UserAction) {
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        userAvatarUrl: action.payload.avatar_url,
      };
    default:
      return state;
  }
}
