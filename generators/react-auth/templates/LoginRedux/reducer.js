// @flow
import { USER_LOGIN_SUCCESS, USER_LOGIN_ERROR } from './constant';

const initialState = { token: null, loginError: null };

export default function reducer(state: UserState = initialState, action: UserAction) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload,
      };
    default:
      return state;
  }
}
