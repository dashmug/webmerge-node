'use strict';

jest.mock('request');

const request = require('request');
const WebMergeAPI = require('.');


describe('WebMergeAPI', () => {
  describe('new WebMergeAPI()', () => {
    it('returns an object with a request client with default config', () => {
      const api = new WebMergeAPI('hello', 'world');

      expect(request.defaults.mock.calls[0]).toEqual([{
        baseUrl: 'https://www.webmerge.me',
        auth: { username: 'hello', password: 'world', sendImmediately: true },
        json: true,
      }]);
      expect(api.client.get).not.toBeCalled();
    });
  });

  describe('getDocuments()', () => {
    it('retrieves a list of documents', () => {
      const api = new WebMergeAPI('hello', 'world');

      api.getDocuments(null, () => {
        expect(api.client.get.mock.calls[0][0]).toEqual({ url: '/api/documents' });
      });
    });
  });

  describe('getDocument()', () => {
    it('retrieves a single document', () => {
      const api = new WebMergeAPI('hello', 'world');

      api.getDocument(1, () => {
        expect(api.client.get.mock.calls[0][0]).toEqual({ url: '/api/documents/1' });
      });
    });
  });

  describe('getDocumentFields()', () => {
    it('retrieves document fields for a single document', () => {
      const api = new WebMergeAPI('hello', 'world');

      api.getDocumentFields(1, () => {
        expect(api.client.get.mock.calls[0][0]).toEqual({ url: '/api/documents/1/fields' });
      });
    });
  });
});
