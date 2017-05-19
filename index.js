'use strict';

const request = require('request');


const WEB_MERGE_BASE_URL = 'https://www.webmerge.me';
const API_ENDPOINT = '/api/documents';
const MERGE_ENDPOINT = '/merge';
const ROUTE_ENDPOINT = '/route';
const TOOLS_ENDPOINT = '/tools';


class WebMergeAPI {
  constructor(key, secret) {
    this.client = request.defaults({
      baseUrl: WEB_MERGE_BASE_URL,
      auth: {
        username: key,
        password: secret,
        sendImmediately: true,
      },
      json: true,
    });
  }

  getDocuments(options, callback) {
    return this.client.get({
      url: `${API_ENDPOINT}`,
      qs: options,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  getDocument(id, callback) {
    return this.client.get({
      url: `${API_ENDPOINT}/${id}`,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  getDocumentFields(id, callback) {
    return this.client.get({
      url: `${API_ENDPOINT}/${id}/fields`,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  getDocumentFiles(id, callback) {
    return this.client.get({
      url: `${API_ENDPOINT}/${id}/file`,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  createDocument(data, callback) {
    return this.client.post({
      url: `${API_ENDPOINT}`,
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  updateDocument(id, data, callback) {
    return this.client.put({
      url: `${API_ENDPOINT}/${id}`,
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  mergeDocument(id, key, data, isTestMode, downloadFile, callback) {
    return this.client.post({
      url: `${MERGE_ENDPOINT}/${id}/${key}`,
      qs: {
        test: isTestMode ? 1 : 0,
        download: downloadFile ? 1 : 0,
      },
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  copyDocument(id, data, callback) {
    return this.client.post({
      url: `${API_ENDPOINT}/${id}/copy`,
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  deleteDocument(id, callback) {
    return this.client.delete({
      url: `${API_ENDPOINT}/${id}`,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  getDataRoutes(callback) {
    return this.client.get({
      url: `${ROUTE_ENDPOINT}`,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  getDataRoute(id, callback) {
    return this.client.get({
      url: `${ROUTE_ENDPOINT}/${id}`,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  getDataRouteFields(id, callback) {
    return this.client.get({
      url: `${ROUTE_ENDPOINT}/${id}/fields`,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  getDataRouteRules(id, callback) {
    return this.client.get({
      url: `${ROUTE_ENDPOINT}/${id}/rules`,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  mergeDataRoute(id, key, data, isTestMode, downloadFile, callback) {
    return this.client.post({
      url: `${ROUTE_ENDPOINT}/${id}/${key}`,
      qs: {
        test: isTestMode ? 1 : 0,
        download: downloadFile ? 1 : 0,
      },
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  createDataRoute(data, callback) {
    return this.client.post({
      url: `${ROUTE_ENDPOINT}`,
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  updateDataRoute(id, data, callback) {
    return this.client.put({
      url: `${ROUTE_ENDPOINT}/${id}`,
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  deleteDataRoute(id, callback) {
    return this.client.delete({
      url: `${ROUTE_ENDPOINT}/${id}`,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  combineFiles(data, callback) {
    return this.client.post({
      url: `${TOOLS_ENDPOINT}/combine`,
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  convertToPDF(data, callback) {
    return this.client.post({
      url: `${TOOLS_ENDPOINT}/combine`,
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }
}


const promiseFromCallback = fn => new Promise((resolve, reject) => {
  fn((err, response) => {
    if (err) return reject(err);
    return resolve(response);
  });
});


class WebMergePromiseAPI extends WebMergeAPI {
  getDocuments(options) {
    return promiseFromCallback(cb => super.getDocuments(options, cb));
  }

  getDocument(id) {
    return promiseFromCallback(cb => super.getDocument(id, cb));
  }

  getDocumentFields(id) {
    return promiseFromCallback(cb => super.getDocumentFields(id, cb));
  }

  getDocumentFiles(id) {
    return promiseFromCallback(cb => super.getDocumentFiles(id, cb));
  }

  createDocument(data) {
    return promiseFromCallback(cb => super.createDocument(data, cb));
  }

  updateDocument(id, data) {
    return promiseFromCallback(cb => super.updateDocument(id, data, cb));
  }

  mergeDocument(id, key, data, isTestMode, downloadFile) {
    return promiseFromCallback(cb => super.mergeDocument(id, key, data, isTestMode, downloadFile, cb));
  }

  copyDocument(id, data) {
    return promiseFromCallback(cb => super.copyDocument(id, data, cb));
  }

  deleteDocument(id) {
    return promiseFromCallback(cb => super.deleteDocument(id, cb));
  }

  getDataRoutes(callback) {
    return promiseFromCallback(cb => super.getDataRoutes(callback, cb));
  }

  getDataRoute(id) {
    return promiseFromCallback(cb => super.getDataRoute(id, cb));
  }

  getDataRouteFields(id) {
    return promiseFromCallback(cb => super.getDataRouteFields(id, cb));
  }

  getDataRouteRules(id) {
    return promiseFromCallback(cb => super.getDataRouteRules(id, cb));
  }

  mergeDataRoute(id, key, data, isTestMode, downloadFile) {
    return promiseFromCallback(cb => super.mergeDataRoute(id, key, data, isTestMode, downloadFile, cb));
  }

  createDataRoute(data) {
    return promiseFromCallback(cb => super.createDataRoute(data, cb));
  }

  updateDataRoute(id, data) {
    return promiseFromCallback(cb => super.updateDataRoute(id, data, cb));
  }

  deleteDataRoute(id) {
    return promiseFromCallback(cb => super.deleteDataRoute(id, cb));
  }

  combineFiles(data) {
    return promiseFromCallback(cb => super.combineFiles(data, cb));
  }

  convertToPDF(data) {
    return promiseFromCallback(cb => super.convertToPDF(data, cb));
  }
}


module.exports = {
  WebMergeAPI,
  WebMergePromiseAPI,
};
