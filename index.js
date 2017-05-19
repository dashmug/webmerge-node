'use strict';

const request = require('request');


const WEB_MERGE_BASE_URL = 'https://www.webmerge.me';
const API_ENDPOINT = '/api/documents';
const MERGE_ENDPOINT = '/merge';
const ROUTE_ENDPOINT = '/route';


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
}


module.exports = WebMergeAPI;
