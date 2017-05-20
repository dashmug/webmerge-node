/**
 * WebMerge module.
 * @module webmerge
 */

'use strict'

const request = require('request')


const WEB_MERGE_BASE_URL = 'https://www.webmerge.me'
const API_ENDPOINT = '/api/documents'
const MERGE_ENDPOINT = '/merge'
const ROUTE_ENDPOINT = '/route'
const TOOLS_ENDPOINT = '/tools'

/**
 * Utility function to convert callbacks to Promise
 * @param fn - Node-style callback
 */
const promiseFromCallback = fn => new Promise((resolve, reject) => {
  fn((err, response) => {
    if (err) return reject(err)
    return resolve(response)
  })
})

/**
 * API client with a callback API
 */
class WebMergeAPI {

  /**
   * Create an API client that uses callbacks.
   * @param {string} key - API key
   * @param {string} secret - API secret
   */
  constructor(key, secret) {
    this.client = request.defaults({
      baseUrl: WEB_MERGE_BASE_URL,
      auth: {
        username: key,
        password: secret,
        sendImmediately: true,
      },
      json: true,
    })
  }

  /**
   * Retrieve a list of documents.
   * @param {Object} options
   * @param {string} options.search - Search term
   * @param {string} options.folder - Folder name
   * @param callback
   */
  getDocuments(options, callback) {
    return this.client.get({
      url: `${API_ENDPOINT}`,
      qs: options,
    }, (err, response, body) => {
      if (err) return callback(err)
      return callback(null, body)
    })
  }

  /**
   * Retrieve a specific document.
   * @param {number} id - Document ID
   * @param callback
   */
  getDocument(id, callback) {
    return this.client.get({
      url: `${API_ENDPOINT}/${id}`,
    }, (err, response, body) => {
      if (err) return callback(err)
      return callback(null, body)
    })
  }

  /**
   * Retrieve a list of fields for a specific document.
   * @param {number} id - Document ID
   * @param callback
   */
  getDocumentFields(id, callback) {
    return this.client.get({
      url: `${API_ENDPOINT}/${id}/fields`,
    }, (err, response, body) => {
      if (err) return callback(err)
      return callback(null, body)
    })
  }

  /**
   * Retrieve the file that was uploaded for a specific document (pdf, docx, xlsx, or pptx).
   * @param {number} id - Document ID
   * @param callback
   */
  getDocumentFiles(id, callback) {
    return this.client.get({
      url: `${API_ENDPOINT}/${id}/file`,
    }, (err, response, body) => {
      if (err) return callback(err)
      return callback(null, body)
    })
  }

  /**
   * Create a new document.
   * Depending on the type of document you are creating, different parameters are required
   * @param {Object} data - See {@link https://www.webmerge.me/developers/documents}
   * @param callback
   */
  createDocument(data, callback) {
    return this.client.post({
      url: `${API_ENDPOINT}`,
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err)
      return callback(null, body)
    })
  }

  /**
   * Update a document.
   * You cannot change the type of document, but you can change many of the other settings as well as change the
   * contents of the document. Only parameters that are sent in the request will be updated.
   * @param {number} id - Document ID
   * @param {Object} data
   * @param callback
   */
  updateDocument(id, data, callback) {
    return this.client.put({
      url: `${API_ENDPOINT}/${id}`,
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err)
      return callback(null, body)
    })
  }

  /**
   * Merge a document.
   * @param {number} id - Document ID
   * @param {string} key - Document key
   * @param {Object} data - Data to be merged
   * @param {boolean} isTestMode - Merge the document in "test" mode
   * @param {boolean} downloadFile - Return the merged document in response
   * @param callback
   */
  mergeDocument(id, key, data, isTestMode, downloadFile, callback) {
    return this.client.post({
      url: `${MERGE_ENDPOINT}/${id}/${key}`,
      qs: {
        test: isTestMode ? 1 : 0,
        download: downloadFile ? 1 : 0,
      },
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err)
      return callback(null, body)
    })
  }

  /**
   * Create a copy of a document.
   * @param {number} id - Document ID
   * @param {Object} data
   * @param {string} data.name - Name of the new document
   * @param callback
   */
  copyDocument(id, data, callback) {
    return this.client.post({
      url: `${API_ENDPOINT}/${id}/copy`,
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err)
      return callback(null, body)
    })
  }

  /**
   * Delete a document.
   * @param {number} id - Document ID
   * @param callback
   */
  deleteDocument(id, callback) {
    return this.client.delete({
      url: `${API_ENDPOINT}/${id}`,
    }, (err, response, body) => {
      if (err) return callback(err)
      return callback(null, body)
    })
  }

  /**
   * Retrieve a list of data routes.
   * @param callback
   */
  getDataRoutes(callback) {
    return this.client.get({
      url: `${ROUTE_ENDPOINT}`,
    }, (err, response, body) => {
      if (err) return callback(err)
      return callback(null, body)
    })
  }

  /**
   * Retrieve a specific data route.
   * @param {number} id - Data Route ID
   * @param callback
   */
  getDataRoute(id, callback) {
    return this.client.get({
      url: `${ROUTE_ENDPOINT}/${id}`,
    }, (err, response, body) => {
      if (err) return callback(err)
      return callback(null, body)
    })
  }

  /**
   * Retrieve a list of fields for a specific data route.
   * This includes fields from all documents in routing rules.
   * @param {number} id - Data Route ID
   * @param callback
   */
  getDataRouteFields(id, callback) {
    return this.client.get({
      url: `${ROUTE_ENDPOINT}/${id}/fields`,
    }, (err, response, body) => {
      if (err) return callback(err)
      return callback(null, body)
    })
  }

  /**
   * Retrieve a list of rules for a specific data route.
   * @param {number} id - Data Route ID
   * @param callback
   */
  getDataRouteRules(id, callback) {
    return this.client.get({
      url: `${ROUTE_ENDPOINT}/${id}/rules`,
    }, (err, response, body) => {
      if (err) return callback(err)
      return callback(null, body)
    })
  }

  /**
   * Merge a data route.
   * @param {number} id - Document ID
   * @param {string} key - Document key
   * @param {Object} data - Data to be merged
   * @param {boolean} isTestMode - Merge the document in "test" mode
   * @param {boolean} downloadFile - Return the merged document in response
   * @param callback
   */
  mergeDataRoute(id, key, data, isTestMode, downloadFile, callback) {
    return this.client.post({
      url: `${ROUTE_ENDPOINT}/${id}/${key}`,
      qs: {
        test: isTestMode ? 1 : 0,
        download: downloadFile ? 1 : 0,
      },
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err)
      return callback(null, body)
    })
  }

  /**
   * Create a new data route.
   * @param {Object} data - https://www.webmerge.me/developers/routes
   * @param callback
   */
  createDataRoute(data, callback) {
    return this.client.post({
      url: `${ROUTE_ENDPOINT}`,
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err)
      return callback(null, body)
    })
  }

  /**
   * Update a data route.
   * @param {number} id - Data Route ID
   * @param {Object} data
   * @param callback
   */
  updateDataRoute(id, data, callback) {
    return this.client.put({
      url: `${ROUTE_ENDPOINT}/${id}`,
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err)
      return callback(null, body)
    })
  }

  /**
   * Delete a data route.
   * @param {number} id - Data Route ID
   * @param callback
   */
  deleteDataRoute(id, callback) {
    return this.client.delete({
      url: `${ROUTE_ENDPOINT}/${id}`,
    }, (err, response, body) => {
      if (err) return callback(err)
      return callback(null, body)
    })
  }

  /**
   * Combine multiple files (pages) into a single file.
   * @param {Object} data - See {@link https://www.webmerge.me/developers/tools}
   * @param callback
   */
  combineFiles(data, callback) {
    return this.client.post({
      url: `${TOOLS_ENDPOINT}/combine`,
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err)
      return callback(null, body)
    })
  }

  /**
   * Convert file to PDF.
   * @param {Object} data
   * @param {Object} data.file
   * @param {string} data.file.name - File Name
   * @param {string} data.file.url - Remote File URL (required if 'contents' is empty)
   * @param {string} data.file.contents - Base64-encoded file (required if 'url' is empty)
   * @param callback
   */
  convertToPDF(data, callback) {
    return this.client.post({
      url: `${TOOLS_ENDPOINT}/convert_to_pdf`,
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err)
      return callback(null, body)
    })
  }
}


/**
 * API client with a Promise API
 * @extends WebMergeAPI
 */
class WebMergePromiseAPI extends WebMergeAPI {

  /**
   * Create an API client that uses Promises.
   * @param {string} key - API key
   * @param {string} secret - API secret
   */
  constructor(key, secret) {
    super(key, secret)
  }

  /**
   * Retrieve a list of documents.
   * @param {Object} options
   * @param {string} options.search - Search term
   * @param {string} options.folder - Folder name
   */
  getDocuments(options) {
    return promiseFromCallback(cb => super.getDocuments(options, cb))
  }

  /**
   * Retrieve a specific document.
   * @param {number} id - Document ID
   */
  getDocument(id) {
    return promiseFromCallback(cb => super.getDocument(id, cb))
  }

  /**
   * Retrieve a list of fields for a specific document.
   * @param id - Document ID
   */
  getDocumentFields(id) {
    return promiseFromCallback(cb => super.getDocumentFields(id, cb))
  }

  /**
   * Retrieve the file that was uploaded for a specific document (pdf, docx, xlsx, or pptx).
   * @param id - Document ID
   */
  getDocumentFiles(id) {
    return promiseFromCallback(cb => super.getDocumentFiles(id, cb))
  }

  /**
   * Create a new document.
   * Depending on the type of document you are creating, different parameters are required
   * @param {Object} data - See {@link https://www.webmerge.me/developers/documents}
   */
  createDocument(data) {
    return promiseFromCallback(cb => super.createDocument(data, cb))
  }

  /**
   * Update a document.
   * You cannot change the type of document, but you can change many of the other settings as well as change the
   * contents of the document. Only parameters that are sent in the request will be updated.
   * @param {number} id - Document ID
   * @param data
   */
  updateDocument(id, data) {
    return promiseFromCallback(cb => super.updateDocument(id, data, cb))
  }

  /**
   * Merge a data route.
   * @param {number} id - Document ID
   * @param {string} key - Document key
   * @param {Object} data - Data to be merged
   * @param {boolean} isTestMode - Merge the document in "test" mode
   * @param {boolean} downloadFile - Return the merged document in response
   */
  mergeDocument(id, key, data, isTestMode, downloadFile) {
    return promiseFromCallback(cb => super.mergeDocument(id, key, data, isTestMode, downloadFile, cb))
  }

  /**
   * Create a copy of a document.
   * @param {number} id - Document ID
   * @param {Object} data
   * @param {string} data.name - Name of the new document
   */
  copyDocument(id, data) {
    return promiseFromCallback(cb => super.copyDocument(id, data, cb))
  }

  /**
   * Delete a document.
   * @param {number} id - Document ID
   */
  deleteDocument(id) {
    return promiseFromCallback(cb => super.deleteDocument(id, cb))
  }

  /**
   * Retrieve a list of data routes.
   * @param callback
   */
  getDataRoutes(callback) {
    return promiseFromCallback(cb => super.getDataRoutes(callback, cb))
  }

  /**
   * Retrieve a specific data route.
   * @param {number} id - Data Route ID
   */
  getDataRoute(id) {
    return promiseFromCallback(cb => super.getDataRoute(id, cb))
  }

  /**
   * Retrieve a list of fields for a specific data route.
   * This includes fields from all documents in routing rules.
   * @param {number} id - Data Route ID
   */
  getDataRouteFields(id) {
    return promiseFromCallback(cb => super.getDataRouteFields(id, cb))
  }

  /**
   * Retrieve a list of rules for a specific data route.
   * @param {number} id - Data Route ID
   */
  getDataRouteRules(id) {
    return promiseFromCallback(cb => super.getDataRouteRules(id, cb))
  }

  /**
   * Merge a data route.
   * @param {number} id - Document ID
   * @param {string} key - Document key
   * @param {Object} data - Data to be merged
   * @param {boolean} isTestMode - Merge the document in "test" mode
   * @param {boolean} downloadFile - Return the merged document in response
   */
  mergeDataRoute(id, key, data, isTestMode, downloadFile) {
    return promiseFromCallback(cb => super.mergeDataRoute(id, key, data, isTestMode, downloadFile, cb))
  }

  /**
   * Create a new data route.
   * @param {Object} data - https://www.webmerge.me/developers/routes
   */
  createDataRoute(data) {
    return promiseFromCallback(cb => super.createDataRoute(data, cb))
  }

  /**
   * Update a data route.
   * @param {number} id - Data Route ID
   * @param {Object} data
   */
  updateDataRoute(id, data) {
    return promiseFromCallback(cb => super.updateDataRoute(id, data, cb))
  }

  /**
   * Delete a data route.
   * @param {number} id - Data Route ID
   */
  deleteDataRoute(id) {
    return promiseFromCallback(cb => super.deleteDataRoute(id, cb))
  }

  /**
   * Combine multiple files (pages) into a single file.
   * @param {Object} data - See {@link https://www.webmerge.me/developers/tools}
   */
  combineFiles(data) {
    return promiseFromCallback(cb => super.combineFiles(data, cb))
  }

  /**
   * Convert file to PDF
   * @param {Object} data
   * @param {Object} data.file
   * @param {string} data.file.name - File Name
   * @param {string} data.file.url - Remote File URL (required if 'contents' is empty)
   * @param {string} data.file.contents - Base64-encoded file (required if 'url' is empty)
   */
  convertToPDF(data) {
    return promiseFromCallback(cb => super.convertToPDF(data, cb))
  }
}

/**
 * API client with a callback API
 */
module.exports.WebMergeAPI = WebMergeAPI
/**
 * API client with a Promise API
 */
module.exports.WebMergePromiseAPI = WebMergePromiseAPI
