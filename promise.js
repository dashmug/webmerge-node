'use strict';

const WebMergeAPI = require('.');


function promiseFromCallback(fn) {
  return new Promise((resolve, reject) => {
    fn((err, response) => {
      if (err) return reject(err);
      return resolve(response);
    });
  });
}

class WebMergePromiseAPI extends WebMergeAPI {
  getDocuments(opts) {
    return promiseFromCallback(cb => super.getDocuments(opts, cb));
  }

  getDocument(id) {
    return promiseFromCallback(cb => super.getDocument(id, cb));
  }

  getDocumentFields(id) {
    return promiseFromCallback(cb => super.getDocumentFields(id, cb));
  }
}


module.exports = WebMergePromiseAPI;
