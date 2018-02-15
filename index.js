/**
 * WebMerge module.
 * @module webmerge
 */

'use strict'

const request = require('request')


const WEB_MERGE_BASE_URL = 'https://www.webmerge.me'
const API_ENDPOINT = '/api/documents'
const MERGE_ENDPOINT = '/merge'
const MERGE_ROUTE_ENDPOINT = '/route'
const ROUTE_ENDPOINT = '/api/routes'
const TOOLS_ENDPOINT = '/tools'


const done = callback => (err, response, body) => {
  if (err) throw err
  if ('error' in body) throw new Error(body.error)

  return callback(null, body)
}


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
   * @param {string} [options.search] - Search term
   * @param {string} [options.folder] - Folder name
   * @param callback
   */
  getDocuments(options, callback) {
    return this.client.get({
      url: `${API_ENDPOINT}`,
      qs: options,
    }, done(callback))
  }

  /**
   * Retrieve a specific document.
   * @param {number} id - Document ID
   * @param callback
   */
  getDocument(id, callback) {
    return this.client.get({
      url: `${API_ENDPOINT}/${id}`,
    }, done(callback))
  }

  /**
   * Retrieve a list of fields for a specific document.
   * @param {number} id - Document ID
   * @param callback
   */
  getDocumentFields(id, callback) {
    return this.client.get({
      url: `${API_ENDPOINT}/${id}/fields`,
    }, done(callback))
  }

  /**
   * Retrieve the file that was uploaded for a specific document (pdf, docx, xlsx, or pptx).
   * @param {number} id - Document ID
   * @param callback
   */
  getDocumentFiles(id, callback) {
    return this.client.get({
      url: `${API_ENDPOINT}/${id}/file`,
    }, done(callback))
  }

  /**
   * Create a new document.
   * Depending on the type of document you are creating, different parameters are required
   * @param {Object} data - See {@link https://www.webmerge.me/developers/documents}
   * @param {string} data.name - Document name
   * @param {string} data.type - The type of document
   * @param {string} data.output - The type of document to produce from merge
   * @param {string} [data.output_name] - A customized filename for the merged document
   * @param {string} [data.folder] - The name of the folder to save the document in.
   * @param {string} [data.html] - The HTML of the document (required if data.type == 'html')
   * @param {number} [data.size_width] - The width of the document (required if data.type == 'html')
   * @param {number} [data.size_height] - The height of the document (required if data.type == 'html')
   * @param {string} [data.file_contents] - The (base64 encoded) contents of the file (required if data.type != 'html')
   * @param {Object} [data.notification] - The default email notification
   * @param {string} [data.notification.to]
   * @param {string} [data.notification.from]
   * @param {string} [data.notification.subject]
   * @param {string} [data.notification.html]
   * @param {string} [data.notification.security]
   * @param {string} [data.notification.password]
   * @param callback
   */
  createDocument(data, callback) {
    return this.client.post({
      url: `${API_ENDPOINT}`,
      body: data,
    }, done(callback))
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
    }, done(callback))
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
    }, done(callback))
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
    }, done(callback))
  }

  /**
   * Delete a document.
   * @param {number} id - Document ID
   * @param callback
   */
  deleteDocument(id, callback) {
    return this.client.delete({
      url: `${API_ENDPOINT}/${id}`,
    }, done(callback))
  }

  /**
   * Retrieve a list of data routes.
   * @param callback
   */
  getDataRoutes(callback) {
    return this.client.get({
      url: `${ROUTE_ENDPOINT}`,
    }, done(callback))
  }

  /**
   * Retrieve a specific data route.
   * @param {number} id - Data Route ID
   * @param callback
   */
  getDataRoute(id, callback) {
    return this.client.get({
      url: `${ROUTE_ENDPOINT}/${id}`,
    }, done(callback))
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
    }, done(callback))
  }

  /**
   * Retrieve a list of rules for a specific data route.
   * @param {number} id - Data Route ID
   * @param callback
   */
  getDataRouteRules(id, callback) {
    return this.client.get({
      url: `${ROUTE_ENDPOINT}/${id}/rules`,
    }, done(callback))
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
      url: `${MERGE_ROUTE_ENDPOINT}/${id}/${key}`,
      qs: {
        test: isTestMode ? 1 : 0,
        download: downloadFile ? 1 : 0,
      },
      body: data,
    }, done(callback))
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
    }, done(callback))
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
    }, done(callback))
  }

  /**
   * Delete a data route.
   * @param {number} id - Data Route ID
   * @param callback
   */
  deleteDataRoute(id, callback) {
    return this.client.delete({
      url: `${ROUTE_ENDPOINT}/${id}`,
    }, done(callback))
  }

  /**
   * Combine multiple files (pages) into a single file.
   * See {@link https://www.webmerge.me/developers/tools}
   * @param {Object} data
   * @param {string} data.output - The type of file to produce
   * @param {Object[]} data.files - The files to be combined
   * @param {string} data.files[].name - File Name
   * @param {string} data.files[].url - Remote File URL (required if 'contents' is empty)
   * @param {string} data.files[].contents - Base64-encoded file (required if 'url' is empty)
   * @param callback
   */
  combineFiles(data, callback) {
    return this.client.post({
      url: `${TOOLS_ENDPOINT}/combine`,
      body: data,
    }, done(callback))
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
    }, done(callback))
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
   * @param {Function} [PromiseImplementation] - Promise Constructor
   */
  constructor(key, secret, PromiseImplementation) {
    super(key, secret)
    this.Promise = PromiseImplementation || Promise
  }

  /**
   * Retrieve a list of documents.
   * @param {Object} options
   * @param {string} options.search - Search term
   * @param {string} options.folder - Folder name
   */
  getDocuments(options) {
    return this.promisify(cb => super.getDocuments(options, cb))
  }

  /**
   * Retrieve a specific document.
   * @param {number} id - Document ID
   */
  getDocument(id) {
    return this.promisify(cb => super.getDocument(id, cb))
  }

  /**
   * Retrieve a list of fields for a specific document.
   * @param id - Document ID
   */
  getDocumentFields(id) {
    return this.promisify(cb => super.getDocumentFields(id, cb))
  }

  /**
   * Retrieve the file that was uploaded for a specific document (pdf, docx, xlsx, or pptx).
   * @param id - Document ID
   */
  getDocumentFiles(id) {
    return this.promisify(cb => super.getDocumentFiles(id, cb))
  }

  /**
   * Create a new document.
   * Depending on the type of document you are creating, different parameters are required
   * @param {Object} data - See {@link https://www.webmerge.me/developers/documents}
   */
  createDocument(data) {
    return this.promisify(cb => super.createDocument(data, cb))
  }

  /**
   * Update a document.
   * You cannot change the type of document, but you can change many of the other settings as well as change the
   * contents of the document. Only parameters that are sent in the request will be updated.
   * @param {number} id - Document ID
   * @param data
   */
  updateDocument(id, data) {
    return this.promisify(cb => super.updateDocument(id, data, cb))
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
    return this.promisify(cb => super.mergeDocument(id, key, data, isTestMode, downloadFile, cb))
  }

  /**
   * Create a copy of a document.
   * @param {number} id - Document ID
   * @param {Object} data
   * @param {string} data.name - Name of the new document
   */
  copyDocument(id, data) {
    return this.promisify(cb => super.copyDocument(id, data, cb))
  }

  /**
   * Delete a document.
   * @param {number} id - Document ID
   */
  deleteDocument(id) {
    return this.promisify(cb => super.deleteDocument(id, cb))
  }

  /**
   * Retrieve a list of data routes.
   */
  getDataRoutes() {
    return this.promisify(cb => super.getDataRoutes(cb))
  }

  /**
   * Retrieve a specific data route.
   * @param {number} id - Data Route ID
   */
  getDataRoute(id) {
    return this.promisify(cb => super.getDataRoute(id, cb))
  }

  /**
   * Retrieve a list of fields for a specific data route.
   * This includes fields from all documents in routing rules.
   * @param {number} id - Data Route ID
   */
  getDataRouteFields(id) {
    return this.promisify(cb => super.getDataRouteFields(id, cb))
  }

  /**
   * Retrieve a list of rules for a specific data route.
   * @param {number} id - Data Route ID
   */
  getDataRouteRules(id) {
    return this.promisify(cb => super.getDataRouteRules(id, cb))
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
    return this.promisify(cb => super.mergeDataRoute(id, key, data, isTestMode, downloadFile, cb))
  }

  /**
   * Create a new data route.
   * @param {Object} data - https://www.webmerge.me/developers/routes
   */
  createDataRoute(data) {
    return this.promisify(cb => super.createDataRoute(data, cb))
  }

  /**
   * Update a data route.
   * @param {number} id - Data Route ID
   * @param {Object} data
   */
  updateDataRoute(id, data) {
    return this.promisify(cb => super.updateDataRoute(id, data, cb))
  }

  /**
   * Delete a data route.
   * @param {number} id - Data Route ID
   */
  deleteDataRoute(id) {
    return this.promisify(cb => super.deleteDataRoute(id, cb))
  }

  /**
   * Combine multiple files (pages) into a single file.
   * See {@link https://www.webmerge.me/developers/tools}
   * @param {Object} data
   * @param {string} data.output - The type of file to produce
   * @param {Object[]} data.files - The files to be combined
   * @param {string} data.files[].name - File Name
   * @param {string} [data.files[].url] - Remote File URL (required if 'contents' is empty)
   * @param {string} [data.files[].contents] - Base64-encoded file (required if 'url' is empty)
   */
  combineFiles(data) {
    return this.promisify(cb => super.combineFiles(data, cb))
  }

  /**
   * Convert file to PDF
   * @param {Object} data
   * @param {Object} data.file
   * @param {string} data.file.name - File Name
   * @param {string} [data.file.url] - Remote File URL (required if 'contents' is empty)
   * @param {string} [data.file.contents] - Base64-encoded file (required if 'url' is empty)
   */
  convertToPDF(data) {
    return this.promisify(cb => super.convertToPDF(data, cb))
  }

  /**
   * Utility function to promisify a callback function
   * @param fn - Callback function
   * @returns {Promise}
   */
  promisify(fn) {
    return new this.Promise((resolve, reject) => {
      fn((err, response) => {
        if (err) return reject(err)
        return resolve(response)
      })
    })
  }
}


module.exports = {
  WebMergeAPI,
  WebMergePromiseAPI,
}
