'use strict';

const request = require('request');


const WEB_MERGE_BASE_URL = 'https://www.webmerge.me';
const API_ENDPOINT = '/api';


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

  getDocuments(opts, callback) {
    return this.client.get({
      url: `${API_ENDPOINT}/documents`,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  getDocument(id, callback) {
    return this.client.get({
      url: `${API_ENDPOINT}/documents/${id}`,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  getDocumentFields(id, callback) {
    return this.client.get({
      url: `${API_ENDPOINT}/documents/${id}/fields`,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  getDocumentFile(id, callback) {
    return this.client.get({
      url: `${API_ENDPOINT}/documents/${id}/file`,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  createDocument(data, callback) {
    return this.client.post({
      url: `${API_ENDPOINT}/documents`,
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  updateDocument(id, data, callback) {
    return this.client.put({
      url: `${API_ENDPOINT}/documents/${id}`,
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  mergeDocument(id, key, data, test, download, callback) {
    return this.client.post({
      url: `${WEB_MERGE_BASE_URL}/merge/${id}/${key}`,
      qs: {
        test: test ? 1 : 0,
        download: download ? 1 : 0,
      },
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  copyDocument(id, data, callback) {
    return this.client.post({
      url: `${API_ENDPOINT}/documents/${id}/copy`,
      body: data,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }

  deleteDocument(id, callback) {
    return this.client.delete({
      url: `${API_ENDPOINT}/documents/${id}`,
    }, (err, response, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  }
}


module.exports = WebMergeAPI;
