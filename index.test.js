'use strict'

jest.mock('request')

const request = require('request')
const WebMergePromiseAPI = require('.').WebMergePromiseAPI


describe('WebMergePromiseAPI', () => {
  describe('new WebMergePromiseAPI()', () => {
    it('returns an object with a request client with default config', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      expect(request.defaults.mock.calls[0]).toEqual([{
        baseUrl: 'https://www.webmerge.me',
        auth: { username: 'key', password: 'secret', sendImmediately: true },
        json: true,
      }])
      expect(request.get).not.toBeCalled()
      expect(api.client.get).not.toBeCalled()
    })
  })

  describe('getDocuments()', () => {
    it('retrieves a list of documents', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      api.getDocuments(null).then(() => {
        expect(api.client.get.mock.calls[0][0]).toEqual({ url: '/api/documents' })
      })
    })
  })

  describe('getDocument()', () => {
    it('retrieves a single document', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      api.getDocument(1).then(() => {
        expect(api.client.get.mock.calls[0][0]).toEqual({ url: '/api/documents/1' })
      })
    })
  })

  describe('getDocumentFields()', () => {
    it('retrieves document fields for a single document', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      api.getDocumentFields(1).then(() => {
        expect(api.client.get.mock.calls[0][0]).toEqual({ url: '/api/documents/1/fields' })
      })
    })
  })

  describe('createDocument()', () => {
    it('creates a new document', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      api.createDocument({}).then(() => {
        expect(api.client.post).toBeCalled()
      })
    })
  })

  describe('updateDocument()', () => {
    it('updates an existing document', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      api.updateDocument(1, {}).then(() => {
        expect(api.client.put).toBeCalled()
      })
    })
  })

  describe('mergeDocument()', () => {
    it('merges an existing document', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      api.mergeDocument(1, 'key', {}, true, true).then(() => {
        expect(api.client.post).toBeCalled()
      })
    })
  })
})
