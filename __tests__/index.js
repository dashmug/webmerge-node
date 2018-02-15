'use strict'

const request = require('request')
// eslint-disable-next-line prefer-destructuring
const WebMergePromiseAPI = require('..').WebMergePromiseAPI


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

      return api.getDocuments({})
        .then(() => {
          expect(api.client.get.mock.calls[0][0]).toEqual({ url: '/api/documents', qs: {} })
        })
    })
  })

  describe('getDocument()', () => {
    it('retrieves a single document', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      return api.getDocument(1)
        .then(() => {
          expect(api.client.get.mock.calls[0][0]).toEqual({ url: '/api/documents/1' })
        })
    })
  })

  describe('getDocumentFields()', () => {
    it('retrieves document fields for a single document', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      return api.getDocumentFields(1)
        .then(() => {
          expect(api.client.get.mock.calls[0][0]).toEqual({ url: '/api/documents/1/fields' })
        })
    })
  })

  describe('getDocumentFiles()', () => {
    it('retrieves the file for a single document', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      return api.getDocumentFiles(1)
        .then(() => {
          expect(api.client.get.mock.calls[0][0]).toEqual({ url: '/api/documents/1/file' })
        })
    })
  })

  describe('createDocument()', () => {
    it('creates a new document', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      return api.createDocument({ name: 'dummy', type: 'pdf' })
        .then(() => {
          expect(api.client.post.mock.calls[0][0]).toEqual({
            url: '/api/documents',
            body: { name: 'dummy', type: 'pdf' },
          })
        })
    })
  })

  describe('updateDocument()', () => {
    it('updates an existing document', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      return api.updateDocument(1, {})
        .then(() => {
          expect(api.client.put.mock.calls[0][0]).toEqual({ url: '/api/documents/1', body: {} })
        })
    })
  })

  describe('mergeDocument()', () => {
    it('merges an existing document', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      return api.mergeDocument(1, 'key', {}, true, true)
        .then(() => {
          expect(api.client.post.mock.calls[0][0]).toEqual({
            url: '/merge/1/key',
            qs: { test: 1, download: 1 },
            body: {},
          })
        })
    })
  })

  describe('copyDocument()', () => {
    it('copies an existing document', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      return api.copyDocument(1, { name: 'new copy' })
        .then(() => {
          expect(api.client.post.mock.calls[0][0]).toEqual({
            url: '/api/documents/1/copy',
            body: { name: 'new copy' },
          })
        })
    })
  })

  describe('deleteDocument()', () => {
    it('deletes an existing document', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      return api.deleteDocument(1)
        .then(() => {
          expect(api.client.delete.mock.calls[0][0]).toEqual({ url: '/api/documents/1' })
        })
    })
  })

  describe('getDataRoutes()', () => {
    it('retrieves a list of data routes', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      return api.getDataRoutes()
        .then(() => {
          expect(api.client.get.mock.calls[0][0]).toEqual({ url: '/api/routes' })
        })
    })
  })

  describe('getDataRoute()', () => {
    it('retrieves a single data route', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      return api.getDataRoute(1)
        .then(() => {
          expect(api.client.get.mock.calls[0][0]).toEqual({ url: '/api/routes/1' })
        })
    })
  })

  describe('getDataRouteFields()', () => {
    it('retrieves fields from a single data route', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      return api.getDataRouteFields(1)
        .then(() => {
          expect(api.client.get.mock.calls[0][0]).toEqual({ url: '/api/routes/1/fields' })
        })
    })
  })

  describe('getDataRouteRules()', () => {
    it('retrieves rules from a single data route', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      return api.getDataRouteRules(1)
        .then(() => {
          expect(api.client.get.mock.calls[0][0]).toEqual({ url: '/api/routes/1/rules' })
        })
    })
  })

  describe('createDataRoute()', () => {
    it('creates a new data route', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      return api.createDataRoute({ name: 'dummy route', rules: [{ document_id: 123456 }] })
        .then(() => {
          expect(api.client.post.mock.calls[0][0]).toEqual({
            url: '/api/routes',
            body: { name: 'dummy route', rules: [{ document_id: 123456 }] },
          })
        })
    })
  })

  describe('updateDataRoute()', () => {
    it('updates an existing data route', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      return api.updateDataRoute(1, {})
        .then(() => {
          expect(api.client.put.mock.calls[0][0]).toEqual({ url: '/api/routes/1', body: {} })
        })
    })
  })

  describe('mergeDataRoute()', () => {
    it('merges an existing data route', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      return api.mergeDataRoute(1, 'key', {}, false, false)
        .then(() => {
          expect(api.client.post.mock.calls[0][0]).toEqual({
            url: '/route/1/key',
            qs: { test: 0, download: 0 },
            body: {},
          })
        })
    })
  })

  describe('deleteDataRoute()', () => {
    it('deletes an existing data route', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      return api.deleteDataRoute(1)
        .then(() => {
          expect(api.client.delete.mock.calls[0][0]).toEqual({ url: '/api/routes/1' })
        })
    })
  })

  describe('combineFiles()', () => {
    it('combines files into PDFs', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      return api.combineFiles({ output: 'pdf', files: [{ name: 'hello.pdf', url: 'https://example.com/hello.pdf' }] })
        .then(() => {
          expect(api.client.post.mock.calls[0][0]).toEqual({
            body: {
              files: [{
                name: 'hello.pdf',
                url: 'https://example.com/hello.pdf',
              }],
              output: 'pdf',
            },
            url: '/tools/combine',
          })
        })
    })
  })

  describe('convertToPDF()', () => {
    it('converts a file into a PDF', () => {
      const api = new WebMergePromiseAPI('key', 'secret')

      return api.convertToPDF({ file: { name: 'hello.pdf', url: 'https://example.com/hello.pdf' } })
        .then(() => {
          expect(api.client.post.mock.calls[0][0]).toEqual({
            body: { file: { name: 'hello.pdf', url: 'https://example.com/hello.pdf' } },
            url: '/tools/convert_to_pdf',
          })
        })
    })
  })
})
