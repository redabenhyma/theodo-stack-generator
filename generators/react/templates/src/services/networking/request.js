// @flow
import request from 'superagent';

const baseUrl = 'https://api.github.com';

export const makeGetRequest = (endpoint: string, data?: Object): Promise<*> => {
  if (data === undefined) {
    return request.get(`${baseUrl}${endpoint}`).set('Accept', 'application/json');
  }

  return request
    .get(`${baseUrl}${endpoint}`)
    .query(data)
    .set('Accept', 'application/json');
};

export const makePostRequest = (endpoint: string, data: Object): Promise<*> =>
  request
    .post(`${baseUrl}${endpoint}`)
    .send(data)
    .set('Accept', 'application/json');
