// @flow
export const getUserToken = (store: Store) => store.login.token;
export const getLoginError = (store: Store) => store.login.loginError;
