// @flow
import request from 'superagent';
import { makeGetRequest, makePostRequest } from '../request';

describe('Request service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('makeGetRequest function', () => {
    it('Should make get call to the github api on the endpoint if we pass an endpoint and no data', () => {
      makeGetRequest('/users/1');
      expect(request.get).toHaveBeenCalledWith('https://api.github.com/users/1');
      expect(request.set).toHaveBeenCalledWith('Accept', 'application/json');
      expect(request.post).not.toHaveBeenCalled();
      expect(request.send).not.toHaveBeenCalled();
    });

    it('Should make get call to the github api on the endpoint if we pass an endpoint and some data', () => {
      const data = { orderBy: 'name' };
      makeGetRequest('/users/1', data);
      expect(request.get).toHaveBeenCalledWith('https://api.github.com/users/1');
      expect(request.set).toHaveBeenCalledWith('Accept', 'application/json');
      expect(request.query).toHaveBeenCalledWith(data);
      expect(request.post).not.toHaveBeenCalled();
    });
  });

  describe('makePostRequest function', () => {
    it('Should make post call to the github api on the endpoint with the data we pass', () => {
      const data = { avatarUrl: 'https://google.com' };
      makePostRequest('/users', data);
      expect(request.post).toHaveBeenCalledWith('https://api.github.com/users');
      expect(request.set).toHaveBeenCalledWith('Accept', 'application/json');
      expect(request.send).toHaveBeenCalledWith(data);
      expect(request.get).not.toHaveBeenCalled();
    });
  });
});
