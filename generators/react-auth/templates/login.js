// @flow
import request from "superagent";

const baseUrl = "/api";

export const makeLoginRequest = (endpoint: string, data: Object): Promise<*> =>
  request
    .post(`${baseUrl}${endpoint}`)
    .send(`email=${data.email}`)
    .send(`password=${data.password}`);

export const login = async (endpoint: string, data: Object): String => {
  const response = await makeLoginRequest(endpoint, data);
  localStorage.setItem("token", response.body.token);
  return response.body.token;
};
