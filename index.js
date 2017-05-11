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
}


module.exports = WebMergeAPI;
